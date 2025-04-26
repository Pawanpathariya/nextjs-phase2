'use client'
import React from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
const page:React.FC = () => {
  const router=useRouter()
  const name = typeof window !== 'undefined' ? localStorage.getItem('name') : null;
  const email = typeof window !== 'undefined' ? localStorage.getItem('email') : null;
  const user = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
  const id = typeof window !== 'undefined' ? localStorage.getItem('id') : null;
  useEffect(()=>{
if(!user || user!='vendor'){
router.push('/Vendor')
}
  },[])

  return (
<>
<div className='w-full h-80'>
<img src="/images/vendor.jpg" alt="" width={1300} />
</div>

</>
  )
}

export default page