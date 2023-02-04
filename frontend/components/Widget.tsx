import React from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { TwitterTimelineEmbed } from 'react-twitter-embed'
function Widget() {
    return (
        <div className=' mt-2 hidden lg:col-span-2 lg:inline-block px-2'>
            <div className='mt-2 space-x-2 rounded-full bg-gray-100 flex items-center p-3 '>
                <MagnifyingGlassIcon className='w-5 h-5 text-gray-400'/>
                <input type="text" placeholder='Search Twitter' className='border-none bg-transparent active:border-collapse outline-none flex-1 '/>
            </div>
            <div className='mt-2'>
            <TwitterTimelineEmbed
  sourceType="profile"
  screenName="saurabhnemade"
  options={{height: 800 }}
  
/>
            </div>

        </div>
    )
}

export default Widget