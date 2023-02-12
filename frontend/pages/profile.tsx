import React, { useEffect, useState } from 'react'
import { axiosPrivate } from '../api_utils/axios'
import ProfileSection from '../components/ProfileSection'
import SideBar from '../components/SideBar'
import Widget from '../components/Widget'
import useAuth from '../hooks/useAuth'
import { profileDataType } from '../typings'

function Profile() {

  const { auth }: any = useAuth()
  const [profileData, setProfileData] = useState<profileDataType>()
  // async function getUserDetails() {
  //   const result : profileDataType= await axiosPrivate.get(`/api/v1/user/${auth.username}`)
  //   if (result) {
  //     console.log(result)
  //     setProfileData(result)
  //   }
  // }
  // useEffect(() => {
  //   getUserDetails()
  // }, [])


  return (
    <div className='grid grid-cols-9  font-roboto  lg:max-w-6xl mx-auto'>
      <SideBar row={5} />

      <ProfileSection username={auth.username}/>

      <Widget /></div>
  )

}


export default Profile