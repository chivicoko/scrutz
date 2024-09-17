import mongoose, { Schema, Document } from 'mongoose';

export interface ICampaign extends Document {
  campaignName: string;
  campaignDescription: string;
  startDate: Date;
  endDate: Date;
  digestCampaign: boolean;
  linkedKeywords: string[];
  dailyDigest: string;
  campaignStatus: string;
}

const CampaignSchema: Schema = new mongoose.Schema({
  campaignName: { type: String, required: true },
  campaignDescription: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  digestCampaign: { type: Boolean, default: false },
  linkedKeywords: { type: [String], required: true },
  dailyDigest: { type: String, enum: ['Daily', 'Weekly', 'Monthly'], required: true },
  campaignStatus: { type: String, enum: ['active', 'inactive'], default: 'active' },
});

const Campaign = mongoose.models.Campaign || mongoose.model<ICampaign>('Campaign', CampaignSchema);

export default Campaign;
