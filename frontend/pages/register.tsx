import React, { useState, useRef, useContext } from 'react'
import styles from "../styles/Login.module.css"
import twitterImage from '../public/Twitter_bird_logo.png'
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/router';
import toast from "react-hot-toast"
import { Toaster } from 'react-hot-toast'
import axios from '../api_utils/axios';
// import useAuth from '../hooks/useAuth';
import useAuth from '../contexts/AuthContext'
function Register() {

    const [name, setName] = useState("");
    const [firstname, setFirstName]= useState("")
    const [lastname, setLastName]= useState("")
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const router = useRouter()
    // const { auth, setAuth }: any = useAuth();
    const { auth, setAuth }: any = useContext(useAuth);
    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        try {


            const result = await axios.post(`/api/v1/auth/register`, { username: name, password: password, email: email , firstname, lastname})
            console.log(result)
            if (result?.data?.username === name) {
                setAuth(result.data)
                toast.success("Successfully registered!")
                setTimeout(() => {
                    router.push({
                        pathname: "/home",

                    })
                }, 1100)

            }
        }

        catch (error) {

            if (error.response && error.response.data) {
                toast.error(error?.response.data)
            }
            else {
                toast.error(error.message)
            }
        }
    }

    return (
        <>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div className='bg-slate-300 w-full h-screen pt-24'>
                <div className='w-1/2 lg:w-1/3 h-fit bg-white m-auto rounded-2xl p-3 '>
                    <Image src={twitterImage} alt={""} width={40} height={40} className="m-auto " />
                    <h2 className='text-center mt-4 text-2xl font-semibold'>Create an Twitter account</h2>
                    <form className='mt-6 flex flex-col items-center space-y-8'>
                        <div className='flex flex-col items-center w-full space-y-10' >
                            {/* <label htmlFor="username" className='block font-normal text-xl'>Username</label> */}
                            <input type="text" name='username' className='w-3/4 h-11 lg:w-2/3 border-slate-300 border-2 rounded-md pl-4 text-lg' placeholder='Enter username' onChange={(e) => { setName(e.target.value) }} />

                            <input type="email" name='email' className='w-3/4 h-11 lg:w-2/3 border-slate-300 border-2 rounded-md pl-4 text-lg' placeholder='Enter email id' onChange={(e) => { setEmail(e.target.value) }} />
                            
                            <input type="text" name='firstname' className='w-3/4 h-11 lg:w-2/3 border-slate-300 border-2 rounded-md pl-4 text-lg' placeholder='Enter first name' onChange={(e) => { setFirstName(e.target.value) }} />
                           
                            <input type="text" name='lastname' className='w-3/4 h-11 lg:w-2/3 border-slate-300 border-2 rounded-md pl-4 text-lg' placeholder='Enter last name' onChange={(e) => { setLastName(e.target.value) }} />
                            {/* <label htmlFor="password" className='block font-normal text-xl'> Password</label> */}
                            <input type="password" name='password' className='w-3/4 h-11 lg:w-2/3 border-slate-300 border-2 rounded-md pl-4 text-lg' placeholder='Enter your password' onChange={(e) => { setPassword(e.target.value) }} />
                        </div>

                        <button className='w-3/4 lg:w-2/3 h-11 bg-black hover:bg-slate-900 text-white rounded-full text-lg font-semibold' onClick={(e) => handleSubmit(e)}>Sign up</button>
                    </form>
                    <p className='text-slate-600 text-lg text-left mt-5 m-auto w-3/4 lg:w-2/3'>Already have an account? <Link className='text-twitter cursor-pointer' href="/login" >Sign in</Link></p>
                </div>
            </div>
        </>
    )
}

export default Register