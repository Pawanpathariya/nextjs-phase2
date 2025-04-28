'use client'
import React, { useState, useEffect } from 'react';
import { getVendorAdmin } from '../../../actions/getVendorAct';
import { DeleteVendor } from '../../../actions/deleteVendor';
import { FaTrash } from 'react-icons/fa';
import { getVendorPro } from '../../../actions/getVendorPro';
import Image from 'next/image';
const VendorList: React.FC = () => {
  const [vendor, setVendor] = useState<any>([]);
  const [search, setSearch] = useState('');
  const [filteredVendors, setFilteredVendors] = useState<any>([]);
  const [btn, setBtn] = useState(true);
  const[products, setProducts] = useState<any>([]);
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const response = await getVendorAdmin();
    setVendor(response?.vendors);
  };

  useEffect(() => {
    setFilteredVendors(
      vendor.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, vendor]);

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearchSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearch(e.target.value);
  };


  const GetPro=async (id: any) => {
    const response = await getVendorPro(id);  
    setProducts(response.products);
    setBtn(false)
  }
  
  return (
    <>
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
      <h1 className="text-3xl font-bold leading-tight mt-0 mb-2 text-center">
        Vendors List
      </h1>
      <div className="flex flex-col md:flex-row items-center justify-between">
        <input
          type="text"
          placeholder="Search vendor"
          className="border-2 border-gray-500 p-2 rounded-md w-full md:w-1/2"
          value={search}
          onChange={handleSearchInput} 
        />
        <div className="relative w-full md:w-1/2 mt-4 md:mt-0">
          <select
            className="appearance-none border-2 border-gray-500 p-2 rounded-md w-full"
            value={search}
            onChange={handleSearchSelect} 
          >
            <option value="">Select Vendor</option>
            {vendor.map((item) => (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto h-120">
        {
        (btn)?(
          <table className="table w-full text-center mt-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Phone</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredVendors.map((item: any) => (
              <tr key={item.id} className="hover:bg-gray-100">
                <td className="px-6 py-3">{item.name}</td>
                <td className="px-6 py-3">{item.email}</td>
                <td className="px-6 py-3">{item.phone}</td>
                <td className="px-6 py-3">
                  <button
                    onClick={() => {
                      if (
                        window.confirm(
                          `Are you sure you want to delete ${item.name}?`
                        )
                      ) {
                        DeleteVendor(item.id);
                      }
                    }}
                  >
                    <FaTrash />
                  </button>
                </td>
                <td>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={()=>{GetPro(item.id)}}>Products</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        ):(
<>
        <table className="table w-full text-center mt-4">
          <thead>
            <tr className="bg-gray-200">
            <th className="px-6 py-3 text-center">Name</th>
                    <th className="px-6 py-3 text-center">Price</th>
                    <th className="px-6 py-3 text-center">Description</th>
                    <th className="px-6 py-3 text-center">Category</th>
                    <th className="px-6 py-3 text-center">Same Day Delivery</th>
                    <th className="px-6 py-3 text-center">Type</th>
                    <th className="px-6 py-3 text-center">Images</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((item: any) => (
              <tr key={item.id} className="hover:bg-gray-100">
                <td className="px-6 py-4 text-center">{item.proName}</td>
                <td className="px-6 py-4 text-center">{item.proPrice}</td>
                <td className="px-6 py-4 text-center">{item.proDescription}</td>
                <td className="px-6 py-4 text-center">{item.proCategory}</td>
                <td className="px-6 py-4 text-center">{(item.sameDay)?("Yes"):"No"}</td>
                <td className="px-6 py-4 text-center">{item.type}</td>
                <td className="px-6 py-4 text-center"> <Image src={item.proImage} width={50} height={50} alt={item.proName}/>  </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={()=>{
          setBtn(true)
        }} >Close</button>
        </>
        )
      
      }


      </div>
    </div>


    </>
  );
};

export default VendorList;
