'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { FC } from 'react'

interface PaginationControlsProps {
    hasNextPage: boolean
    hasPrevPage: boolean
}

const PaginationControls: FC<PaginationControlsProps> = ({hasNextPage, hasPrevPage}) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const page = searchParams.get('page') ?? '1';
    const per_page = searchParams.get('per_page') ?? '10';


  return (
    <div className='flex gap-2'>
        <button className='bg-blue-600 text-white p-2' disabled={!hasPrevPage} onClick={() => {router.push(`/paginations/?page=${Number(page) - 1}&per_page=${per_page}`)}}>prev</button>
        <div>{page} / { Math.ceil(31 / Number(per_page)) }</div>
        <button className='bg-blue-600 text-white p-2' disabled={!hasNextPage} onClick={() => {router.push(`/paginations/?page=${Number(page) + 1}&per_page=${per_page}`)}}>next</button>
    </div>
  )
}

export default PaginationControls;