import React from 'react'
import LeftBar from './leftBar'
import { CiLocationArrow1 } from "react-icons/ci";

const Dashboard = () => {
  return (
    <div className='flex border-t top-gray-900 rounded-xl shadow-lg'>
      <div className='w-[4.5%]'>
        <LeftBar />
      </div>
      <div className='w-[95%] flex flex-col items-center'>
        <div className='flex space-x-2 mt-10 border rounded-lg w-full p-10'>
          <input type="text" name="" id="" placeholder='Add your todo here' className='border-2 px-2 py-2 rounded-lg' />
          <button className='bg-green-100 px-5 py-2 rounded-lg text-2xl '><CiLocationArrow1 /></button>
        </div>
        <div className='w-full flex justify-around m-10'>
          <div className='bg-blue-500 w-[30%] h-auto'>
            card
          </div>
          <div className='bg-blue-500 w-[30%]'>
            card
          </div>
          <div className='bg-blue-500 w-[30%]'>
            card
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard