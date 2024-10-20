import React from 'react'
import { IoIosAddCircleOutline } from "react-icons/io";

const LeftBar = () => {
  return (
    <div className='flex flex-col items-center p-1.5 h-screen space-y-2 border-r right-gray-500'>
      <div className='bg-orange-500 flex justify-center items-center rounded-full p-1 px-1.5 '>
        TO
      </div>
      <IoIosAddCircleOutline className='text-gray-700' />
    </div>
  )
}

export default LeftBar