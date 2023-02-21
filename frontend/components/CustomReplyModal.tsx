import React from 'react'
import TweetBox from './TweetBox'
import TweetComponent from './Tweet'
import { Tweet } from '../typings'
import { XMarkIcon } from '@heroicons/react/24/outline'

type Props = {
    setPageNumber: React.Dispatch<React.SetStateAction<number>>,
    setRefreshFlag: React.Dispatch<React.SetStateAction<boolean>>,
    reply_to: string,
    tweet: Tweet,
    setReplyTweetData: React.Dispatch<React.SetStateAction<Tweet>>
}


function CustomReplyModal({ setPageNumber, setRefreshFlag, reply_to, tweet, setReplyTweetData }: Props) {

    const reply_to_string= reply_to +" "+  tweet.tweet_id

    return (
        <div className='absolute top-0 left-0 w-full h-full'>
            <div className='absolute bg-gray-500 opacity-70 z-0 w-full h-full top-0 left-0'></div>
            <div className=' relative flex-col mt-28 z-30 lg:w-1/3 w-1/2 h-fit m-auto bg-white rounded-xl left-14 p-6  '>
            <div className='lg:w-4/12 flex justify-between w-1/2' onClick={()=>{setReplyTweetData(null)}}>
                    <div className='hover:bg-slate-200 rounded-full p-1' ><XMarkIcon className='w-7 h-7 text-gray-700 ' /></div>
                </div>
                <TweetComponent tweet={tweet} isInsideReplyModal={true} />
                <p className=' text-gray-500 pl-16 my-4'>Replying to <span className='text-twitter font-roboto '>@{tweet.username}</span></p>
                <TweetBox setPageNumber={setPageNumber} setRefreshFlag={setRefreshFlag} reply_to={reply_to_string} closeModalBox={setReplyTweetData}/>
            </div>
        </div>
    )
}

export default CustomReplyModal