import React, { ReactElement, SVGProps, useEffect, useState } from "react";
import { HeartIcon, ArrowPathRoundedSquareIcon, UserIcon } from '@heroicons/react/24/solid'
import twitterImage from '../public/Twitter_bird_logo.png'
import { JsxElement } from "typescript";
import TimeAgo from "timeago-react";
import Image from "next/image";
import { axiosPrivate } from "../api_utils/axios";
import { Router, useRouter } from "next/router";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { Popover , Typography} from "@mui/material";
import { toast } from "react-hot-toast";


export default function NotificationCard({ notification }) {
    const { id, fan, tweet_id, created_at, has_read, notify_type, profile_image_path } = notification;

    const router = useRouter()

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


    const [anchorEl, setAnchorEl] = React.useState<Element | null>(null);
    const [open, setOpen] =useState(false);
    const popid = open ? 'simple-popover' : undefined;


    const deleteNotification = async () => {
        console.log("this executes")
        const { result } = await (await axiosPrivate.delete(`/api/v1/notification/${id}`)).data;
        console.log(result, "deleted now")
       if(result){
            toast.success("marked as read")
            setTimeout(()=>{
                toast.dismiss()
            },1100)
       }
       setOpen(false)
        // open=false
    }

    

    const handleClick = (ct: HTMLButtonElement) => {
        // ct.nextElementSibling
        setAnchorEl(ct.nextElementSibling);
        setOpen(true)
       
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };

    // useEffect(() => {

    //     return () => {
    //         if (router.pathname !== "/notification") {
    //             console.log("testing clean up")
    //             deleteNotification()
    //         }
    //     }
    // }, [])



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
            <div className=''>
          <button className='hover:bg-slate-200 rounded-full p-1 h-fit ' onClick={(e) => handleClick(e.currentTarget)}><EllipsisVerticalIcon height={25} />
          </button>
          <button className='bg-slate-300 bottom-10 relative top-9'></button>
        </div>
        <Popover
          id={popid}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
        >

          {/* MuiTypography-root */}
          <Typography sx={{ p: 1 }}>
            {/* {auth.username !==tweet.username && (isFollowing? <p className=' hover:text-red-600 w-fit flex'> <UserIcon className='h-7'/> <span className='ml-3'>Unfollow @{tweet.username}</span></p> :<p className=' w-fit flex'> <UserIcon className='h-7'/> <span className='ml-3'>follow @{tweet.username}</span></p>)} */}
             <p className='  flex cursor-pointer hover:bg-slate-200 rounded-md p-1' onClick={deleteNotification}>  <span className='ml-3'>Mark as read</span></p>

          </Typography>
        </Popover>

        </div>
    </div>

    {/* <div >
<Image src={twitterImage} alt={""} width={40} height={40} className="m-3" />
</div> */}

}