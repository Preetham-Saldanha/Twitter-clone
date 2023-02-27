import { ArrowLeftIcon, BackwardIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { profileDataType, UserAuth } from '../typings'
import twitterLogo from "../public/Twitter_bird_logo.png"
import useAuth from '../hooks/useAuth'
import axios, { axiosPrivate } from '../api_utils/axios'
import EditProfileModal from './editProfileModal'
import { Toaster } from 'react-hot-toast'
import TimeAgo from 'timeago-react'
import { useRouter } from 'next/router'
import useAddFollower from '../hooks/useAddFollower'
import { useRemoveFollower } from '../hooks/useRemoveFollower'
import ConfirmModal from './ConfirmModal'



function ProfileSection(props: { username: string | string[] }) {

  const { auth }: any = useAuth();
  const router = useRouter()
  const [selectedBar, setSelectedBar] = useState<number>(1)
  const [isAnythingChanged, setIsAnythingChanged] = useState(true)
  const handleNavbarClick = (section: number) => {
    setSelectedBar(section)
  }
  const [enableEdit, setEnableEdit] = useState(false);
  const [isFollow, setIsFollow] = useState(false)
  const [openConfirmModal, setOpenConfirmModal] = useState(false)
  const [isSubmit, setIsSubmit] = useState<boolean>(false)
  const [profileData, setProfileData] = useState<profileDataType>();


  const addFollowing = useAddFollower();
  const removeFollowing = useRemoveFollower()


  async function getUserDetails() {
    const result: { user: profileDataType[] } = await (await axiosPrivate.get(`/api/v1/user/${props.username}`)).data
    console.log(result)
    if (result) {
      console.log(result)
      setProfileData(result.user[0])
      setIsAnythingChanged(false)
      setIsFollow(result.user[0].isFollowing)
    }
  }

  const handleFollow = () => {
    if (isFollow) {
      setOpenConfirmModal(true)
      // removeFollowing(auth.username, profileData.username).then(data => setIsFollow(data))

    } else {
      addFollowing(auth.username, profileData.username).then(data =>{ setIsFollow(data); setProfileData( {...profileData,followers:profileData.followers+1})})
    }

  }

  useEffect(() => {
    if (!enableEdit && isAnythingChanged || profileData.username!==props.username)
      getUserDetails()
  }, [enableEdit,props.username])

  useEffect(() => {
    if (isSubmit) {
      removeFollowing(auth.username, profileData.username).then(data =>{ setIsFollow(data); setProfileData({...profileData, followers: profileData.followers-1})})
    }
  }, [isSubmit])

  // useEffect(()=>{
  //   (async ()=>{
  //     const data : profileDataType = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user`)
  //     setProfileData(data)
  //   })()
  // },[])

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      {openConfirmModal && <ConfirmModal setOpenConfirmModal={setOpenConfirmModal} setIsSubmit={setIsSubmit} message={"Are You sure you want to unFollow?"}/>}
      {enableEdit && <EditProfileModal isAnythingChanged={isAnythingChanged} setIsAnythingChanged={setIsAnythingChanged} enableEdit={enableEdit} setEnableEdit={setEnableEdit} {...profileData} setProfileData={setProfileData}></EditProfileModal>}
      <div className='col-span-7 lg:col-span-5 border-gray-100 border-x max-h-screen overflow-scroll scrollbar-hide h-screen'>

        <div className='flex mt-3' >

          <div className='px-3' onClick={() => router.back()}><ArrowLeftIcon className='h-6 w-6' /></div>
          <div>
            {/* <p>{props.firstname} {props.lastname}</p> */}
            <p className='font-bold'>{profileData?.firstname} {profileData?.lastname}</p>
            <p className='text-sm'>5 tweets</p>
          </div>
        </div>

        <div className='h-2/6 w-full '>
          <div className='bg-slate-300 h-4/6 w-full'>
          </div>
          <div className=' flex relative bg-white h-32 w-32 ml-4 rounded-full -mt-16 justify-center items-center '>
            {/* <Image src={(profileData?.profile_image_path && profileData.profile_image_path!=="undefined")? `http://localhost:5000/profileImages/${profileData.profile_image_path}`: twitterLogo } alt="" height={100} width={100} /> */}
            {(profileData?.profile_image_path && profileData.profile_image_path !== "undefined") ? <img src={`http://localhost:5000/profileImages/${profileData.profile_image_path}`} className="rounded-full" /> : <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Placeholder_no_text.svg/768px-Placeholder_no_text.svg.png" className="rounded-full" />}
          </div>

          <div className='flex w-full justify-end pr-5 '>
            {props.username === auth.username ? <button onClick={() => setEnableEdit(prev => !prev)} className=' relative -mt-12 h-10 w-1/6 border-gray-700 font-semibold border-2 rounded-3xl hover:bg-slate-100 duration-300' >Edit Profile</button> :
              <button className={isFollow?' relative -mt-12 h-10 w-1/6 border-gray-600 font-semibold border-2 rounded-3xl hover:bg-slate-100  duration-300' :'relative -mt-12 h-10 w-1/6 bg-black font-semibold border rounded-3xl text-white hover:opacity-75'} onClick={handleFollow}>{isFollow ? "Following" : "Follow"}</button>}
          </div>
        </div>

        <div className=' relative flex-col px-3 -mt-3'>
          <p className='font-bold text-2xl leading-5'>{profileData?.firstname} {profileData?.lastname}</p>
          <p className=' text-gray-500 '> @{profileData?.username}</p>
          <p className=' text-gray-500 mt-3'> joined <TimeAgo datetime={profileData?.created_at} /></p>
          <p className=' text-gray-500 mt-3'> <span className='text-black font-semibold'>{profileData?.followers}</span> follower <span className='text-black font-semibold'>{profileData?.following}</span> following</p>
        </div>

        {/* navbar for profile */}

        <div className='flex w-full text-center mt-4 h-12 cursor-pointer '>
          <div className='text-gray-500 hover:bg-slate-200 w-1/4 pt-2 ' onClick={() => handleNavbarClick(1)}>Tweets {selectedBar == 1 && <p className='border-b-4 border-twitter relative top-3 rounded-xl'></p>}</div>
          <div className='text-gray-500 hover:bg-slate-200 w-4/12 pt-2' onClick={() => handleNavbarClick(2)}>Tweets & Replies {selectedBar == 2 && <p className='border-b-4 border-twitter relative top-3 rounded-xl'></p>}</div>
          <div className='text-gray-500 hover:bg-slate-200 w-1/4 pt-2' onClick={() => handleNavbarClick(3)}> Media {selectedBar == 3 && <p className='border-b-4 border-twitter relative top-3 rounded-xl'></p>}</div>
          <div className='text-gray-500 hover:bg-slate-200 w-1/4 pt-2' onClick={() => handleNavbarClick(4)}>Likes {selectedBar == 4 && <p className='border-b-4 border-twitter relative top-3 rounded-xl'></p>}</div>
        </div>
      </div>
    </>
  )
}

export default ProfileSection