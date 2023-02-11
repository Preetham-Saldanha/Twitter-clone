import { ArrowLeftIcon, BackwardIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { profileDataType, UserAuth } from '../typings'
import twitterLogo from "../public/Twitter_bird_logo.png"
import useAuth from '../hooks/useAuth'
import axios from '../api_utils/axios'
import EditProfileModal from './editProfileModal'
import { Toaster } from 'react-hot-toast'



function ProfileSection(props : profileDataType) {

  const { auth }: any = useAuth();
  const [selectedBar, setSelectedBar] = useState<number>(1)
  const handleNavbarClick = (section: number) => {
    setSelectedBar(section)
  }
const [enableEdit, setEnableEdit] = useState(false) ;


const [profileData,setProfileData] =  useState<profileDataType>();

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
  { enableEdit && <EditProfileModal enableEdit={enableEdit} setEnableEdit={setEnableEdit} profileData={profileData} setProfileData={setProfileData}></EditProfileModal>}
    <div className='col-span-7 lg:col-span-5 border-gray-100 border-x max-h-screen overflow-scroll scrollbar-hide h-screen'>

      <div className='flex mt-3' >

        <div className='px-3'><ArrowLeftIcon className='h-6 w-6' /></div>
        <div>
          {/* <p>{props.firstname} {props.lastname}</p> */}
          <p className='font-bold'>Preetham Saldanha</p>
          <p className='text-sm'>5 tweets</p>
        </div>
      </div>

      <div className='h-2/6 w-full '>
        <div className='bg-slate-300 h-4/6 w-full'>
        </div>
        <div className=' flex relative bg-white h-32 w-32 ml-4 rounded-full -mt-16 justify-center items-center '>
          <Image src={twitterLogo} alt="" height={100} width={100} />
        </div>

        <div className='flex w-full justify-end pr-5 '>
          {props.username === auth.username ? <button onClick={()=>setEnableEdit(prev=>!prev)} className=' relative -mt-12 h-10 w-1/6 border-gray-500 font-semibold border rounded-3xl hover:bg-slate-500' >Edit Profile</button> : <button className=' relative -mt-12 h-10 w-1/6 bg-black font-semibold border rounded-3xl text-white'>Follow</button>}
        </div>
      </div>

      <div className=' relative flex-col px-3 -mt-3'>
        <p className='font-bold text-2xl leading-5'>Preetham Saldanha</p>
        <p className=' text-gray-500 '> @preetham</p>
        <p className=' text-gray-500 mt-3'> joined january 2022</p>
        <p className=' text-gray-500 mt-3'> <span className='text-black font-semibold'>1</span> follower <span className='text-black font-semibold'>1</span> followed</p>
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