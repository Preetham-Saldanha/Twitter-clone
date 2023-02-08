import React, { useState } from 'react'
import {
  HomeIcon,
  BellIcon,
  HashtagIcon,
  BookmarkIcon,
  QueueListIcon,
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
  QueueListIcon as solidQueueListIcon,
  UserIcon as solidUserIcon,
  EllipsisHorizontalCircleIcon as solidEllipsisHorizontalCircleIcon
} from '@heroicons/react/24/solid'
import SideBarRow from './SideBarRow'
import twitterImage from '../public/Twitter_bird_logo.png'
import Image from 'next/image'
import useAuth from '../hooks/useAuth'
import axios from '../api_utils/axios'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/router'

interface Props{
  row: number
}

function SideBar(props: Props) {
  const router = useRouter()
  const { auth, setAuth }: any = useAuth()
  const [activeRow, setActiveRow] = useState(props.row)

  const handleActive: (row: number) => void = (row: number) => {

    // setActiveRow(row)
    if(row===1){
      router.push("/home")
    }
   else if(row===5){
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

  return (

    <div className='col-span-2 px-2 flex items-center  md:items-start flex-col '>
      {/* <div className='w-6 h-6'> */}
      <div >
        {/* <img src="https://links.papareact.com/drq" alt="" className='w-6 h-6' /> */}
        <Image src={twitterImage} alt={""} width={40} height={40} className="m-3" />
      </div>

      {/* </div> */}

      <SideBarRow Icon={activeRow === 1 ? solidHomeIcon : HomeIcon} title={"Home"} handleActive={handleActive} rowNumber={1} activeRow={activeRow} />
      {/* <SideBarRow Icon={HashtagIcon} title={"Explore"} /> */}
      {auth.username !== "" &&
        <>
          <SideBarRow Icon={activeRow === 2 ? SolidBellIcon : BellIcon} title={"Notification"} handleActive={handleActive} rowNumber={2} activeRow={activeRow} />

          {/* <SideBarRow Icon={EnvelopeIcon} title={"messages"} /> */}
          {/* <SideBarRow Icon={BookmarkIcon} title={""} /> */}
          <SideBarRow Icon={activeRow === 3 ? solidQueueListIcon : QueueListIcon} title={"lists"} handleActive={handleActive} rowNumber={3} activeRow={activeRow} />
          <SideBarRow Icon={activeRow === 4 ? solidBookmarkIcon : BookmarkIcon} title={"Bookmarks"} handleActive={handleActive} rowNumber={4} activeRow={activeRow} />
          <SideBarRow Icon={activeRow === 5 ? solidUserIcon : UserIcon} title={auth.username === "" ? "Sign in" : "Profile"}  handleActive={handleActive} rowNumber={5} activeRow={activeRow} />
          <SideBarRow Icon={activeRow === 6 ? solidArrowLeftOnRectangleIcon : ArrowLeftOnRectangleIcon} title={"Log out"}  rowNumber={6} activeRow={activeRow} logOut={logOut} />
        </>
      }  </div>
  )
}

export default SideBar