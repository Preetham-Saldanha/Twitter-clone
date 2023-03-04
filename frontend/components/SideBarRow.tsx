import { Badge } from '@mui/material'
import React, { SVGProps, useState } from 'react'

interface Props {
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element,
  title: String,
  handleActive?: (row: number) => void, 
  rowNumber: number,
  activeRow :number,
  logOut?: ()=>void,
 setOpenConfirmModal?: React.Dispatch<React.SetStateAction<boolean>>,
 numberOfNotifications?:number
//  hasNotifications?:boolean
}

function SideBarRow({ Icon, title, handleActive , rowNumber , activeRow, setOpenConfirmModal, numberOfNotifications}: Props) {
// const [hasNotifications, setHasNotifications] = useState<boolean>(rowNumber===2)

  return (
    <div className='flex space-x-2 px-3 py-4  max-w-fit rounded-full hover:bg-gray-100 transition-all duration-200 group cursor-pointer' onClick={setOpenConfirmModal ? ()=>setOpenConfirmModal(true):()=>handleActive(rowNumber)}>
      {numberOfNotifications!==0 && rowNumber===2 && activeRow!==2? <Badge badgeContent={numberOfNotifications} color="secondary"><Icon className='h-6 w-6' /></Badge> :<Icon className='h-6 w-6' />}
      { activeRow===rowNumber?
      <p className=' hidden md:inline-flex text-base font-bold lg:text-xl'>{title}</p>
      :
      <p className=' hidden md:inline-flex text-base font-light lg:text-xl'>{title}</p>
}
    </div>
  )
}

export default SideBarRow