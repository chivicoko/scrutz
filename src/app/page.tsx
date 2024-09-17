import { Add, DateRange, KeyboardArrowDown, Logout } from '@mui/icons-material';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

export default function Home() {
  return (
    <section className='px-4 md:px-[85px] pt-8'>
        <div className="headArea flex flex-col md:flex-row items-center justify-between">
            <h1 className='text-[#247B7B] text-xl font-bold'>Overview</h1>
            <div className='flex items-center flex-col sm:flex-row justify-between gap-2 md:gap-3 text-xs mt-3 md:mt-auto'>
                <div className='p-2 border rounded-[4px] flex items-center justify-between'>
                    <div className="flex items-center justify-between gap-1 border-r pr-2">
                        <span className='text-[#247B7B]'><DateRange className='h-4 w-4' /></span>
                        <span>Date Range</span>
                    </div>
                    <div className="flex items-center justify-between gap-2 pl-2">
                        <span>Nov 1, 2022 - Nov 7, 2022</span>
                        <span className='text-[#247B7B]'><KeyboardArrowDown className='h-5 w-5' /></span>
                    </div>
                </div>
                <button className="flex items-center justify-between border-0 gap-2 text-[#247B7B] hover:text-white bg-[#F0F4F4] hover:bg-[#247B7B] rounded-[4px] py-[10px] px-[32px]">
                    <span className='-rotate-90'><Logout className='h-4 w-4' /></span>
                    <span>Export</span>
                </button>
            </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-8 py-12">
            <div className="relative w-full max-w-md mx-auto">
                <Image
                    src="/emptypage.svg"
                    alt="emptypage svg"
                    width={500}
                    height={300}
                    className="object-contain w-full h-auto"
                />
            </div>
            <p className='text-sm text-center'>No activity yet. Create anew campaign to get started</p>
            <Link href='/createcampaign' className='text-white hover:text-[#247B7B] bg-[#247B7B] hover:bg-transparent border border-transparent hover:border-[#247B7B] py-2 px-11 rounded-[4px] text-sm'> <Add /> New Campaign </Link>
        </div>
    </section>
  );
}
