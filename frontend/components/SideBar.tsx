import React, { useEffect, useState } from 'react';
import useSWR from 'swr'
import {
  HomeIcon,
  BellIcon,
  HashtagIcon,
  BookmarkIcon,
  UsersIcon,
  UserIcon,
  EllipsisHorizontalCircleIcon,
  EnvelopeIcon,
  ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline'
import {
  HomeIcon as solidHomeIcon,
  BellIcon as SolidBellIcon,
  ArrowLeftOnRectangleIcon as solidArrowLeftOnRectangleIcon,
  BookmarkIcon as solidBookmarkIcon,
  UsersIcon as solidUsersIcon,
  UserIcon as solidUserIcon,
  EllipsisHorizontalCircleIcon as solidEllipsisHorizontalCircleIcon
} from '@heroicons/react/24/solid'
import SideBarRow from './SideBarRow'
import twitterImage from '../public/Twitter_bird_logo.png'
import Image from 'next/image'
import useAuth from '../hooks/useAuth'
import axios, { axiosPrivate } from '../api_utils/axios'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/router'
import ConfirmModal from './ConfirmModal'

interface Props {
  row: number
}

function SideBar(props: Props) {
  const router = useRouter()
  const { auth, setAuth }: any = useAuth()
  const [activeRow, setActiveRow] = useState(props.row)
  const [openConfirmModal, setOpenConfirmModal] = useState(false)
  const [isLogout, setIsLogout] = useState(false)
  // const [hasNotifications, setHasNotifications] = useState<boolean>(true)
  const [numberOfNotifications, setNumberOfNotifications] = useState<number>(0)
  const handleActive: (row: number) => void = (row: number) => {

    // setActiveRow(row)
    if (row === 1) {
      router.push("/home")
    }
    else if (row === 2) {
      // setHasNotifications(false)
      router.push("/notification")
    }
    else if (row === 5) {
      router.push("/profile")
    }



  }

  const logOut: () => void = async () => {

    try {
      const response = (await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/logout`))
      console.log(response, response.status)
      if (response?.status === 204) {
        toast.success("Succesfully logged out!")
        router.replace({
          pathname: "/login",
        })
      }
    }
    catch (error) {
      toast.error("Something went wrong please try again")
    }
  }

  // const fetchNotifications = async () => {
  //   const { result } = await (await axiosPrivate.post("/api/v1/notification/", { username: auth.username })).data;
  //   console.log(result)
  //   // setNotifications()
  //   return result.length
  // }

  const fetchNotifications = (url) => axiosPrivate.post(url, { username: auth.username }).then(data => data.data)
  const { data } = useSWR("/api/v1/notification/", fetchNotifications)
  console.log(data?.result)
  useEffect(() => {


    if (isLogout) {
      logOut()
    }
  }, [isLogout])

  useEffect(() => {
    if(data?.result?.length){
      console.log("it ihb")
    setNumberOfNotifications(data?.result.length)
    }
    return () => {
     
    }
  }, [data])
  
  // useEffect(() => {
  //    fetchNotifications().then(size => setNumberOfNotifications(size)).catch(err=> console.log("occured during cheking if notifications present",err));


  //   const ID = setInterval(async () => {
  //     const size = await fetchNotifications();
  //     if (size !== numberOfNotifications) {
  //       setNumberOfNotifications(size)
  //     }
  //     return clearInterval(ID)

  //   }, 5000)


  // }, [])

  return (
    <>
      {openConfirmModal && <ConfirmModal setOpenConfirmModal={setOpenConfirmModal} setIsSubmit={setIsLogout} message={"Do You Want to logout"} />}
      <div className='col-span-2 px-2 flex items-center  md:items-start flex-col '>
        {/* <div className='w-6 h-6'> */}
        <div >
          {/* <img src="https://links.papareact.com/drq" alt="" className='w-6 h-6' /> */}
          <Image src={twitterImage} alt={""} width={40} height={40} className="m-3" />
        </div>

        {/* </div> */}

        <SideBarRow Icon={activeRow === 1 ? solidHomeIcon : HomeIcon} title={"Home"} handleActive={handleActive} rowNumber={1} activeRow={activeRow} />
        {/* <SideBarRow Icon={HashtagIcon} title={"Explore"} /> */}
        {auth?.username !== "" &&
          <>
            <SideBarRow Icon={activeRow === 2 ? SolidBellIcon : BellIcon} title={"Notifications"} handleActive={handleActive} rowNumber={2} activeRow={activeRow} numberOfNotifications={data?.result.length} />

            {/* <SideBarRow Icon={EnvelopeIcon} title={"messages"} /> */}
            {/* <SideBarRow Icon={BookmarkIcon} title={""} /> */}
            <SideBarRow Icon={activeRow === 3 ? solidUsersIcon : UsersIcon} title={"People"} handleActive={handleActive} rowNumber={3} activeRow={activeRow} />
            <SideBarRow Icon={activeRow === 4 ? solidBookmarkIcon : BookmarkIcon} title={"Bookmarks"} handleActive={handleActive} rowNumber={4} activeRow={activeRow} />
            <SideBarRow Icon={activeRow === 5 ? solidUserIcon : UserIcon} title={auth?.username === "" ? "Sign in" : "Profile"} handleActive={handleActive} rowNumber={5} activeRow={activeRow} />
            <SideBarRow Icon={activeRow === 6 ? solidArrowLeftOnRectangleIcon : ArrowLeftOnRectangleIcon} title={"Log out"} rowNumber={6} activeRow={activeRow} setOpenConfirmModal={setOpenConfirmModal} />
          </>
        }  </div>
    </>
  )
}

export default SideBar