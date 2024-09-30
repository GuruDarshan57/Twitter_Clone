import React from 'react'
import { FaXTwitter } from "react-icons/fa6";
import Link from 'next/link';

const Sidebar = () => {
  return (
    <div className='w-full h-full'>
        <div className="h-14 flex items-center justify-start">
            <Link href="/home" className='text-3xl p-2 rounded-full hover:bg-gray-900 transition-all'><FaXTwitter/></Link>
        </div>
    </div>
  )
}

export default Sidebar