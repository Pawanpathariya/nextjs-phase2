'use client'
import React, { useState } from 'react';
import { FaBars, FaSearch, FaTimes } from "react-icons/fa";
import { AiOutlineShoppingCart, AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";
import { CiHeart } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { useRouter } from "next/navigation";
import { useSelector } from 'react-redux';
import Image from 'next/image';
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

const Topbar: React.FC = () => {
  const product=useSelector(state=>state.addtocart.cart);
  const prolen=product.length;
  const product1=useSelector(state=>state.addtofav.fav);
  const prolen1=product1.length;

  const route = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  return (
    <>
      <nav className='bg-gray-100 h-16 flex justify-between items-center px-4 z-20'>
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
          
          <div className='flex items-center bg-white rounded-full px-2 py-1'  onClick={() => route.push('/pages/cart')}>
            <AiOutlineShoppingCart className='text-2xl mr-1' />
            <span className='text-sm'>{prolen}</span>
          </div>

          {/* <CgProfile className='text-2xl' onClick={() => route.push('/login')} /> */}
          <ClerkProvider>
                     <SignedOut>
                      <SignInButton />
                      <SignUpButton />
                    </SignedOut>
                    <SignedIn>
                      <UserButton />
                    </SignedIn>
                  </ClerkProvider>
        </div>
      </nav>
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
    </>
  );
}

export default Topbar;

