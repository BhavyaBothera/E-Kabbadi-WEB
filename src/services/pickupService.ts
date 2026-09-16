import { db } from './db';

export const syncOfflineOrders = async () => {
  const pendingSync = await db.pickups.where({ synced: false }).toArray();
  
  if (pendingSync.length === 0) {
    console.log("All orders are synced.");
    return;
  }

  // TODO: Replace with your FastAPI endpoint call
  console.log(`Syncing ${pendingSync.length} offline orders to the server...`);

  await Promise.all(pendingSync.map(async (order) => {
    // Simulate network latency for the hackathon demo
    await new Promise(resolve => setTimeout(resolve, 800));
    await db.pickups.update(order.id!, { synced: true });
  }));
  
  console.log("Sync complete!");
};