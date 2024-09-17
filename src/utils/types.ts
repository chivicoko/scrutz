export interface Campaign {
  _id: string;
  campaignName: string;
  campaignDescription: string;
  startDate: string;
  endDate: string;
  digestCampaign: boolean;
  linkedKeywords: string[];
  dailyDigest: string;
  campaignStatus: string;
}

export interface CampaignCreate {
  campaignName: string;
  campaignDescription: string;
  startDate: string;
  endDate?: string;
  digestCampaign: boolean;
  linkedKeywords: string[];
  dailyDigest: string;
  campaignStatus: string;
}

export interface FormData {
  campaignName: string;
  campaignDescription: string;
  startDate: string;
  endDate: string;
  digestCampaign: boolean;
  linkedKeywords: string;
  dailyDigest: string;
  campaignStatus: string;
}

export interface CampaignUpdate extends CampaignCreate {
  id: string;
}

export interface CampaignStatusUpdate {
  id: string;
  campaignStatus: string;
}
