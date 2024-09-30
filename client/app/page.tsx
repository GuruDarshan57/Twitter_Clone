"use client"
import React from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const Page = () => {
  const Router=useRouter();
  useEffect(()=>{
    //redirect to home page
    Router.replace('/home')
  })
  return (
    <></>
  )
}

export default Page