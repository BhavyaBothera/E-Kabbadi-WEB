import React, { createContext, useContext, useState } from 'react';

export interface PickupItem {
  id: string;
  material: string;
  weightKg: number;
  estPrice: number;
  status: 'Requested' | 'Assigned' | 'Picked Up';
  createdAt: string;
}

interface PickupContextType {
  pickups: PickupItem[];
  addPickup: (material: string, weightKg: number, estPrice: number) => void;
  updateStatus: (id: string, status: PickupItem['status']) => void;
}

const PickupContext = createContext<PickupContextType | undefined>(undefined);

export const PickupProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pickups, setPickups] = useState<PickupItem[]>([
    {
      id: 'REQ-101',
      material: 'Copper Wires & E-Waste',
      weightKg: 5.2,
      estPrice: 2400,
      status: 'Requested',
      createdAt: '2 mins ago',
    },
  ]);

  const addPickup = (material: string, weightKg: number, estPrice: number) => {
    const newOrder: PickupItem = {
      id: `REQ-${Math.floor(100 + Math.random() * 900)}`,
      material,
      weightKg,
      estPrice,
      status: 'Requested',
      createdAt: 'Just now',
    };
    setPickups((prev) => [newOrder, ...prev]);
  };

  const updateStatus = (id: string, status: PickupItem['status']) => {
    setPickups((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
  };

  return (
    <PickupContext.Provider value={{ pickups, addPickup, updateStatus }}>
      {children}
    </PickupContext.Provider>
  );
};

export const usePickups = () => {
  const context = useContext(PickupContext);
  if (!context) throw new Error('usePickups must be used within a PickupProvider');
  return context;
};