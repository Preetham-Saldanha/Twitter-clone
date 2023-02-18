import React, { useEffect, useRef, useState, useCallback, forwardRef } from 'react'
import { ArrowPathIcon } from '@heroicons/react/24/outline'
import TweetBox from './TweetBox'
import { Tweet } from '../typings'
import TweetComponent from './Tweet'
import { fetchTweets } from '../utils/fetchtweets'
import axios from '../api_utils/axios'
import { toast, Toaster } from 'react-hot-toast'
import { useRouter } from 'next/router';
import usePrivateAxios from '../hooks/usePrivateAxios'
import useAuth from '../hooks/useAuth'
import useTweetPaginaton from '../hooks/useTweetPaginaton'
interface Props {
  tweets: Tweet[]
}
type Data = {
  tweets: Tweet[]
}
const tweet = {
  "tweet_id": 12,
  "username": "Zebra",
  "tweet_text": "something different 12",
  "created_at": "2023-01-26T07:42:51.000Z",
  "retweet_count": 3,
  "favorite_count": 3,
  "tweet_image_path": "image-1674718971482-966520934"
}



function Feed({ tweets: tweetsProp }: Props) {

  const observer = useRef<null | IntersectionObserver>(null)
  const [pageNumber, setPageNumber] = useState<number>(-1)
  const [tweets, setTweets] = useState<Tweet[]>()

  const router = useRouter()
  const axiosPrivate = usePrivateAxios()
  const { auth, setAuth }: any = useAuth()
  const { loading, error, hasMore, newTweets } = useTweetPaginaton({ pageNumber })

  const lastTweetRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      console.log(tweets.length, "tweets array size",hasMore)
      if (entries[0].isIntersecting  && tweets.length!==0 && hasMore) {
        console.log("gi")
        setPageNumber(tweets[tweets.length-1]?.tweet_id)
      }
    })
    if (node) observer.current.observe(node)
  }, [loading,tweets, hasMore])



  const refreshTweets = async () => {
    try {

      toast.loading("refreshing...")
      // const data : Data =  (await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tweet`)).data
      // axiosPrivate.defaults.headers.common['Authorization'] = `Bearer ${auth.accessToken}`

      const data: Data = (await axiosPrivate.get(`/api/v1/tweet/-1`)).data
      const newTweets: Tweet[] = data.tweets;
      console.log(newTweets)
      setTweets(newTweets)


      toast.dismiss()
      toast.success("Successfully loaded!")


    }
    catch (error) {

      if (error.response && error.response.data) {
        toast.error(error?.response.data)
        setTimeout(() => {
          router.push({
            pathname: "/login"
          })
        }, 1100)
      }
      else {
        toast.error(error.message)
      }


    }
  }


  useEffect(() => {
    setTweets(newTweets)
  },[newTweets])

  return (
    <>
      <Toaster position="top-center"
        reverseOrder={false} />
      <div className='col-span-7 lg:col-span-5 border-gray-100 border-x max-h-screen overflow-scroll scrollbar-hide '>
        {auth.username && <div className='flex items-center justify-between '>
          <h1 className='p-5 pb-0 text-xl font-bold mt-2 '>Home</h1>
          <ArrowPathIcon onClick={refreshTweets} className='w-8 mr-5 mt-5 h-8 cursor-pointer transition-all duration-500  hover:rotate-180 active:scale-125 ease-out text-twitter ' />

        </div>}
        <TweetBox setPageNumber={setPageNumber} />

        <div>
          {
            tweets && tweets.map(tweet => {
              if (tweet.tweet_id === tweets[tweets.length - 1].tweet_id) {
                return <TweetComponent tweet={tweet} key={tweet.tweet_id} ref={lastTweetRef} />
              } else {
                return <TweetComponent tweet={tweet} key={tweet.tweet_id} />
              }
            }
            )
          }
          {loading && <div>loading...</div>}
          {error && <div>error occured</div>}
        </div>
      </div>
    </>
  )
}

export default Feed