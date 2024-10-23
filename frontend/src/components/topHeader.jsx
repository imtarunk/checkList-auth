import React from 'react'
import logo from '../assets/logo.png'
import { MdDashboard } from "react-icons/md";
import { IoCheckboxOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoMdLogOut } from "react-icons/io";

const TopHeader = () => {
  return (
    <div className='flex bg-green-100  items-center space-x-5 '>
      <div>
        <img src={logo} alt="" width={'80px'} />
      </div>
      <div className='flex justify-between px-5 w-full'>
        <div className='flex space-x-5 text-lg text-gray-500'>
          <div className='flex items-center hover:text-gray-700 cursor-pointer'>
            <MdDashboard /><span>Dashboard</span>
          </div>
          <div className='flex items-center  hover:text-gray-700 cursor-pointer'>
            <IoCheckboxOutline /><span>Todo</span>
          </div>
        </div>
        <div className='flex items-center space-x-5 text-lg text-gray-500'>
          <input type="text" name="" id="" placeholder='Search' className='border-2 rounded-lg p-1' />
          <IoMdNotificationsOutline className='text-2xl hover:text-gray-700 cursor-pointer ' />
          <IoMdLogOut className='text-2xl hover:text-gray-700 cursor-pointer ' />
          <img src="https://avatar.iran.liara.run/username?username=Tarunkumar" alt="" width={"50px"} className='hover:cursor-pointer ' />
        </div>
      </div>
    </div>
  )
}

export default TopHeader