'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { FaHome, FaUser, FaBars } from 'react-icons/fa';
import { BsDisplay, BsShop, BsFillCartFill } from 'react-icons/bs';
import { MdOutlineRequestPage } from 'react-icons/md';
import { GrUserAdmin } from "react-icons/gr";

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
        <FaBars />
      </button>
      <div
        className={`absolute top-0 left-0 h-screen w-64 bg-[#212529] p-4 mt-18 transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ marginRight: isOpen ? 0 : '64px' }}
      >
        <div className="flex bg-[#212529] flex-col">
          <ul className="mt-4 flex flex-col gap-5 justify-center">
            <li>
              <Link href="/Superadmin/Superadmindashboard" className="text-white hover:underline text-lg font-semibold">
                <FaHome className="inline-block mr-2" /> Home
              </Link>
            </li>
            <li>
              <Link href="/Superadmin/Superadmindashboard/display" className="text-white hover:underline text-lg font-semibold">
                <BsDisplay className="inline-block mr-2" /> Display
              </Link>
            </li>

            <li>
              <Link href="/Superadmin/Superadmindashboard/vendor" className="text-white hover:underline text-lg font-semibold">
                <BsShop className="inline-block mr-2" /> Vendor Details
              </Link>
            </li>
            <li>
              <Link href="/Superadmin/Superadmindashboard/order" className="text-white hover:underline text-lg font-semibold">
                <BsFillCartFill className="inline-block mr-2" /> Manage Order
              </Link>
            </li>
            <li>
              <Link href="/Superadmin/Superadmindashboard/newvendor" className="text-white hover:underline text-lg font-semibold">
                <MdOutlineRequestPage className="inline-block mr-2" /> New Vendor Request
              </Link>
            </li>
            <li>
              <Link href="/Superadmin/Superadmindashboard/admin" className="text-white hover:underline text-lg font-semibold">
                <GrUserAdmin className="inline-block mr-2" /> Admin Records
              </Link>
            </li>
          </ul>
        </div>
      </div>
      {isOpen ? <div className="ml-64">{/* Content inside sidebar when open */}</div> : null}
    </>
  );
};

export default Sidebar;
