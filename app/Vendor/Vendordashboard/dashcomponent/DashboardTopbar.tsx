"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'
const DashboardTopbar: React.FC = () => {
  const router = useRouter();
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const name = typeof window !== 'undefined' ? localStorage.getItem('name') : null;
      const email = typeof window !== 'undefined' ? localStorage.getItem('email') : null;
      setName(name || '')
      setEmail(email || '')
    }
  }, [])
  return (
    <div className="bg-gray-700 p-4 fixed top-0 left-0 w-full h-16 flex justify-between items-center">
      <h1 className="text-white text-2xl font-semibold ml-4 md:ml-10 pl-4">
        <Link href="/Admin" legacyBehavior>
          Vendor Dashboard
        </Link>
      </h1>
      <div className="flex justify-end items-center mr-4 md:mr-10">
        <div className="hidden md:block">
          <p className="text-white mr-4 md:mr-10">User : {name}</p>
          <p className="text-white mr-4 md:mr-10">{email}</p>
        </div>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded"
          onClick={() => { localStorage.clear(), router.push('/Vendor') }  }>
          Logout
        </button>
      </div>
    </div>
  );
}

export default DashboardTopbar;

