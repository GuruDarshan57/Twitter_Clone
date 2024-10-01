import React from 'react'
import { FaXTwitter } from "react-icons/fa6";
import { GoHome } from "react-icons/go";
import { IoIosSearch } from "react-icons/io";
import { HiOutlineBell } from "react-icons/hi2";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { TbAlignBoxLeftStretch } from "react-icons/tb";
import { BsPeople } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import { CgMoreO } from "react-icons/cg";
import Link from 'next/link';

interface Menuitem{
  name:string,
  icon:React.ReactNode;
}

const sidebar_menu_items:Menuitem[] =[
  {name: 'Home', icon:<GoHome/>},
  {name: 'Explore', icon:<IoIosSearch/>},
  {name: 'Notifications', icon:<HiOutlineBell />},
  {name: 'Messages', icon:<HiOutlineEnvelope/>},
  {name: 'Grok', icon:<TbAlignBoxLeftStretch />},
  {name: 'Communities', icon:<BsPeople/>},
  {name: 'Premium', icon:<FaXTwitter/>},
  {name: 'Profile', icon:<FiUser/>},
  {name:'More', icon:<CgMoreO/>}
]

const Sidebar = () => {
  return (
    <div className='w-full h-full text-gray-300 '>
        <div className="h-14 flex items-center justify-start px-2">
            <Link href="/home" className='text-3xl p-3 rounded-full hover:bg-gray-900 transition-all'><FaXTwitter/></Link>
        </div>
        <div className="pt-1 flex flex-col">
          {sidebar_menu_items.map(item=><div key={item.name} className="flex gap-3 w-fit rounded-full p-2 px-4 py-3 cursor-pointer text-3xl items-center justify-start hover:bg-gray-900">{item.icon}<span className='text-lg font-bold tracking-wider'>{item.name}</span></div>)}
        </div>
        <div className='flex w-full pt-2'>
          <button className='p-2 mr-4 text-lg font-bold tracking-wider bg-sky-700 hover:bg-sky-800 w-full rounded-full'>Post</button>
        </div>
    </div>
  )
}

export default Sidebar