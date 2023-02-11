import React from 'react'
import { ChatBubbleBottomCenterIcon, ArrowPathRoundedSquareIcon, HeartIcon, ChartBarIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline'
// import { ScriptProps } from 'next/script'
import { Tweet } from "../typings"
import TimeAgo from 'timeago-react'
import Image from 'next/image'

interface Props {
  tweet: Tweet
}

function Tweet({ tweet }: Props) {
  return (
    <div className='flex space-x-2 py-3 border-gray-100 border-b hover:bg-slate-100'>
      <div className=''>
        {!tweet.profileImg ? <img className='h-12 w-14 object-cover rounded-full' src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Placeholder_no_text.svg/768px-Placeholder_no_text.svg.png" alt="" />
          : <Image src={tweet.profileImg} alt="" />}
      </div>

      <div className='flex-col space-y-3 w-full'>
        <div className='flex space-x-2  '>
          <p className='font-semibold'>{tweet.username}</p>
          <TimeAgo className='text-sm pt-0.5'
            datetime={tweet.created_at}

          />
        </div>

        <div className='font-thin relative -top-2'>
          {tweet.tweet_text}
        </div>

        {tweet.tweet_image_path && tweet.tweet_image_path !== "undefined" && <div className='w-full pr-14'><img className='  w-full rounded-xl h-fit' src={`http://localhost:5000/tweetImages/${tweet.tweet_image_path}`} alt="" /></div>}

        <div className='flex justify-between pr-3 md:w-96 '>
          <ChatBubbleBottomCenterIcon className='w-5 h-5 hover:text-twitter cursor-pointer' />
          <div className='flex items-center space-x-1 hover:text-twitter cursor-pointer'><ArrowPathRoundedSquareIcon className='w-5 h-5  ' /><p className='text-sm'>{tweet.retweet_count}</p></div>
          <div className='flex items-center space-x-1 hover:text-twitter cursor-pointer'><HeartIcon className='w-5 h-5  ' /><p className='text-sm'>{tweet.favorite_count}</p></div>
          <ChartBarIcon className='w-5 h-5 hover:text-twitter cursor-pointer' />
          <ArrowUpTrayIcon className='w-5 h-5 hover:text-twitter cursor-pointer' />
        </div>
      </div>

    </div>
  )
}

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