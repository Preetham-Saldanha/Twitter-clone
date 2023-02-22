import React from 'react'
import NotificationCard from '../components/NotificationCard'
import SideBar from '../components/SideBar'
import Widget from '../components/Widget'
function Notification() {
    const notification = {
        type: "follow", user: "oscar", tweet: "hello there", date: "jhhjh", read: false
    }

    return (


        <div className='grid grid-cols-9  font-roboto  lg:max-w-6xl mx-auto'>
            <SideBar row={2} />

            <div className='col-span-5'>
                {/* <NotificationCard notification={notification} /> */}
                Nothing to display here
            </div>

            <Widget /></div>
    )
}

export default Notification