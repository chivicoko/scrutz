'use client';

import React, { useState } from 'react';
import { Campaign } from '@/utils/types';
import { VisibilityOutlined, DeleteOutline, EditNote } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { deleteCampaign } from '@/services/api';
import CampaignDeleteModal from '@/components/CampaignDeleteModal';
import CampaignDeletedModal from '@/components/CampaignDeletedModal';
import Loading from '../app/loading';
import BasicPagination from './Pagination';

interface CampaignTableProps {
  campaigns: Campaign[];
  loading: boolean;
  error: string | null;
}

const CampaignTable: React.FC<CampaignTableProps> = ({ campaigns, loading, error }) => {
  const router = useRouter();
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showDeletedModal, setShowDeletedModal] = useState<boolean>(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  if (loading) return <Loading />;
  if (error) return <p className='text-red-500'>{error}</p>;

  const handleEdit = (id: string) => {
    router.push(`/campaign/${id}`);
  };

  const handleView = (id: string) => {
    router.push(`/campaign/${id}`);
  };

  const handleDeleteClick = (id: string) => {
    setDeletingId(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (deletingId) {
      try {
        await deleteCampaign(deletingId);
        setShowDeleteModal(false);
        setShowDeletedModal(true);

        // const updatedCampaigns = await getCampaigns();
      } catch (err) {
        console.log('Failed to delete campaign');
      } finally {
        setDeletingId(null);
      }
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setDeletingId(null);
  };

  const handleCloseDeletedModal = () => {
    setShowDeletedModal(false);
  };

  return (
    <>
        {campaigns && campaigns?.length > 0 ?
        <>
            <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                    <tr className='border-0 rounded-[4px]'>
                    <th className='px-6 py-2 text-left text-xs font-medium text-gray-500 tracking-wider'>S/N</th>
                    <th className='px-6 py-2 text-left text-xs font-medium text-gray-500 tracking-wider'>Campaign Name</th>
                    <th className='px-6 py-2 text-left text-xs font-medium text-gray-500 tracking-wider'>Start Date</th>
                    <th className='px-6 py-2 text-left text-xs font-medium text-gray-500 tracking-wider'>Status</th>
                    <th className='px-6 py-2 text-left text-xs font-medium text-gray-500 tracking-wider'>Actions</th>
                    </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                    {campaigns.map((campaign, index) => (
                    <tr key={campaign._id} className='border-b'>
                        <td className='px-6 py-2 text-xs whitespace-nowrap'>{index + 1}.</td>
                        <td className='px-6 py-2 text-xs whitespace-nowrap'>{campaign.campaignName}</td>
                        <td className='px-6 py-2 text-xs whitespace-nowrap'>{new Date(campaign.startDate).toLocaleDateString()}</td>
                        <td className={`${campaign.campaignStatus === 'active' ? 'text-green-500' : 'text-red-700'} px-6 py-2 text-xs whitespace-nowrap`}>{campaign.campaignStatus === 'active' ? "Active" : "Inactive"}</td>
                        <td className='px-6 py-2 text-xs whitespace-nowrap flex space-x-2'>
                        <button onClick={() => handleView(campaign._id)} className='text-[#666666] hover:text-green-700'>
                            <VisibilityOutlined style={{width: '17px', height: '17px'}} />
                        </button>
                        <button onClick={() => handleEdit(campaign._id)} className='text-[#666666] hover:text-blue-700'>
                            <EditNote style={{width: '19px', height: '19px'}} />
                        </button>
                        <button onClick={() => handleDeleteClick(campaign._id)} className='text-[#666666] hover:text-red-700'>
                            <DeleteOutline style={{width: '17px', height: '17px'}} />
                        </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
            <div className='mt-8 flex flex-col md:flex-row items-center justify-between'>
                <BasicPagination />
                <p className='text-sm'>Showing 10 of 40 results</p>
            </div>
        </>  
        :
        <div className='text-center text-xl text-gray-600'>No Campaigns found</div>
        }

      {showDeleteModal && (
        <CampaignDeleteModal
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}

      {showDeletedModal && (
        <CampaignDeletedModal
          onClose={handleCloseDeletedModal}
        />
      )}
    </>
  );
};

export default CampaignTable;
