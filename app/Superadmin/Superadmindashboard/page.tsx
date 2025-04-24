'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const Page: React.FC = () => {
  const router = useRouter()
  useEffect(() => {
    const user = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
    if (!user || user !== 'superadmin') {
      router.push('/Superadmin')
    }
  }, [router])

  return (
    <>
      <h1>Home</h1>
    </>
  )
}

export default Page
