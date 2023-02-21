import { XMarkIcon } from '@heroicons/react/24/outline'
import React from 'react'

type Props= {
    setIsSubmit:React.Dispatch<React.SetStateAction<boolean>>,
    setOpenConfirmModal: React.Dispatch<React.SetStateAction<boolean>>,
    message: string
}

function ConfirmModal({setOpenConfirmModal, setIsSubmit, message}: Props) {
const handleYes = ()=>{
    setIsSubmit(true)
    setOpenConfirmModal(false)
}

    return (

        <div className='absolute top-0 left-0 w-full h-full'>
            <div className='absolute bg-gray-500 opacity-70 z-40 w-full h-full top-0 left-0'></div>

            <div className=' relative flex-col mt-28 z-50 lg:w-1/3 w-1/2 h-1/3 m-auto bg-white rounded-xl left-14 p-1 '>

                <div className='lg:w-4/12 flex justify-between w-1/2' onClick={()=>{setOpenConfirmModal(false)}}>
                    <div className='hover:bg-slate-200 rounded-full p-1' ><XMarkIcon className='w-7 h-7 text-gray-700 ' /></div>
                </div>

                <div className='h-1/2 p-5 flex-col flex place-content-center text-center w-full'>
                    <p className='font-roboto font-semibold text-3xl  m-auto w-2/3'>{message}</p>
                </div>
                <div className='w-5/6 p-3 flex justify-evenly m-auto  text-xl'>
                    <button className='bg-black text-white w-48 rounded-full h-14 ' onClick={handleYes}>Yes</button>
                    <button className='bg-white text-black border-black  border-2 w-48 rounded-full' onClick={()=>{setOpenConfirmModal(false)}}>No</button>
                </div>
            </div>
        </div>


    )
}

export default ConfirmModal