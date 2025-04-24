'use client'
import React, { useState, useEffect } from 'react'
import { getVendorAdmin } from '../../../actions/getVendorAct'
import { DeleteVendor } from '../../../actions/deleteVendor'
import { FaTrash } from 'react-icons/fa'

const page: React.FC = () => {
  const [vendor, setvendor] = useState<any>([]);
  const [search, setSearch] = useState('');
  const [filteredVendors, setFilteredVendors] = useState<any>([]);

  useEffect(() => {
    loadData();
  }, [])

  const loadData = async () => {
    const response = await getVendorAdmin()
    setvendor(response?.vendors)
  }

  useEffect(() => {
    setFilteredVendors(
      vendor.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, vendor]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold mb-4 text-center">Vendors list </h1>
        <div className="flex items-center justify-between">
          <input
            type="text"
            placeholder="Search vendor"
            className="border-2 border-gray-500 p-2 rounded-md w-1/2"
            value={search}
            onChange={handleSearch}
          />
          <select
            className="border-2 border-gray-500 p-2 rounded-md w-1/2"
            value={search}
           onChange={handleSearch}
          >
            <option value="">Select Vendor</option>
            {vendor.map((item) => (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
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
            {filteredVendors.map((item: any) => (
              <tr key={item.id} className="hover:bg-gray-100">
                <td className="px-6 py-3 text-center">{item.name}</td>
                <td className="px-6 py-3 text-center">{item.email}</td>
                <td className="px-6 py-3 text-center">{item.phone}</td>
                <td className="px-6 py-3 text-center">
                  <button onClick={() => { DeleteVendor(item.id) }}>
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

