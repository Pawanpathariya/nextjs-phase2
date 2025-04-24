'use client'
import React from 'react'
import { getAdmin } from '../../../actions/getAdminAction'
import { useEffect, useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import { DeleteAdmin } from '../../../actions/getAdminAction'
const page: React.FC = () => {
  const [vendor, setvendor] = useState<any>([]);
  useEffect(() => {
    loadData();
  }, [])

  const loadData = async () => {
    const response = await getAdmin()
    setvendor(response?.admins)
  }
  return (
    <>
      <div>
        <h1 className="text-2xl font-bold mb-4 text-center">Admin list </h1>
        <table className="table w-full text-center ml-50">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-6 py-3 text-center">Name</th>
              <th className="px-6 py-3 text-center">Email</th>
              <th className="px-6 py-3 text-center">Phone</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {vendor.map((item: any) => (
              <tr key={item.id} className="hover:bg-gray-100">
                <td className="px-6 py-3 text-center">{item.name}</td>
                <td className="px-6 py-3 text-center">{item.email}</td>
                <td className="px-6 py-3 text-center">{item.phone}</td>
                <td className="px-6 py-3 text-center">
                  <button onClick={() => { DeleteAdmin(item.id) }}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default page
