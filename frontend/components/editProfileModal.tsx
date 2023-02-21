import React, { useEffect, useState } from 'react'
import twitterLogo from "../public/Twitter_bird_logo.png"
import Image, { StaticImageData } from 'next/image'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { toast } from 'react-hot-toast'
import { axiosPrivate } from '../api_utils/axios'
import { profileDataType } from '../typings'
import { useRouter } from 'next/router'
import ConfirmModal from './ConfirmModal'
function EditProfileModal(props) {

    const router = useRouter()
    const [firstname, setFirstName] = useState<string>(props?.firstname)
    const [lastname, setLastName] = useState<string>(props?.lastname)
    const [bio, setBio] = useState<string>(props?.bio)
    const [location, setLocation] = useState<string>(props?.location)
    const [image, setImage] = useState<File>()
    const [openConfirmModal, setOpenConfirmModal] = useState(false)
    const [isSubmit, setIsSubmit] = useState<boolean>(false)

    const imageUrl = (props.profile_image_path !== "undefined" && props.profile_image_path !== null) ? `http://localhost:5000/profileImages/${props.profile_image_path}` : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Placeholder_no_text.svg/768px-Placeholder_no_text.svg.png"

    const [imageUrlState, setImageUrlState] = useState(imageUrl)
    const changeProfilePhoto: (photo: React.ChangeEvent<HTMLInputElement>) => void = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        console.log(event.target.files[0])
        if (event.target.files[0]) {
            setImage(event.target.files[0])
            setImageUrlState(URL.createObjectURL(event.target.files[0]))

        }
    }

    function updateFlag() {
        if (!props.isAnythingChanged) props.setIsAnythingChanged(true)
    }

    const handleSubmit = () => {

        if (!props.isAnythingChanged) {
            console.log("we are here")
            props.setEnableEdit(false)
            return
        }

        setOpenConfirmModal(true)
    }

    async function updateUser(controller: AbortController) {
        if (!props.isAnythingChanged) return
        const formData = new FormData()
        formData.append("firstname", firstname)
        formData.append("lastname", lastname)
        formData.append("bio", bio)
        formData.append("location", location)
        formData.append("username", props.username)
        console.log(image, 'this is image')
        if (image !== undefined) {
            formData.append("image", image)
        }

        formData.append("id", props.id)
        // for (let k of  formData.entries()){
        //     console.log(k)
        // }


        let axiosConfig = {
            headers: {
                "Content-Type": "multipart/form-data",
                // "Access-Control-Allow-Origin": "*",
            },
            signal: controller.signal
        };

        try {
            const result = await axiosPrivate.post("/api/v1/user/", formData, axiosConfig)
            console.log("result is", result)
            if (result.data.message === "succesfully updated") {
                toast.success("Updated your profile!")
                // console.log(result.data.updatedDetails)
                // const { firstname, lastname, bio, location, profile_image_path } = result.data.updatedDetails
                // console.log(props.profileData)
                // console.log({ ...props.profileData, firstname, lastname, bio, location, profile_image_path })
                // props.setProfileData(prev =>{return { ...prev, firstname, lastname, bio, location, profile_image_path }})
            }
            props.setEnableEdit(prev => !prev)
            console.log(result)
            setTimeout(() => toast.dismiss(), 1100)
        } catch (error) {
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

    useEffect(() => {
        const controller = new AbortController()
        if (isSubmit) {
            updateUser(controller)
        }

        return () => { controller.abort(); }
    }, [isSubmit])
    return (
        <>
            {
                openConfirmModal && <ConfirmModal setIsSubmit={setIsSubmit} setOpenConfirmModal={setOpenConfirmModal} message={"Save changes made?"}/>
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
                                <input type="file" onChange={(e) => { updateFlag(); changeProfilePhoto(e) }} className='opacity-0 hidden ' />
                                {/* <div className=' flex relative bg-white h-32 w-32 ml-4 rounded-full -mt-16 justify-center items-center z-50 '> */}
                                {/* <Image src={image ? URL.createObjectURL(image) : imageUrlState} alt="" height={100} width={100} className="rounded-full z-50 object-cover" /> */}
                                {<img src={`${imageUrlState}`} className="rounded-full" />}
                                {/* </div> */}
                            </label>
                        </div>

                        <div className='px-3 flex-col space-y-3 pb-6'>
                            <input type="text" className='border-gray-400 border rounded-md w-full h-10 p-3 text-gray-500' placeholder='firstname' value={firstname} onChange={(e) => { updateFlag(); setFirstName(e.target.value) }} />
                            <input type="text" className='border-gray-400 border rounded-md w-full h-10 p-3 text-gray-500 ' placeholder='lastname' value={lastname} onChange={(e) => { updateFlag(); setLastName(e.target.value) }} />
                            <textarea className='border-gray-400 border rounded-md w-full h-40 p-3 text-gray-500' placeholder='enter bio here' value={bio} onChange={(e) => { updateFlag(); setBio(e.target.value) }} />
                            <input type="text" className='border-gray-400 border rounded-md w-full h-10 p-3 text-gray-500' placeholder='location' value={location} onChange={(e) => { updateFlag(); setLocation(e.target.value) }} />
                        </div>
                    </form>
                </div>

            </div>

        </>
    )
}

export default EditProfileModal