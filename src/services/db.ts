import Dexie, { Table } from 'dexie';

export interface PickupOrder {
  id?: number;
  userId: string;
  material: string;
  estimatedWeight: number;
  status: 'pending' | 'accepted' | 'completed';
  synced: boolean;
}

export class KabbadiDB extends Dexie {
  pickups!: Table<PickupOrder>;

  constructor() {
    super('EKabbadiDB');
    this.version(1).stores({
      pickups: '++id, userId, status, synced' // Indexed fields
    });
  }
}

export const db = new KabbadiDB();