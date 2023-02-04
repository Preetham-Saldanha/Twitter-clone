import React, { SVGProps } from 'react'

interface Props {
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element,
  title: String
}

function SideBarRow({ Icon, title }: Props) {
  return (
    <div className='flex space-x-2 px-3 py-4  max-w-fit rounded-full hover:bg-gray-100 transition-all duration-200 group cursor-pointer'>
      <Icon className='h-6 w-6' />
      <p className='group-hover:text-twitter hidden md:inline-flex text-base font-light lg:text-xl'>{title}</p>
    </div>
  )
}

export default SideBarRow