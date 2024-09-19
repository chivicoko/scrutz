// import { connectToDb } from '@/lib/mongodb';
// import Campaign from '@/models/campaignModel';
// import { NextApiRequest, NextApiResponse } from 'next';

// connectToDb();

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { method } = req;
//   const { id } = req.query;

//   switch (method) {
//     case 'GET':
//       try {
//         const campaign = await Campaign.findById(id);
//         if (!campaign) {
//           return res.status(404).json({ message: 'Campaign not found' });
//         }
//         res.status(200).json(campaign);
//       } catch (error) {
//         res.status(500).json({ message: 'Server Error', error });
//       }
//       break;

//     case 'PUT':
//       try {
//         const campaign = await Campaign.findByIdAndUpdate(id, req.body, { new: true });
//         if (!campaign) {
//           return res.status(404).json({ message: 'Campaign not found' });
//         }
//         res.status(200).json(campaign);
//       } catch (error) {
//         res.status(500).json({ message: 'Server Error', error });
//       }
//       break;

//     case 'DELETE':
//       try {
//         const campaign = await Campaign.findByIdAndUpdate(id, { campaignStatus: 'deleted' }, { new: true });
//         if (!campaign) {
//           return res.status(404).json({ message: 'Campaign not found' });
//         }
//         res.status(200).json({ message: 'Campaign stopped successfully', campaign });
//       } catch (error) {
//         res.status(500).json({ message: 'Server Error', error });
//       }
//       break;

//     default:
//       res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
//       res.status(405).end(`Method ${method} Not Allowed`);
//       break;
//   }
// }


import { NextRequest, NextResponse } from 'next/server';
import Campaign from '../../../../models/campaignModel';
import { connectToDb } from '@/lib/mongodb';

// GET campaign by ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  await connectToDb();
  const campaign = await Campaign.findById(params.id);

  if (!campaign) {
    return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
  }

  return NextResponse.json(campaign);
}

// PUT (update) campaign by ID
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await connectToDb();
  const updatedData = await req.json();

  const campaign = await Campaign.findByIdAndUpdate(params.id, updatedData, { new: true });

  if (!campaign) {
    return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
  }

  return NextResponse.json(campaign);
}

// DELETE campaign by ID
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await connectToDb();
  const result = await Campaign.findByIdAndDelete(params.id);

  if (!result) {
    return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
  }

  return NextResponse.json({ message: 'Campaign deleted' });
}
