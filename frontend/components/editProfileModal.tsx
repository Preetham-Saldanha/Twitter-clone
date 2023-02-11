import React, { useEffect, useState } from 'react'
import twitterLogo from "../public/Twitter_bird_logo.png"
import Image, { StaticImageData } from 'next/image'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { toast } from 'react-hot-toast'
import { axiosPrivate } from '../api_utils/axios'
function EditProfileModal(props) {

    const [firstname, setFirstName] = useState<string>()
    const [lastName, setLastName] = useState<string>()
    const [bio, setBio] = useState<string>()
    const [location, setLocation] = useState<string>()
    const [image, setImage] = useState<File>()

    const [isSubmit, setIsSubmit] = useState<boolean>(false)

    const changeProfilePhoto: (photo: File) => void = (photo: File) => {
        if (photo) setImage(photo)
    }


    const handleSubmit = () => {
        toast.custom((t) => (
            <div
                className={`${t.visible ? 'animate-enter' : 'animate-leave'
                    } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
            >
                <div className="flex-1 w-0 p-4">
                    <div className="flex items-start">

                        <p>Do you want to save changes?</p>
                    </div>
                </div>
                <div className="flex border-l border-gray-200">
                    <button
                        onClick={() => {
                            toast.dismiss(t.id)
                            setIsSubmit(true)
                        }}
                        className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-twitter hover:text-twitter focus: focus:outline-none focus:ring-2 focus:bg-twitter focus:text-white"
                    >
                        Yes
                    </button>
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-twitter hover:text-twitter focus: focus:outline-none focus:ring-2 focus:bg-twitter focus:text-white"
                    >
                        No
                    </button>
                </div>
            </div>
        ))
    }

    async function updateUser() {
        const formData = new FormData()
        formData.append("firstname", firstname)
        formData.append("lastName", lastName)
        formData.append("bio", bio)
        formData.append("id", props.id)
        if (image !== undefined)  formData.append("profile_image",image)
        const result = await axiosPrivate.post("/api/v1/user", formData, {
            headers: { "Content-Type": "multipart/form-data" }
        })
        console.log(result)
    }

    useEffect(() => {
      
        if (isSubmit) {
            updateUser()
        }

    }, [isSubmit])
    return (
        <>
            {

            }  <div className=' absolute top-0 left-0 w-full h-full'>
                <div className='absolute bg-gray-500 opacity-70 z-0 w-full h-full top-0 left-0' onClick={() => props.setEnableEdit(prev => !prev)}></div>

                <div className=' relative flex-col mt-28 z-30 lg:w-1/3 w-1/2 h-2/3 m-auto bg-white rounded-xl left-14 p-1 overflow-scroll'>
                    <div className='flex w-full p-3 justify-between h-fit items-center '>
                        <div className='lg:w-4/12 flex justify-between w-1/2'>
                            <div className='hover:bg-slate-200 rounded-full p-1' onClick={() => props.setEnableEdit(prev => !prev)}><XMarkIcon className='w-6 h-6 text-gray-500 ' /></div>
                            <p className='font-bold text-2xl'>Edit Profile</p>
                        </div>
                        <button onClick={handleSubmit} className=' relative h-10 w-1/6 bg-black font-semibold border rounded-3xl text-white'>Save</button>
                    </div>
                    <form >
                        <div className='w-full '>
                            <div className='bg-slate-300 h-64 w-full'>
                            </div>
                            <label className=' flex  bg-white h-32 w-32 ml-4 rounded-full -mt-16 justify-center items-center z-50 p-0'>
                                <input type="file" onChange={(e) => changeProfilePhoto(e.target.files[0])} className='opacity-0 hidden ' />
                                {/* <div className=' flex relative bg-white h-32 w-32 ml-4 rounded-full -mt-16 justify-center items-center z-50 '> */}
                                <Image src={image ? URL.createObjectURL(image) : twitterLogo} alt="" height={100} width={100} className="rounded-full z-50 object-cover" />
                                {/* </div> */}
                            </label>
                        </div>

                        <div className='px-3 flex-col space-y-3 pb-6'>
                            <input type="text" className='border-gray-400 border rounded-md w-full h-10 p-3 text-gray-500' placeholder='firstname' value={firstname} onChange={(e)=>{setFirstName(e.target.value)}} />
                            <input type="text" className='border-gray-400 border rounded-md w-full h-10 p-3 text-gray-500 ' placeholder='lastname' value={lastName} onChange={(e)=>{setLastName(e.target.value)}}/>
                            <textarea className='border-gray-400 border rounded-md w-full h-40 p-3 text-gray-500' placeholder='enter bio here' value={bio}  onChange={(e)=>{setBio(e.target.value)}}/>
                            <input type="text" className='border-gray-400 border rounded-md w-full h-10 p-3 text-gray-500' placeholder='location' value={location} onChange={(e)=>{setLocation(e.target.value)}}/>
                        </div>
                    </form>
                </div>

            </div>

        </>
    )
}

export default EditProfileModal