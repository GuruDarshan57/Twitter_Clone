"use client"
import { useGetUserDetails } from '@hooks/user';
import React, { useState } from 'react'
import Image from 'next/image';
import { GoArrowLeft } from "react-icons/go";
import { HiMiniCalendarDays } from "react-icons/hi2";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useRouter } from 'next/navigation';

const page = ({ params }) => {
    const { user } = useGetUserDetails()
    const [active, setActive] = useState("Post")
    const router = useRouter()
    return (
        <div className="w-full flex flex-col">
            <div className="flex w-full p-2 py-1 pl-6 justify-start items-center gap-8 glass_bg border-b-[0.5px] border-slate-700">
                <span className='text-xl cursor-pointer rounded-full p-2 hover:bg-gray-900' onClick={() => { router.back() }}><GoArrowLeft /></span>
                <div className='flex flex-col'>
                    <span className="font-bold text-lg tracking-wide">{user ? (user.firstName.slice(0, 1).toUpperCase() + user.firstName.slice(1)) : ('')}</span>
                    <span className='text-[10px] text-gray-400'>2 Tweets</span>
                </div>
            </div>
            <div className="w-full flex flex-col relative pb-2">
                <div className="w-full h-44 bg-neutral-900">
                    {/* <Image src={"https://images.pexels.com/photos/28748671/pexels-photo-28748671/free-photo-of-scenic-beach-view-with-umbrellas-in-vietnam.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"} width={30} height={30} alt='cover_img' className='w-full h-44 object-cover object-center' /> */}
                </div>
                <Image src={user?.profileImgUrl} width={130} height={130} alt='profile_img' className='rounded-full object-cover object-center -mt-16 ml-4 border-[6px] border-black' />
                <div className="w-fit p-2 px-4 rounded-full border-[0.5px] border-slate-500 absolute right-6 bottom-2 cursor-pointer tracking-wide hover:bg-slate-900">Edit Profile</div>
            </div>
            <div className="flex flex-col gap-2 p-2 pl-6">
                <div className="flex flex-col">
                    <span className='font-bold text-xl tracking-wide'>{user ? (user.firstName.slice(0, 1).toUpperCase() + user.firstName.slice(1)) : ('')}</span>
                    <span className='tracking-wide text-gray-500'>@{user?.firstName}</span>
                </div>
                <div className="flex gap-4 text-gray-400">
                    <span className='flex items-center gap-1 text-sm tracking-wide'><HiOutlineLocationMarker /> <span>New Orleans, LA</span></span>
                    <span className='flex items-center gap-1 text-sm tracking-wide'><HiMiniCalendarDays /> <span>Joined January 2023</span></span>
                </div>
                <div className="flex gap-4">
                    <span className='text-sm text-slate-400 tracking-wide'><span className='text-white '>0</span> Following</span>
                    <span className='text-sm text-slate-400 tracking-wide'><span className='text-white '>0</span> Follower</span>
                </div>
            </div><div className="w-full flex font-bold border-slate-700 border-b-[0.5px] cursor-pointer sticky top-0 z-10 glass_bg">
                <div className="flex-1 flex justify-center items-center hover:bg-gray-950" onClick={() => { setActive("Post") }}>
                    <button className="p-2 pb-3 pt-5 text-sm tracking-wide self-end">
                        Posts
                        <div className="h-1 w-full bg-sky-500 rounded-full relative -bottom-3"></div>
                    </button>
                </div>
                <div className="flex-1 flex justify-center items-center hover:bg-gray-950" onClick={() => { setActive("Post") }}>
                    <button className="p-2 pb-3 pt-5  text-sm tracking-wide text-slate-500 self-end">
                        Posts & Replies
                        <div className="h-1 w-full bg-sky-500 rounded-full relative -bottom-3 invisible"></div>
                    </button>
                </div>
                <div className="flex-1 flex justify-center items-center hover:bg-gray-950" onClick={() => { setActive("Post") }}>
                    <button className="p-2 pb-3 pt-5  text-sm tracking-wide text-slate-500 self-end">
                        Media
                        <div className="h-1 w-full bg-sky-500 rounded-full relative -bottom-3 invisible"></div>
                    </button>
                </div>
                <div className="flex-1 flex justify-center items-center hover:bg-gray-950" onClick={() => { setActive("Post") }}>
                    <button className="p-2 pb-3 pt-5  text-sm tracking-wide text-slate-500 self-end">
                        Likes
                        <div className="h-1 w-full bg-sky-500 rounded-full relative -bottom-3 invisible"></div>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default page