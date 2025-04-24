"use client"
import Link from 'next/link'

const DashboardTopbar : React.FC = () => {
  return (
    <div className="bg-gray-700 p-4 fixed w-full">
      <div className="flex justify-between">
        <h1 className="text-white text-2xl font-semibold ml-10">Super Admin Dashboard</h1>
      </div>
    </div>
  );
}

export default DashboardTopbar;   

