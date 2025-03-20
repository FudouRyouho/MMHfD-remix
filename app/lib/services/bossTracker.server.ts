// lib/services/bossTrackerService.server.ts
import { getCollection } from '../server/db.server';
import { BossData } from '~/lib/types';

export async function getLatestBossData(): Promise<BossData | null> {
  const collection = await getCollection('bossTrackerData');
  const result = await collection.findOne({ _id: 'latest' });
  return result?.data || null;
}

export async function updateBossData(data: BossData): Promise<void> {
  const collection = await getCollection('bossTrackerData');
  await collection.updateOne(
    { _id: 'latest' },
    { $set: { data } },
    { upsert: true }
  );
}