'use client';

import React from 'react';

interface CampaignDeletedModalProps {
  onClose: () => void;
}

const CampaignDeletedModal: React.FC<CampaignDeletedModalProps> = ({}) => {
  return (
    <section className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center p-2 z-50">
      <article className="bg-white py-12 px-8 md:py-20 md:px-32 text-[#333] rounded-lg shadow-lg flex flex-col justify-center items-center gap-4 md:gap-6">
        <h2 className="font-bold mb-4 text-center w-full border-b-2 pb-2 md:pb-4">Campaign Deleted</h2>
        <p className="mb-4 text-center text-sm">MTN campaign has been deleted.</p>
        <button className='text-white hover:text-[#247B7B] bg-[#247B7B] hover:bg-transparent border border-transparent hover:border-[#247B7B] py-2 px-8 rounded-[4px] text-sm'> Go Back to campaign list </button>
      </article>
    </section>
  );
};

export default CampaignDeletedModal;
