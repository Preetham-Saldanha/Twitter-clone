import React from 'react'
import ProfileSection from '../components/ProfileSection'
import SideBar from '../components/SideBar'
import Widget from '../components/Widget'

function Profile() {
  return (
    <div className='grid grid-cols-9  font-roboto  lg:max-w-6xl mx-auto'>        
    <SideBar row={5} />

  <ProfileSection username='preetham'/>

    <Widget /></div>
)
  
}

export default Profile