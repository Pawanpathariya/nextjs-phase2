'use client';
import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from "react-icons/fa";
import { AiOutlineShoppingCart, AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";
import { CiHeart } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { useSelector } from 'react-redux';
import Image from 'next/image';
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from '@clerk/nextjs';

const Topbar: React.FC = () => {
  const { user, isSignedIn } = useUser();
  const product = useSelector((state: any) => state.addtocart.cart);
  const prolen = product.length;
  const product1 = useSelector((state: any) => state.addtofav.fav);
  const prolen1 = product1.length;
  const route = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  useEffect(() => {
    if (isSignedIn && user) {
      console.log("✅ Signed In User Details:", user);
      const fullName = user.fullName; 
      const email = user.primaryEmailAddress?.emailAddress; 
      localStorage.setItem('name', fullName);
      localStorage.setItem('email', email);
      localStorage.setItem('user', 'user');
    }
  }, [isSignedIn, user]);

  return (
    <>
      <nav className='bg-gray-100 h-16 flex justify-between items-center px-4 z-20'>
        {/* left side */}
        <div className='flex space-x-4 justify-center items-center'>
          {isOpen ? (
            <FaTimes className='text-2xl' onClick={() => setIsOpen(false)} />
          ) : (
            <FaBars className='text-2xl' onClick={() => setIsOpen(true)} />
          )}
          <Image src='/images/logo.png' width={80} height={80} alt='logo' />
        </div>

       
        <div className='flex space-x-4'>
          <div className='flex items-center bg-white rounded-full px-2 py-1' onClick={() => route.push('/pages/favourite')}>
            <CiHeart className='text-2xl mr-1' />
            <span className='text-sm'>{prolen1}</span>
          </div>

          <div className='flex items-center bg-white rounded-full px-2 py-1' onClick={() => route.push('/pages/cart')}>
            <AiOutlineShoppingCart className='text-2xl mr-1' />
            <span className='text-sm'>{prolen}</span>
          </div>

          <SignedOut>
            <div className="flex flex-col space-y-2 mt-3">
              <SignInButton>
                <button className="px-2 py-1 rounded-md bg-gray-200 hover:bg-gray-300">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton>
                <button className="px-2 py-1 rounded-md bg-gray-200 hover:bg-gray-300">
                  Sign Up
                </button>
              </SignUpButton>
            </div>
          </SignedOut>

          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </nav>
      {isOpen && (
        <div style={{ zIndex: 999 }} className='absolute top-16 left-0 w-52 bg-white shadow-lg rounded-md px-6 py-4'>
         {isOpen && (
  <div style={{ zIndex: 999 }} className='absolute top-16 left-0 w-52 bg-white shadow-lg rounded-md px-6 py-4'>
    <ul className='space-y-2'>
      <li className='hover:bg-gray-100 p-2 rounded cursor-pointer'>Home</li>
      <li className='hover:bg-gray-100 p-2 rounded cursor-pointer'>Birthday Gift</li>
      <li className='hover:bg-gray-100 p-2 rounded cursor-pointer'>Wedding Gift</li>
      <li className='hover:bg-gray-100 p-2 rounded cursor-pointer'>Anniversary Gift</li>
      <li className='hover:bg-gray-100 p-2 rounded cursor-pointer'>Other Gift</li>
      <li className='hover:bg-gray-100 p-2 rounded cursor-pointer' onClick={() => setIsCategoryOpen(!isCategoryOpen)}>
        <span className='flex items-center'>
          Category
          {isCategoryOpen ? <AiFillCaretUp /> : <AiFillCaretDown />}
        </span>
        {isCategoryOpen && (
          <ul className='absolute space-y-2 pl-5 -mt-5 bg-white left-52'>
            <li className='hover:bg-gray-100 p-2 rounded cursor-pointer'>All</li>
            <li className='hover:bg-gray-100 p-2 rounded cursor-pointer'>Birthday Gift</li>
            <li className='hover:bg-gray-100 p-2 rounded cursor-pointer'>Wedding Gift</li>
            <li className='hover:bg-gray-100 p-2 rounded cursor-pointer'>Anniversary Gift</li>
            <li className='hover:bg-gray-100 p-2 rounded cursor-pointer'>Other Gift</li>
          </ul>
        )}
      </li>
      <li className='hover:bg-gray-100 p-2 rounded cursor-pointer'>About Us</li>
      <li className='hover:bg-gray-100 p-2 rounded cursor-pointer'>Contact Us</li>
    </ul>
  </div>
)}
        </div>
      )}
    </>
  );
}

export default Topbar;




