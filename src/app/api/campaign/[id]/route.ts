import { connectToDb } from '@/lib/mongodb';
import Campaign from '@/models/campaignModel';
import { NextApiRequest, NextApiResponse } from 'next';

connectToDb();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case 'GET':
      try {
        const campaign = await Campaign.findById(id);
        if (!campaign) {
          return res.status(404).json({ message: 'Campaign not found' });
        }
        res.status(200).json(campaign);
      } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
      }
      break;

    case 'PUT':
      try {
        const campaign = await Campaign.findByIdAndUpdate(id, req.body, { new: true });
        if (!campaign) {
          return res.status(404).json({ message: 'Campaign not found' });
        }
        res.status(200).json(campaign);
      } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
      }
      break;

    case 'DELETE':
      try {
        const campaign = await Campaign.findByIdAndUpdate(id, { campaignStatus: 'deleted' }, { new: true });
        if (!campaign) {
          return res.status(404).json({ message: 'Campaign not found' });
        }
        res.status(200).json({ message: 'Campaign stopped successfully', campaign });
      } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
