import React, { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { axiosPrivate } from '../api_utils/axios'
import Layout from '../components/Layout'
import NotificationCard from '../components/NotificationCard'
import SideBar from '../components/SideBar'
import Widget from '../components/Widget'
import useAuth from '../hooks/useAuth'
function Notification() {

    const { auth }: any = useAuth()
    // const notification = {
    //     notify_type: "followed", fan: "oscar", created_at: new Date().toDateString(), has_read: false, profile_image_path: "", tweet_id: 1,
    // }

    const [notifications, setNotifications] = useState([])
    const fetchNotifications = async () => {
        const { result } = await (await axiosPrivate.post("/api/v1/notification/", { username: auth.username })).data;
        console.log(result)
        setNotifications(result)
    }

    useEffect(() => {
        fetchNotifications()
    }, [])

    return (

        <>   <Toaster position="top-center"
            reverseOrder={false} />

            <Layout row={2}>
                <div className='lg:col-span-5 col-span-7 border-gray-100 border-x max-h-screen overflow-scroll scrollbar-hide'>
                    <h1 className='p-5 pb-0 text-xl font-bold m-auto  text-center'>Notifications</h1>
                    {notifications.length === 0 ? <div className='text-center mt-4 font-roboto font-medium text-slate-400 text-3xl'>No notifications yet </div> : notifications?.map(notification => <NotificationCard notification={notification} key={notification.created_at} />)}
                    {/* Nothing to display here */}
                </div>
            </Layout>

        </>
    )
}

export default Notification