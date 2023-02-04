import { Tweet } from "../typings"
// import axios from 'axios'
import usePrivateAxios from "../hooks/usePrivateAxios"
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    tweets: Tweet[]
  }


export const fetchTweets =async ()=>{

const axiosPrivate = usePrivateAxios()
// const data : Data =  (await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tweet`)).data
const data : Data =  (await axiosPrivate.get(`/api/v1/tweet`)).data
console.log("dtaa", data)
const tweets : Tweet[]  =data.tweets;

return tweets;
}