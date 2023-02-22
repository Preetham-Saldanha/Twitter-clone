import React, { ChangeEvent, useRef, useState, Dispatch } from 'react'
import { PhotoIcon, GifIcon, FaceSmileIcon, CalendarIcon, MapPinIcon, XMarkIcon } from '@heroicons/react/24/outline'
import axios from 'axios'

import { Tweet } from '../typings'
import { fetchTweets } from '../utils/fetchtweets'
import { axiosPrivate } from '../api_utils/axios'
import useAuth from '../hooks/useAuth'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'

interface Props {
    // setTweets: Dispatch<React.SetStateAction<Tweet[]>>
    setPageNumber: React.Dispatch<React.SetStateAction<number>>,
    setRefreshFlag: React.Dispatch<React.SetStateAction<boolean>>,
    reply_to?: string,
    closeModalBox?:React.Dispatch<React.SetStateAction<Tweet>>
}
type Data = {
    tweets: Tweet[]
}

function TweetBox({ setPageNumber, setRefreshFlag, reply_to, closeModalBox }: Props) {
    const { auth }: any = useAuth()
    console.log(auth, 'auth')
    const [tweet, setTweet] = useState<string>('')
    const [image, setImage] = useState<File>()
    const [isImageBoxOpen, setImageBoxOpen] = useState<boolean>(false)
    const imageInputRef = useRef<HTMLInputElement>()
    const router = useRouter()

    const handleAttachImage = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        setImage(event.target.files[0])
        setImageBoxOpen(false)

    }

    const handleRemoveImage = () => {
        setImage(undefined)
    }

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        const formData = new FormData()
        const username = auth.username
        if (auth.profile_image_path && auth.profile_image_path !== "undefined") {
            formData.append("profile_image_path", auth.profile_image_path)
        } else {
            formData.append("profile_image_path", undefined)
        }

        if (auth.firstname && auth.firstname !== "undefined") {
            formData.append("firstname", auth.firstname)
        } else {
            formData.append("firstname", "")
        }

        if (auth.lastname && auth.lastname !== "undefined") {
            formData.append("lastname", auth.lastname)
        } else {
            formData.append("lastname", "")
        }

        if (reply_to) {
            formData.append("reply_to", reply_to)
        }
        else{
            formData.append("reply_to", "-1")

        }

        formData.append("username", username)
        if (image !== undefined) formData.append("image", image)
        formData.append("tweet_text", tweet)

        // let axiosConfig = {
        //     headers: {
        //         'Content-Type': 'application/json;charset=UTF-8',
        //         "Access-Control-Allow-Origin": "*",
        //     }
        // };
        try {
            // const res = await axiosPrivate.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tweet`, formData)
            const res = await axiosPrivate.post(`/api/v1/tweet`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            })
            setTweet('')
            setImage(undefined)
            console.log(res)

            // const tweets = await fetchTweets()
            // setTweets(tweets)
            // const data: Data = (await axiosPrivate.get(`/api/v1/tweet/-1`)).data
            // const newTweets: Tweet[] = data.tweets;
            // setTweets(newTweets)
            closeModalBox(null) // this line closes the CustomReplyModal component by setting replyTweetData to null
            setPageNumber(-1)
            setRefreshFlag(prev => !prev)
        }
        catch (error) {
            if (error.response && error.response.data) {
                toast.error(error?.response.data)

                if (error?.response?.data === "log in again!") {
                    setTimeout(() => {
                        router.replace({
                            pathname: "/login",
                        },)
                    })
                }
            }
            else {
                toast.error(error.message)
            }

        }

    }

    return (
        <div className='border-gray-100 border-b'>

            {
                auth.username === "" ? <p className='p-4 w-2/3 mt-6 m-auto text-center font-semibold sm:text-3xl text-xl'>Welcome to Twitter!</p> :
                    <div className='flex space-x-2 mt-3 '  >
                        <div>

                            {!auth.profile_image_path ? <img className='h-14 w-14 rounded-full object-cover'
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Placeholder_no_text.svg/768px-Placeholder_no_text.svg.png"
                                alt="" /> :
                                <img src={`http://localhost:5000/profileImages/${auth.profile_image_path}`} className='h-14 w-14 rounded-full object-cover' />}
                        </div>



                        <div className='flex-1 '>
                            <form >
                                <div>
                                    <input

                                        value={tweet}
                                        onChange={(e) => setTweet(e.target.value)}
                                        type="text"
                                        placeholder=" what's happening?"
                                        className='outline-none h-8 w-full text-lg ' />
                                </div>
                                <div className='flex h-20 border-gray-100 border-t items-center' >
                                    <div className='flex space-x-2 mt-2 flex-1 ml-1 '>
                                        <PhotoIcon onClick={() => { if (!image) { setImageBoxOpen(!isImageBoxOpen) } }} className='h-5 w-5 text-twitter cursor-pointer transition-transform duration-150 hover:scale-125 ease-out ' />
                                        <GifIcon className='h-5 w-5  text-twitter  cursor-pointer transition-transform duration-150 hover:scale-125 ease-out' />
                                        <FaceSmileIcon className='h-5 w-5 text-twitter  cursor-pointertransition-transform duration-150 hover:scale-125 ease-out' />
                                        <CalendarIcon className='h-5 w-5 text-twitter cursor-pointer transition-transform duration-150 hover:scale-125 ease-out' />
                                        <MapPinIcon className='h-5 w-5 text-twitter  cursor-pointer transition-transform duration-150 hover:scale-125 ease-out' />
                                    </div>
                                    <button disabled={!tweet} className='bg-twitter text-white px-3 py-1 rounded-full mr-3 h-10 w-20 disabled:opacity-40' onClick={(e) => handleSubmit(e)}>{reply_to? "Reply" : "tweet"}</button>
                                </div>

                            </form>
                        </div>
                    </div>
            }
            {isImageBoxOpen && <div className="mb-2 w-1/2 mx-auto ">
                <form className='flex space-x-1'>
                    <label className='h-12 w-3/4 bg-twitter/80 text-white  text-center rounded-xl inline-block cursor-pointer'>
                        <input type="file" ref={imageInputRef} onChange={(e) => handleAttachImage(e)} name="image_input" className='opacity-0 z-10 hidden' />
                        <p className='pt-3 '>Select Photo </p>
                    </label>
                    {/* <button className=' w-1/4 bg-twitter/80 text-white rounded-r-xl'>Upload</button> */}
                </form>
            </div>}

            {image && <div className=' w-full px-14 mb-3 '>
                <div className='w-full flex justify-end py-3' onClick={handleRemoveImage} ><div className='hover:bg-slate-200 rounded-full p-1'><XMarkIcon className='w-7 h-7 text-gray-500 ' /></div></div>
                <img src={URL.createObjectURL(image)} className="w-full rounded-xl h-fit" />
            </div>}

        </div>



    )
}

export default TweetBox;