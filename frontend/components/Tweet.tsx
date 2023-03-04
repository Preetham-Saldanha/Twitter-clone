import React, { forwardRef, useEffect, useState } from 'react'
import { ChatBubbleBottomCenterIcon, ArrowPathRoundedSquareIcon, HeartIcon, ChartBarIcon, ArrowUpTrayIcon, EllipsisVerticalIcon, UserIcon, BookmarkIcon } from '@heroicons/react/24/outline'
import { HeartIcon as SolidHeartIcon } from '@heroicons/react/24/solid'
// import { ScriptProps } from 'next/script'
import { Tweet, UserAuth } from "../typings"
import TimeAgo from 'timeago-react'
import Image from 'next/image'
import { axiosPrivate } from '../api_utils/axios'
import useAuth from '../hooks/useAuth'
import { useRouter } from 'next/router'
import CustomPopover from './CustomPopover'
import { Popover } from '@mui/material'
import Typography from '@mui/material/Typography'
import useAddFollower from '../hooks/useAddFollower'
import { useRemoveFollower } from '../hooks/useRemoveFollower'
import { toast } from 'react-hot-toast'

interface Props {
  tweet: Tweet,
  isInsideReplyModal?: boolean,
  handleReply?: Function
}



const Tweet = forwardRef(({ tweet, isInsideReplyModal, handleReply }: Props, ref: React.MutableRefObject<HTMLDivElement>) => {
  const { auth }: any = useAuth()
  const router = useRouter()
  const [isRetweet, setRetweet] = useState<boolean>(false)
  const [isLike, setLike] = useState<boolean>(false)
  const [isFollowing, setIsFollowing] = useState<boolean>(false)

  const [likeCount, setLikeCount] = useState<number>(tweet.favorite_count);
  const [retweetCount, setRetweetCount] = useState<number>(tweet.retweet_count);

  const viewValue = isInsideReplyModal ? true : false
  const [isPassedToReplyModal, setIsPassedToReplyModal] = useState(viewValue)

  const [anchorEl, setAnchorEl] = React.useState<Element | null>(null);


  const addFollowing = useAddFollower();
  const removeFollowing = useRemoveFollower()

  const handleClick = (ct: HTMLButtonElement) => {
    // ct.nextElementSibling
    setAnchorEl(ct.nextElementSibling);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  // const [ isPopoverOpen, setIsPopoverOpen] = useState(false)

  const checkFollow = async () => {
    const { result } = await (await axiosPrivate.get(`api/v1/user/isfollowing/${tweet.username}`)).data
    console.log("guy has follow", result)
    if (result === true) {
      removeFollowing(auth.username, tweet.username).then(data => { })
      toast.success("unfollowed successfully")
    } else {
      addFollowing(auth.username, tweet.username).then(data => { })

      toast.success("followed successfully")

    }
    setTimeout(() => {
      toast.dismiss()
    }, 1200)

  }
  const updateTweet = async (action) => {

    let rt_flag = 1;
    let ft_flag = 1;

    if (action === "like") {
      const newLikeCount = isLike ? likeCount - 1 : likeCount + 1
      setLikeCount(newLikeCount)
      setLike(prev => !prev)

      if (isLike) {
        ft_flag = -1
        // setLikeCount(prev => prev - 1)

      } else {
        // setLikeCount(prev => prev + 1)
      }
      rt_flag = 0
    }
    else {
      
      const newRetweetCount = isRetweet ? retweetCount - 1 : retweetCount + 1;
      setRetweetCount(newRetweetCount)
      setRetweet(prev => !prev)
      if (isRetweet) {
        rt_flag = -1

        // setRetweetCount(prev => prev - 1)
      } else {
        // setRetweetCount(prev => prev + 1)
      }
      ft_flag = 0;
    }


    try {
      console.log(auth)
      const result = await axiosPrivate.post(`/api/v1/tweet/${tweet.tweet_id}?retweet_count=${rt_flag}&favorite_count=${ft_flag}&username=${auth.username}`,
        { username: auth.username })

      if (result) {
        if (action === "like") {
          // const newLikeCount = isLike ? likeCount - 1 : likeCount + 1
          // setLikeCount(newLikeCount)
          // setLike(prev => !prev)

        } else {
          // const newRetweetCount = isRetweet ? retweetCount - 1 : retweetCount + 1;
          // setRetweetCount(newRetweetCount)
          // setRetweet(prev => !prev)
        }
      }
    }
    catch (err) {
      console.log(err)
    }


  }

  const checkTweetBodyData = async () => {
    try {
      let axiosConfig = { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }
      const { result }: { result: { likeInfo: boolean, retweetInfo: boolean, followingInfo: boolean } } = await (await axiosPrivate.post(`api/v1/retweetandlikeinfo`, { username: auth?.username, tweet_id: tweet.tweet_id }, axiosConfig)).data
      console.log("result", result.likeInfo)
      if (result) {
        console.log("look", result.followingInfo, tweet.username)
        setLike(result.likeInfo)
        setRetweet(result.retweetInfo)
        setIsFollowing(result.followingInfo)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const openProfile = () => {
    if (!isPassedToReplyModal) {
      router.push({ pathname: "/profile", query: { username: tweet.username } })
    }
  }

  const onCommentClick = () => {
    handleReply(tweet)
  }

  useEffect(() => {
    checkTweetBodyData()
    if (isLike) console.log("helloo", isLike)

  }, [])


  return (
    <div >
      <div className='flex space-x-2 py-3 border-gray-100 border-b hover:bg-gray-100 transition duration-200' ref={ref}>
        <div className='cursor-pointer' onClick={openProfile}>
          {!tweet.profile_image_path ? <img className='h-12 w-14 object-cover rounded-full' src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Placeholder_no_text.svg/768px-Placeholder_no_text.svg.png" alt="" />
            : <img src={`http://localhost:5000/profileImages/${tweet.profile_image_path}`} alt="" className='h-12 w-14 object-cover rounded-full' />}
        </div>

        <div className='flex-col space-y-3 w-full font-roboto '>
          <div className='flex justify-between' >
            <div className='flex space-x-2 w-2/3 cursor-pointer' onClick={openProfile} > <p className='font-semibold'>{tweet.firstname} {tweet.lastname}</p>
              <p >@{tweet.username}</p>
              <TimeAgo className='text-sm pt-0.5'
                datetime={tweet.created_at}
              /></div>

          </div>
          {tweet.reply_to !== "-1" && <p className=' text-gray-500 relative -top-3 '>Replying to <span className='text-twitter font-roboto '>@{tweet.reply_to.split(" ")[0]}</span></p>}

          <div className='font-thin relative -top-2'>
            {tweet.tweet_text}
          </div>

          {tweet.tweet_image_path && tweet.tweet_image_path !== "undefined" && !isInsideReplyModal && <div className='w-full pr-14'><img className='w-full rounded-xl h-fit' src={`http://localhost:5000/tweetImages/${tweet.tweet_image_path}`} alt="" /></div>}

          {!isPassedToReplyModal && <div className='flex justify-between pr-3 md:w-5/6 '>
            <div onClick={onCommentClick}><ChatBubbleBottomCenterIcon className='w-5 h-5 hover:text-twitter cursor-pointer' /></div>
            <div className='flex items-center space-x-1 hover:text-twitter cursor-pointer' onClick={() => { updateTweet("retweet") }}><ArrowPathRoundedSquareIcon className='w-5 h-5  ' color={isRetweet ? "#0db813" : "black"} /><p className='text-sm'>{retweetCount}</p></div>
            <div className='flex items-center space-x-1 hover:text-twitter cursor-pointer' onClick={() => { updateTweet("like") }}>{isLike ? <SolidHeartIcon className='w-5 h-5 ' color='#fc03df' /> : <HeartIcon className='w-5 h-5 ' />}<p className='text-sm'>{likeCount}</p></div>
            <ChartBarIcon className='w-5 h-5 hover:text-twitter cursor-pointer' />
            <ArrowUpTrayIcon className='w-5 h-5 hover:text-twitter cursor-pointer' />
            {/* <SolidHeartIcon/> */}
          </div>}
        </div>
        {/* <CustomPopover/> */}
        {/* <div className='hover:bg-slate-200 rounded-full p-1 h-fit ' onClick={()=>setIsPopoverOpen(true)}><EllipsisVerticalIcon height={25} />
       </div> */}
        <div className=''>
          <button className='hover:bg-slate-200 rounded-full p-1 h-fit ' onClick={(e) => handleClick(e.currentTarget)}><EllipsisVerticalIcon height={25} />
          </button>
          <button className='bg-slate-300 bottom-10 relative top-9'></button>
        </div>

        <Popover
          id={id}
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
            {auth.username !== tweet.username && (<p className='  flex cursor-pointer hover:bg-slate-200 rounded-md p-1' onClick={checkFollow}> <UserIcon className='h-7' /> <span className='ml-3'>follow/unfollow @{tweet.username}</span></p>)}
            <p className=' hover:bg-slate-200 rounded-md flex cursor-pointer p-1'><BookmarkIcon className='h-7' /> <span className='ml-3'>Add/Remove from bookmark.</span></p>

          </Typography>
        </Popover>
      </div>
      {/* { isPopoverOpen && <div className=''><div className='absolute h-full w-full  top-0 left-0 ' onClick={()=>setIsPopoverOpen(false)} > </div> <CustomPopover/></div>} */}


    </div>
  )
})

// {
//   "tweet_id": 12,
//   "username": "Zebra",
//   "tweet_text": "something different 12",
//   "created_at": "2023-01-26T07:42:51.000Z",
//   "retweet_count": 3,
//   "favorite_count": 3,
//   "tweet_image_path": "image-1674718971482-966520934"
// }
export default Tweet