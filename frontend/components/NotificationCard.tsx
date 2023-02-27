import React, { ReactElement, SVGProps, useEffect, useState } from "react";
import { HeartIcon, ArrowPathRoundedSquareIcon, UserIcon } from '@heroicons/react/24/solid'
import twitterImage from '../public/Twitter_bird_logo.png'
import { JsxElement } from "typescript";
import TimeAgo from "timeago-react";
import Image from "next/image";
import { axiosPrivate } from "../api_utils/axios";


export default function NotificationCard({ notification }) {
    const { fan, tweet_id, created_at, has_read, notify_type, profile_image_path } = notification;



    let initialIcon: ReactElement<any, any> = <UserIcon />;
    let message; switch (notify_type) {
        case "followed":
            initialIcon = <UserIcon color="#00ADED" />;
            message = ` started following you`;
            break;
        case "replied":
            message = ` mentioned you `;
            break;
        case "liked":
            initialIcon = <HeartIcon color="#fc03df" />;
            message = ` liked your tweet`;
            break;
        case "retweeted":
            initialIcon = <ArrowPathRoundedSquareIcon color="#0db813" />;
            message = ` retweeted your tweet`

        // default: icon = "bell"; message = `New notification: ${type}`;
    }

    const [icon, setIcon] = useState<(ReactElement<any, any>)>(initialIcon);

//     const deleteNotification = async () => {
//         const { result } = await (await axiosPrivate.delete(`/api/v1/notification/${tweet_id}`)).data;
// console.log(result)
//     }

//     useEffect(() => {

     
//         return () => {
//             deleteNotification()
//         }
//     }, [])


    // const cardClassNames = read ? "bg-white opacity-50 hover:opacity-100 transition-opacity duration-300 cursor-pointer" : "bg-white hover:bg-gray-100 transition-colors duration-300 cursor-pointer";
    return <div className="">

        <div className="flex items-center space-x-4 py-4 px-6 border-gray-100 border-b hover:bg-gray-100 transition duration-200 hover:cursor-pointer">
            <div className=" w-10 h-10 flex items-center justify-center rounded-full">
                {notify_type === "replied" ? <Image src={twitterImage} alt={""} width={40} height={40} className="m-3" /> : (icon)}
            </div>
            <div className="flex-grow">

                <p className="text-gray-800">
                    <span className="font-bold">{fan}</span>
                    {message}
                </p>
                <TimeAgo className='text-sm pt-0.5'
                    datetime={created_at}
                />
            </div>
        </div>
    </div>

    {/* <div >
<Image src={twitterImage} alt={""} width={40} height={40} className="m-3" />
</div> */}

}