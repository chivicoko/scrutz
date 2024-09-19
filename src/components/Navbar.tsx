'use client';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Link from 'next/link';
import React, { useState } from 'react';
import Image from 'next/image';
import { KeyboardArrowDown, Menu, NotificationsOutlined, Search } from '@mui/icons-material';
import Sidebar from './Sidebar';
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, UserButton, useAuth, useUser } from '@clerk/nextjs';

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const {user} = useUser();
  // console.log(user?.firstName);

  const closeSidebar = () => setOpen(false);

  return (
    <>
      <nav className="z-30 py-3 md:py-5 px-4 md:px-8 lg:px-[85px] border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start gap-2 md:gap-3 w-2/5 md:w-1/5 lg:hidden">
            <Link href="/" className="flex items-center justify-start lg:hidden gap-2">
              <div className="relative w-[48px] h-[48px]">
                <Image
                  src="/logo.svg"
                  alt="Scrutz's Logo"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </Link>

            <button onClick={() => setOpen(!open)} className="lg:hidden text-gray-700 focus:outline-[#247B7B]">
              <Menu />
            </button>
          </div>

          <div className="flex items-center gap-1 md:gap-3 w-3/5 px-2 md:w-2/5 justify-self-start">
            <div className="bg-transparent border w-full flex items-center justify-between rounded-[4px] focus-within:ring-1 focus-within:ring-[#247B7B] hover:ring-[#247B7B]">
              <input
                type="text"
                placeholder="Search..."
                name="searchText"
                className="bg-transparent w-full py-2 border-0 text-xs pl-1 focus:outline-0 focus:ring-0 placeholder:text-xs md:text-base text-[#666666] leading-tight"
              />
              <button type="button" className="focus:outline-[#247B7B]">
                <span className="text-[#666666]"><Search className="h-4 w-4 md:h-6 md:w-6" /></span>
              </button>
            </div>

            <button className="md:hidden text-[#333333]"><NotificationsOutlined /></button>
          </div>

          <div className="hidden md:w-2/5 md:flex items-center justify-end">
            <button className="border-r-2 px-2 text-[#333333]"><NotificationsOutlined /></button>
            
            <ClerkLoading>
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white" role="status">
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
              </div>
            </ClerkLoading>
                
            <ClerkLoaded>
              <SignedIn>
                <span className="px-2 flex items-center justify-between gap-2">
                  <UserButton/>
                  <button className="text-[#666666] flex items-center justify-between gap-1 text-sm">
                    {user?.firstName || 'Big Tech'}
                    <span className="text-[#333333]"><KeyboardArrowDown /></span>
                  </button>
                </span>
              </SignedIn>

              <SignedOut>
                <Link href='/sign-in' className=''> 
                  <span className="px-2 flex items-center justify-between gap-2">
                    <span className="text-[#333333]"><AccountCircleIcon /></span>
                    <button className="text-[#666666] flex items-center justify-between gap-1 text-sm">
                      Big Tech
                      <span className="text-[#333333]"><KeyboardArrowDown /></span>
                    </button>
                  </span>
                </Link>
              </SignedOut>
            </ClerkLoaded>

          </div>
        </div>
      </nav>

      {open && (
        <>
          <Sidebar show="block" closeSidebar={closeSidebar} />

          <div
            onClick={closeSidebar}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          />
        </>
      )}
    </>
  );
};

export default Navbar;
