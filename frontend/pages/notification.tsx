import React, { useEffect, useState } from 'react'
import { axiosPrivate } from '../api_utils/axios'
import NotificationCard from '../components/NotificationCard'
import SideBar from '../components/SideBar'
import Widget from '../components/Widget'
import useAuth from '../hooks/useAuth'
function Notification() {

    const { auth }: any = useAuth()
    // const notification = {
    //     notify_type: "followed", fan: "oscar", created_at: new Date().toDateString(), has_read: false, profile_image_path: "", tweet_id: 1,
    // }

    const [notifications, setNotifications] = useState<Object[]>()
    const fetchNotifications = async () => {
        const { result } = await (await axiosPrivate.post("/api/v1/notification/", { username: auth.username })).data;
        console.log(result)
        setNotifications(result)
    }

    useEffect(() => {
        fetchNotifications()
    }, [])

    return (


        <div className='grid grid-cols-9  font-roboto  lg:max-w-6xl mx-auto'>
            <SideBar row={2} />

            <div className='lg:col-span-5 col-span-7 border-gray-100 border-x max-h-screen overflow-scroll scrollbar-hide'>
                <h1 className='p-5 pb-0 text-xl font-bold m-auto  text-center'>Notifications</h1>
                {notifications?.map(notification => <NotificationCard notification={notification} />
                )
                }
                {/* Nothing to display here */}
            </div>

            <Widget /></div>
    )
}

export default Notification