import React from 'react'
import {
  HomeIcon,
  BellIcon,
  HashtagIcon,
  BookmarkIcon,
  QueueListIcon,
  UserIcon,
  EllipsisHorizontalCircleIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline'
import SideBarRow from './SideBarRow'
import twitterImage from '../public/Twitter_bird_logo.png'
import Image from 'next/image'
function SideBar() {
  return (

    <div className='col-span-2 px-2 flex items-center  md:items-start flex-col '>
      {/* <div className='w-6 h-6'> */}
      <div >
        {/* <img src="https://links.papareact.com/drq" alt="" className='w-6 h-6' /> */}
        <Image src={twitterImage}alt={""} width={40} height={40} className="m-3" />
      </div>

      {/* </div> */}

      <SideBarRow Icon={HomeIcon} title={"Home"} />
      <SideBarRow Icon={HashtagIcon} title={"Explore"} />
      <SideBarRow Icon={BellIcon} title={"Notification"} />
      
      <SideBarRow Icon={EnvelopeIcon} title={"messages"} />
      {/* <SideBarRow Icon={BookmarkIcon} title={""} /> */}
      <SideBarRow Icon={QueueListIcon} title={"lists"} />
      <SideBarRow Icon={BookmarkIcon} title={"Bookmarks"} />
      <SideBarRow Icon={UserIcon} title={"Sign in"} />
      <SideBarRow Icon={EllipsisHorizontalCircleIcon} title={"More"} />
    </div>
  )
}

export default SideBar