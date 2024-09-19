'use client';

import React, { useEffect, useState } from 'react';
import CampaignTable from '@/components/CampaignTable';
import { Search } from '@mui/icons-material';
import { getCampaigns } from '@/services/api';
import { Campaign } from '@/utils/types';

const CampaignList = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [dateFilter, setDateFilter] = useState<string>('');

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await getCampaigns();
        setCampaigns(response);
        setFilteredCampaigns(response);
      } catch (err) {
        console.error('Error fetching campaigns:', err);
        setError('Failed to fetch campaigns.');
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  useEffect(() => {
    let result = campaigns;

    if (searchQuery) {
      result = result.filter(campaign =>
        campaign.campaignName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter !== 'All') {
      result = result.filter(campaign =>
        statusFilter === 'Active'
          ? campaign.campaignStatus === 'active'
          : campaign.campaignStatus === 'inactive'
      );
    }

    if (dateFilter) {
      result = result.filter(campaign =>
        new Date(campaign.startDate).toLocaleDateString() === dateFilter
      );
    }

    setFilteredCampaigns(result);
  }, [searchQuery, statusFilter, dateFilter, campaigns]);

  return (
    <section className='px-2 md:px-8 lg:pl-[85px] lg:pr-20 pt-6'>
      <h1 className='text-[#247B7B] text-xl font-bold mb-6'>All Campaigns</h1>
      <div className="filter flex flex-col gap-2 md:flex-row items-center justify-between">
        <div className="flex-1 flex items-center gap-3">
          <button
            onClick={() => setStatusFilter('All')}
            className={`flex items-center justify-between text-sm border border-[#247B7B] gap-2 text-[#247B7B] hover:text-white bg-transparent hover:bg-[#247B7B] rounded-[4px] py-2 px-3 ${
              statusFilter === 'All' ? 'bg-[#247B7B] text-[#247B7B]' : ''
            }`}
          >
            <span>All ({campaigns.length})</span>
          </button>
          <button
            onClick={() => setStatusFilter('Inactive')}
            className={`flex items-center justify-between text-sm border border-[#247B7B] gap-2 text-[#247B7B] hover:text-white bg-transparent hover:bg-[#247B7B] rounded-[4px] py-2 px-3 ${
              statusFilter === 'Inactive' ? 'bg-[#247B7B] text-white' : ''
            }`}
          >
            <span>Inactive ({campaigns.filter(c => c.campaignStatus === 'inactive').length})</span>
          </button>
          <button
            onClick={() => setStatusFilter('Active')}
            className={`flex items-center justify-between text-sm border border-[#247B7B] gap-2 text-[#247B7B] hover:text-white bg-transparent hover:bg-[#247B7B] rounded-[4px] py-2 px-3 ${
              statusFilter === 'Active' ? 'bg-[#247B7B] text-white' : ''
            }`}
          >
            <span>Active ({campaigns.filter(c => c.campaignStatus === 'active').length})</span>
          </button>
        </div>
        <div className='flex-1 flex items-center justify-between gap-4 text-xs'>
          <div className="flex-1 bg-transparent border w-fit px-2 md:w-[40%] flex items-center justify-between rounded-[4px] focus-within:ring-1 focus-within:ring-[#247B7B] hover:ring-[#247B7B]">
            <input
              type="text"
              placeholder="Search..."
              name="searchText"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent w-full py-2 border-0 text-xs pl-1 focus:outline-0 focus:ring-0 placeholder:text-xs md:text-base text-[#666666] leading-tight"
            />
            <button type="button" className="focus:outline-[#247B7B]">
              <span className='text-[#666666]'><Search className='h-4 w-4 md:h-6 md:w-6' /></span>
            </button>
          </div>
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="md:w-2/6 bg-transparent text-gray-700 border rounded-[4px] focus-within:border-[#247B7B] focus-within:ring-1 focus-within:ring-[#247B7B] p-2 md:p-3 leading-tight focus:outline-0 focus:ring-0"
          >
            <option value="">All Dates</option>
            {campaigns.map((campaign) => (
              <option key={campaign._id} value={new Date(campaign.startDate).toLocaleDateString()}>
                {new Date(campaign.startDate).toLocaleDateString()}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className='mt-6'>
        <CampaignTable campaigns={filteredCampaigns} loading={loading} error={error} />
      </div>
    </section>
  );
};

export default CampaignList;
