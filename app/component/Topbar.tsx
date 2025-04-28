'use client';

import React, { useState, useEffect } from 'react';
import { FaBars } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
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
  const cart = useSelector((state: any) => state.addtocart.cart);
  const fav = useSelector((state: any) => state.addtofav.fav);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined' && isSignedIn && user) {
      const fullName = user.fullName || '';
      const email = user.primaryEmailAddress?.emailAddress || '';
      localStorage.setItem('name', fullName);
      localStorage.setItem('email', email);
      localStorage.setItem('user', 'user');
    }
  }, [isSignedIn, user]);

  return (
    <>
      <nav className='bg-gray-100 h-16 flex justify-between items-center px-4 z-20'>
        <div className='flex space-x-4 justify-center items-center'>
          <FaBars className='text-2xl' />
          <Image src='/images/logo.png' width={80} height={80} alt='logo' />
        </div>

        <div className='flex space-x-4'>
          <div
            className='flex items-center bg-white rounded-full px-2 py-1 cursor-pointer'
            onClick={() => router.push('/pages/favourite')}
          >
            <CiHeart className='text-2xl mr-1' />
            <span className='text-sm'>{fav.length}</span>
          </div>

          <div
            className='flex items-center bg-white rounded-full px-2 py-1 cursor-pointer'
            onClick={() => router.push('/pages/cart')}
          >
            <AiOutlineShoppingCart className='text-2xl mr-1' />
            <span className='text-sm'>{cart.length}</span>
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
    </>
  );
}

export default Topbar;

