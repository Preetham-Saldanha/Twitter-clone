import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

// import styles from '../styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })
export default function Main( ) {

  const router = useRouter()
  useEffect(()=>{
    router.replace({pathname:"/login"})
  },[])
 

  return (
    <div className='mx-auto lg:max-w-6xl  '>
      <Head>
        <title>Twitter 2.0</title>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500&family=Roboto:wght@400;500&display=swap" rel="stylesheet"/>
                </Head>
      <main className=''>

      </main>
    </div>
  )
}


