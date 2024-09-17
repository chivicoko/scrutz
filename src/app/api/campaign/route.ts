import { NextRequest, NextResponse } from 'next/server';
import Campaign from '../../../models/campaignModel';
import { connectToDb } from '@/lib/mongodb';

export async function GET(req: NextRequest, { params }: { params?: { id?: string } }) {
  await connectToDb();

  if (params?.id) {
    const campaign = await Campaign.findById(params.id);

    if (!campaign) {
      return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
    }

    return NextResponse.json(campaign);
  } else {
    const campaigns = await Campaign.find();
    return NextResponse.json(campaigns);
  }
}

export async function POST(req: NextRequest) {
  await connectToDb();
  const data = await req.json();

  const campaign = new Campaign({
    ...data,
    digestCampaign: data.digestCampaign || false,
    dailyDigest: data.dailyDigest || 'Daily',
    campaignStatus: data.campaignStatus === 'active' ? 'Active' : 'Inactive',
  });

  try {
    await campaign.save();
    return NextResponse.json(campaign);
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}


export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await connectToDb();
  const updatedData = await req.json();
  
  const campaign = await Campaign.findByIdAndUpdate(
    params.id,
    { ...updatedData },
    { new: true }
  );

  if (!campaign) {
    return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
  }

  return NextResponse.json(campaign);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await connectToDb();
  const result = await Campaign.findByIdAndDelete(params.id);

  if (!result) {
    return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
  }

  return NextResponse.json({ message: 'Campaign deleted' });
}
