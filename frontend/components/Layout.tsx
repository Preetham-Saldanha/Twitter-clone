import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import SideBar from './SideBar'
import Widget from './Widget'

function Layout({ children, row }) {

    return (
        <div className='grid grid-cols-9  font-roboto  lg:max-w-6xl mx-auto' >

            <SideBar row={row} />
            {children}
            <Widget />

        </div>
    )
}

export default Layout