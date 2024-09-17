'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowBack } from '@mui/icons-material';
import { createCampaign, getCampaignById, updateCampaign } from '@/services/api';
import { FormData } from '@/utils/types';

const CampaignPage = () => {
  const router = useRouter(); 
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [formData, setFormData] = useState<FormData>({
    campaignName: '',
    campaignDescription: '',
    startDate: '',
    endDate: '',
    digestCampaign: false,
    linkedKeywords: '',
    dailyDigest: '',
    campaignStatus: 'active',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [keywords, setKeywords] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const fieldValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData({
      ...formData,
      [name]: fieldValue,
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const keyword = formData.linkedKeywords.trim();

      if (keyword && !keywords.includes(keyword)) {
        setKeywords([...keywords, keyword]);
        setFormData({ ...formData, linkedKeywords: '' });
      }
    }
  };

  const handleRemoveKeyword = (keywordToRemove: string) => {
    setKeywords(keywords.filter((keyword) => keyword !== keywordToRemove));
  };

  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      fetchCampaign(id);
    }
  }, [id]);

  const fetchCampaign = async (id: string) => {
    try {
      const campaign = await getCampaignById(id);
      setFormData({
        campaignName: campaign.campaignName,
        campaignDescription: campaign.campaignDescription,
        startDate: formatISOToDate(campaign.startDate),
        endDate: formatISOToDate(campaign.endDate),
        digestCampaign: campaign.digestCampaign,
        linkedKeywords: campaign.linkedKeywords.join(', '),
        dailyDigest: campaign.dailyDigest || '',
        campaignStatus: campaign.campaignStatus || 'active',
      });
      setKeywords(campaign.linkedKeywords);
    } catch (err) {
      console.error('Error fetching campaign:', err);
      setError('Failed to fetch campaign.');
    }
  };

  const formatISOToDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      dailyDigest: e.target.value,
    });
  };

  const validateForm = (): boolean => {
    if (!formData.campaignName || !formData.campaignDescription || !formData.startDate) {
      setError('Please fill in all required fields.');
      return false;
    }
    return true;
  };

  const formatDateToISO = (dateString: string): string => {
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setError(null);

    try {
      if (isEditMode) {
        await updateCampaign(id!, {
          ...formData,
          startDate: formatDateToISO(formData.startDate),
          endDate: formatDateToISO(formData.endDate),
          linkedKeywords: keywords,
          campaignStatus: formData.campaignStatus,
          id,
        });
      } else {
        await createCampaign({
          ...formData,
          startDate: formatDateToISO(formData.startDate),
          endDate: formatDateToISO(formData.endDate),
          linkedKeywords: keywords,
          campaignStatus: formData.campaignStatus, 
        });
      }
      console.log(formData);
      router.push('/campaign');
    } catch (err) {
      setError('Failed to save the campaign. Please try again.');
      console.error('Error saving campaign:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className='px-6 md:px-16 lg:pl-[85px] lg:pr-52 pt-6'>
        {isEditMode ? 
        <button
            className='flex items-center gap-1 md:text-sm mb-5 transition-transform duration-300 ease-in-out transform hover:-translate-x-1'
            onClick={() => router.push('/campaignlist')}
        >
            <ArrowBack /> Back
        </button>
        : null}

      <h1 className='text-[#247B7B] text-xl font-bold mb-5'>
        {isEditMode ? 'Campaign Information' : 'Create New Campaign'}
      </h1>

      <form onSubmit={handleSubmit} className='lg:w-3/4 flex flex-col gap-4 text-sm'>

        <div className='flex flex-col text-[#666666]'>
          <label htmlFor='campaignName' className='text-xs'>
            Campaign Name<span className='text-red-600'>*</span>
          </label>
          <input
            type='text'
            id='campaignName'
            onChange={handleInputChange}
            value={formData.campaignName}
            name='campaignName'
            placeholder='e.g The Future is now'
            className='border rounded-[4px] placeholder:text-xs py-2 px-[10px]'
            required
          />
        </div>

        {!isEditMode ? 
        <div className="flex flex-col text-[#666666]">
            <label htmlFor="campaignDescription" className="text-xs">
            Campaign Description<span className="text-red-600">*</span>
            </label>
            <textarea
            name="campaignDescription"
            onChange={handleInputChange}
            value={formData.campaignDescription}
            id="campaignDescription"
            placeholder="Please add a description to your campaign"
            className="border min-h-24 rounded-[4px] placeholder:text-xs py-2 px-[10px]"
            required
            ></textarea>
        </div>
        : null}
       
        <div className='flex items-center justify-between gap-2 md:gap-6 text-[#666666]'>
          <div className='w-1/3 flex-1 flex flex-col'>
            <label htmlFor='startDate' className='text-xs'>
              Start Date<span className='text-red-600'>*</span>
            </label>
            <input
              type='text'
              placeholder={`${!isEditMode ? "dd/mm/yyyy" : "22/09/2024"}`}
              id='startDate'
              onChange={handleInputChange}
              value={formData.startDate}
              name='startDate'
              className='border rounded-[4px] placeholder:text-xs py-2 px-[10px]'
              required
            />
          </div>
          <div className='w-1/3 flex-1 flex flex-col'>
            <label htmlFor='endDate' className='text-xs'>End Date</label>
            <input
              type='text'
              placeholder={`${!isEditMode ? "dd/mm/yyyy" : "22/09/2024"}`}
              id='endDate'
              onChange={handleInputChange}
              value={formData.endDate}
              name='endDate'
              className='border rounded-[4px] placeholder:text-xs py-2 px-[10px]'
            />
          </div>
        </div>

        {!isEditMode ?
        <div className='flex items-center justify-between mb-1'>
          <span className='text-xs'>Want to receive daily digest about the campaign?</span>
          <label className='relative inline-block w-12 h-6'>
            <input
              type='checkbox'
              checked={formData.digestCampaign}
              onChange={handleInputChange}
              name='digestCampaign'
              className='opacity-0 w-0 h-0'
            />
            <span className='slider round'></span>
          </label>
        </div>

        : null}

        <div className='flex flex-col text-[#666666]'>
            <label htmlFor="linkedKeywords" className='text-xs'>Linked Keywords<span className='text-red-600'>*</span></label>
            <div className='border h-fit rounded-[4px] focus-within:border-[#247B7B] focus-within:ring-1 focus-within:ring-[#247B7B] leading-tight focus:outline-0 focus:ring-0'>
                <span className='flex gap-2 pt-2 px-2'>
                    {
                        keywords.map((keyword) => {
                            return (
                                <span key={keyword} className='flex gap-2 items-center justify-between py-2 px-3 rounded-[4px] bg-[#247b7b] text-white'>
                                    {keyword}
                                    <button type='button' onClick={() => handleRemoveKeyword(keyword)} >x</button>
                                </span>
                            )
                        })
                    }
                </span>
                <textarea name="linkedKeywords" id="linkedKeywords" onKeyDown={handleKeyPress} onChange={handleInputChange} value={formData.linkedKeywords} placeholder='To add keywords, type your keyword and press enter' className='w-full placeholder:text-xs min-h-9 rounded-[4px] py-2 px-[10px] outline-none border-0'></textarea>
            </div>
        </div>
                  
        {isEditMode ? 
        <>      
            <div className="flex flex-col mb-1">
                <span className='text-xs'>Want to receive daily digest about the campaign?</span>
                <select value={'category'} className="bg-transparent text-gray-700 border rounded-[4px] focus-within:border-[#247B7B] focus-within:ring-1 focus-within:ring-[#247B7B] p-2 md:p-3 leading-tight focus:outline-0 focus:ring-0">
                    <option key="Yes" value="Yes">Yes </option>
                    <option key="No" value="No">No </option>
                </select>
            </div>            

            <div className='flex-1 flex flex-col'>
                <label htmlFor="howOften" className='text-xs'>Kindly select how often you want to receive daily digest</label>
                <select value={'category'} className="bg-transparent text-gray-700 border rounded-[4px] focus-within:border-[#247B7B] focus-within:ring-1 focus-within:ring-[#247B7B] p-2 md:p-3 leading-tight focus:outline-0 focus:ring-0">
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                </select>
            </div>

            {error && <p className='text-red-600 text-xs'>{error}</p>}

            <div className="btns flex items-center justify-center md:justify-start gap-2 mt-4 md:mt-8">
                <button className='min-w-36 text-white bg-red-800 hover:bg-red-700 border-0 py-2 px-6 rounded-[4px] text-xs md:text-sm'> Stop Campaign </button>
                <button disabled={loading} className='min-w-36 disabled:bg-gray-400 text-[#247B7B] hover:text-white bg-transparent hover:bg-[#247B7B] border border-[#247B7B] hover:border-transparent py-2 px-6 rounded-[4px] text-xs md:text-sm'> {loading ? 'Editing...' : ' Edit Information'} </button>
            </div>
        </>
       :
       <>
        <div className="flex-1 flex flex-col">
          <label htmlFor="dailyDigest" className="text-xs">
            Kindly select how often you want to receive daily digest
          </label>
          <select
            name="dailyDigest"
            value={formData.dailyDigest}
            onChange={handleSelectChange}
            className="md:w-1/4 bg-transparent text-gray-700 border rounded-[4px] focus-within:border-[#247B7B] focus-within:ring-1 focus-within:ring-[#247B7B] p-2 md:p-3 leading-tight focus:outline-0 focus:ring-0"
          >
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
          </select>
        </div>
          
        <div className="btns flex items-center justify-center md:justify-start gap-2 mt-4 md:mt-8">
            <button onClick={() => router.push('/campaignlist')} className='min-w-36 text-[#247B7B] hover:text-white bg-transparent hover:bg-[#247B7B] border border-[#247B7B] hover:border-transparent py-2 px-6 rounded-[4px] text-xs md:text-sm'> Cancel </button>
            <button disabled={loading} className={`min-w-36 text-white hover:text-[#247B7B] bg-[#247B7B] hover:bg-transparent border border-transparent hover:border-[#247B7B] py-2 px-6 rounded-[4px] text-xs md:text-sm ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}> {loading ? 'Creating...' : 'Create Campaign'} </button>
        </div>

        {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
       </>
       }
        
      </form>
    </section>
  );
};

export default CampaignPage;
