import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { axiosPrivate } from '../api_utils/axios'
import Layout from '../components/Layout'
import ProfileSection from '../components/ProfileSection'
import SideBar from '../components/SideBar'
import Widget from '../components/Widget'
import useAuth from '../hooks/useAuth'
import { profileDataType } from '../typings'

function Profile() {

  const { auth }: any = useAuth()
  const router = useRouter()

  const name: string | string[] = router.query?.username ? router.query.username : auth.username

  return (
    <Layout row={auth?.username === name ? 5 : -1}>

      <ProfileSection username={name} />
    </Layout>

  )

}


export default Profile