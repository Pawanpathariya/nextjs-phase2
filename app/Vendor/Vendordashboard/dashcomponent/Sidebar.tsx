'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { FaHome, FaPlus, FaEdit } from 'react-icons/fa';
import { BsDisplay } from 'react-icons/bs';

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        className="fixed top-4 left-4 z-20 text-white bg-[#212529] p-2 rounded"
        onClick={toggleSidebar}
      >
        ☰
      </button>
      <div
        className={`absolute top-0 left-0 h-screen w-64 bg-[#212529] p-4 mt-18 transition-transform transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ marginRight: isOpen ? 0 : '64px' }}
      >
        <div className="flex bg-[#212529] flex-col">
          <ul className="mt-4 flex flex-col gap-5 justify-center pt-10">
            <li>
              <Link href="/Vendor/Vendordashboard" className="text-white hover:underline text-xl">
                <FaHome className="inline-block mr-2" /> Home
              </Link>
            </li>
            <li>
              <Link href="/Vendor/Vendordashboard/display" className="text-white hover:underline text-xl">
                <BsDisplay className="inline-block mr-2" /> Display
              </Link>
            </li>
            <li>
              <Link href="/Vendor/Vendordashboard/insert" className="text-white hover:underline text-xl">
                <FaPlus className="inline-block mr-2" /> Insert
              </Link>
            </li>
            <li>
              <Link href="/Vendor/Vendordashboard/edit" className="text-white hover:underline text-xl">
                <FaEdit className="inline-block mr-2" /> Product Status
              </Link>
            </li>
          </ul>
        </div>
      </div>
      {isOpen && <div className="ml-64">{/* You can add content here that should appear when the sidebar is open */}</div>}
    </>
  );
};

export default Sidebar;
