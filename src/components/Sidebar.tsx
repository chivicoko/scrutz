'use client';

import { Add, Campaign, HelpOutline, KeyboardArrowDown, Settings, Tungsten } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

    interface SidebarProps {
        show?: string;
        closeSidebar?: () => void;
    }
  
const Sidebar: React.FC<SidebarProps> = ({ show = 'hidden', closeSidebar = () => {} }) => {
        return (
    <nav className={`overflow-auto ${show === 'block' ? 'fixed lg:hidden' : 'hidden'} lg:block top-0 left-0 z-50 lg:z-auto w-4/5 sm:w-3/5 lg:w-1/5 min-h-screen bg-[#F0F4F4] flex flex-col justify-start items-center transition-transform duration-300`}>
        <button className='self-end mr-3 md:mr-8 mt-2 text-3xl lg:hidden' onClick={closeSidebar}>&times;</button>
        <div className="flex flex-col justify-start items-center gap-8 lg:gap-12 pb-6 lg:py-6">
            <Link href="/" className="flex items-center justify-start gap-2">
                <div className="relative w-[48px] h-[48px]">
                <Image
                    src="/logo.svg"
                    alt="Scrutz's Logo"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
                </div>
                <div className="relative w-[103px] h-[32px]">
                <Image
                    src="/Scrutz.svg"
                    alt="Scrutz's Logo"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 50px"
                />
                </div>
            </Link>
            
            <div className="flex items-center justify-end md:hidden">
                <span className="px-2 flex items-center justify-between gap-2">
                    <span className="text-[#333333]"><AccountCircleIcon /></span>
                    <button className="text-[#666666] flex items-center justify-between gap-1 text-sm">
                    Big Tech
                    <span className="text-[#333333]"><KeyboardArrowDown /></span>
                    </button>
                </span>
            </div>

            <div className="tabs">
                <Link href='/createcampaign' className="text-white w-full hover:text-[#247B7B] bg-[#247B7B] hover:bg-transparent border border-transparent hover:border-[#247B7B] py-2 px-11 rounded-[4px] text-sm">
                    <Add /> New Campaign
                </Link>

                <ul className="flex flex-col items-center gap-3 mt-10 w-full">
                    <li className="w-full py-2 px-8 rounded-[4px] text-sm text-[#455454] hover:text-[#247b7b] hover:bg-white group">
                        <Link href="/" className="flex items-center gap-3">
                            <span className="relative w-6 h-6 group-hover:hidden">
                                <Image
                                src="/overview2.svg"
                                alt="overview svg"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </span>
                            <span className="relative w-6 h-6 hidden group-hover:block">
                                <Image
                                src="/overview1.svg"
                                alt="overview svg"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </span>
                            <span className="">Overview</span>
                        </Link>
                    </li>

                    <li className="w-full py-2 px-8 rounded-[4px] text-sm text-[#455454] hover:text-[#247b7b] hover:bg-white">
                        <Link href="/campaign" className="flex items-center gap-3">
                            <span className=""><Campaign /></span>
                            <span className="">Campaign</span>
                        </Link>
                    </li>
                    <li className="w-full py-2 px-8 rounded-[4px] text-sm text-[#455454] hover:text-[#247b7b] hover:bg-white">
                        <Link href="/campaigns" className="flex items-center gap-3">
                        <span className="rotate-180"><Tungsten /></span>
                        <span className="">Market Intelligence</span>
                        </Link>
                    </li>
                    <li className="w-full py-2 px-8 rounded-[4px] text-sm text-[#455454] hover:text-[#247b7b] hover:bg-white">
                        <Link href="/campaigns" className="flex items-center gap-3">
                        <span className=""><Settings /></span>
                        <span className="">Account Settings</span>
                        </Link>
                    </li>
                </ul>
            </div>

            <div className="card bg-white w-5/6 py-8 px-10 rounded-[4px] flex flex-col items-center gap-2">
                <span className="text-[#247b7b]"><HelpOutline /></span>
                <div className="relative w-[72px] h-[20px] border border-transparent">
                <Image
                    src="/needhelp.svg"
                    alt="needhelp svg"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
                </div>
                <p className="text-xs text-center text-[#666666]">We are readily available to provide help</p>
                <button className="text-xs border border-[#247b7b] text-[#247b7b] hover:text-white bg-transparent hover:bg-[#247b7b] hover:border-transparent rounded-[4px] py-2 px-6">Get help</button>
            </div>
        </div>
    </nav>
  );
};

export default Sidebar;
