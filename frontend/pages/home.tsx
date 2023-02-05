import React from 'react'
import SideBar from '../components/SideBar'
import Feed from '../components/Feed'
import Widget from '../components/Widget'
import { GetServerSideProps } from 'next'
import { fetchTweets } from '../utils/fetchtweets'
import { Tweet } from '../typings'
import useAuth from '../hooks/useAuth'
import usePrivateAxios from '../hooks/usePrivateAxios'
import axios from '../api_utils/axios'

interface Props {
    tweets: Tweet[]
}
type Data = {
    tweets: Tweet[]
  }
function Home({ tweets }: Props) {

    

    return (
        <div className='grid grid-cols-9  font-roboto  lg:max-w-6xl mx-auto'>        
            <SideBar />

            <Feed tweets={tweets} />

            <Widget /></div>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    // const tweets = await fetchTweets();
    // const tweets=null
    // const axiosPrivate = usePrivateAxios()
    // const {auth, setAuth} : any = useAuth()
 
  
        const data : Data =  (await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tweet`)).data
        // axiosPrivate.defaults.headers.common['Authorization'] = `Bearer ${auth.accessToken}`
        // const data: Data = (await axiosPrivate.get(`/api/v1/tweet`)).data
        const tweets: Tweet[] = data.tweets;

    return {
        props: { tweets }
    }
}
export default Home