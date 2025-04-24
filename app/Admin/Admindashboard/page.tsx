'use client'
import React from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
const page:React.FC = () => {
  const router=useRouter()
  const name = typeof window !== 'undefined' ? localStorage.getItem('name') : null;
  const email = typeof window !== 'undefined' ? localStorage.getItem('email') : null;
  const user = typeof window !== 'undefined' ? localStorage.getItem('user') : null;

  useEffect(()=>{
if(!user || user!='admin'){
router.push('/Admin')
}
  },[])

  return (
<>
<h1>Home</h1>
</>
  )
}

export default page