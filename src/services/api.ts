import { CampaignCreate, CampaignUpdate } from '@/utils/types';
import axios from 'axios';

const API_URL = '/api/campaign';

export const getCampaigns = async () => {
  const response = await axios.get(`${API_URL}`);
  return response.data;
};

export const getCampaignById = async (id: string) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createCampaign = async (campaignData: CampaignCreate) => {
  const response = await axios.post(API_URL, campaignData);
  console.log(response.data);
  return response.data;
};

export const updateCampaign = async (id: string, campaignData: CampaignUpdate) => {
  const response = await axios.put(`${API_URL}/${id}`, campaignData);
  return response.data;
};

export const deleteCampaign = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
