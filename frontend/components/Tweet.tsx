import React, { forwardRef, useEffect, useState } from 'react'
import { ChatBubbleBottomCenterIcon, ArrowPathRoundedSquareIcon, HeartIcon, ChartBarIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline'
import { HeartIcon as SolidHeartIcon } from '@heroicons/react/24/solid'
// import { ScriptProps } from 'next/script'
import { Tweet, UserAuth } from "../typings"
import TimeAgo from 'timeago-react'
import Image from 'next/image'
import { axiosPrivate } from '../api_utils/axios'
import useAuth from '../hooks/useAuth'
import { useRouter } from 'next/router'

interface Props {
  tweet: Tweet
}



const Tweet = forwardRef(({ tweet }: Props, ref: React.MutableRefObject<HTMLDivElement>) => {
  const { auth }: any = useAuth()
  const router = useRouter()
  const [isRetweet, setRetweet] = useState<boolean>(false)
  const [isLike, setLike] = useState<boolean>(false)

  const [likeCount, setLikeCount] = useState<number>(tweet.favorite_count);
  const [retweetCount, setRetweetCount] = useState<number>(tweet.retweet_count);

  const updateTweet = async (action) => {

    let rt_flag = 1;
    let ft_flag = 1;

    if (action === "like") {
      if (isLike) {
        ft_flag = -1
        setLikeCount(prev => prev - 1)
      } else {
        setLikeCount(prev => prev + 1)
      }
      rt_flag = 0
    }
    else {
      if (isRetweet) {
        rt_flag = -1
        setRetweetCount(prev => prev - 1)
      } else {
        setRetweetCount(prev => prev + 1)
      }
      ft_flag = 0;
    }


    try {
      console.log(auth)
      const result = await axiosPrivate.post(`/api/v1/tweet/${tweet.tweet_id}?retweet_count=${rt_flag}&favorite_count=${ft_flag}&username=${auth.username}`,
        { username: auth.username })

    }
    catch (err) {
      console.log(err)
    }
    if (action === "like") {
      setLike(prev => !prev)
    } else {
      setRetweet(prev => !prev)
    }

  }

  const checkTweetBodyData = async () => {
    try {
      let axiosConfig = { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }
      const { result }: { result: { likeInfo: boolean, retweetInfo: boolean } } = await (await axiosPrivate.post(`api/v1/retweetandlikeinfo`, { username: auth?.username, tweet_id: tweet.tweet_id }, axiosConfig)).data
      console.log("result", result.likeInfo)
      if (result) {
        console.log("look", result["likeInfo"])
        setLike(result.likeInfo)
        setRetweet(result.retweetInfo)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const openProfile = () => {
    router.push({ pathname: "/profile", query: {username:tweet.username} })
  }

  useEffect(() => {
    checkTweetBodyData()
    if (isLike) console.log("helloo", isLike)
  }, [])


  return (
    <div className='flex space-x-2 py-3 border-gray-100 border-b hover:bg-slate-100' ref={ref}>
      <div className='' onClick={openProfile}>
        {!tweet.profile_image_path ? <img className='h-12 w-14 object-cover rounded-full' src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Placeholder_no_text.svg/768px-Placeholder_no_text.svg.png" alt="" />
          : <img src={`http://localhost:5000/profileImages/${tweet.profile_image_path}`} alt="" className='h-12 w-14 object-cover rounded-full' />}
      </div>

      <div className='flex-col space-y-3 w-full'>
        <div className='flex space-x-2' onClick={openProfile}>
          <p className='font-semibold'>{tweet.firstname} {tweet.lastname}</p>
          <p >@{tweet.username}</p>
          <TimeAgo className='text-sm pt-0.5'
            datetime={tweet.created_at}

          />
        </div>

        <div className='font-thin relative -top-2'>
          {tweet.tweet_text}
        </div>

        {tweet.tweet_image_path && tweet.tweet_image_path !== "undefined" && <div className='w-full pr-14'><img className='w-full rounded-xl h-fit' src={`http://localhost:5000/tweetImages/${tweet.tweet_image_path}`} alt="" /></div>}

        <div className='flex justify-between pr-3 md:w-96 '>
          <ChatBubbleBottomCenterIcon className='w-5 h-5 hover:text-twitter cursor-pointer' />
          <div className='flex items-center space-x-1 hover:text-twitter cursor-pointer' onClick={() => { updateTweet("retweet") }}><ArrowPathRoundedSquareIcon className='w-5 h-5  ' color={isRetweet ? "#0db813" : "black"} /><p className='text-sm'>{retweetCount}</p></div>
          <div className='flex items-center space-x-1 hover:text-twitter cursor-pointer' onClick={() => { updateTweet("like") }}>{isLike ? <SolidHeartIcon className='w-5 h-5 ' color='#fc03df' /> : <HeartIcon className='w-5 h-5 ' />}<p className='text-sm'>{likeCount}</p></div>
          <ChartBarIcon className='w-5 h-5 hover:text-twitter cursor-pointer' />
          <ArrowUpTrayIcon className='w-5 h-5 hover:text-twitter cursor-pointer' />
          {/* <SolidHeartIcon/> */}
        </div>
      </div>

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