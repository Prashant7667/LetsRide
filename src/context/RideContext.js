import React, { createContext, useState, useEffect } from 'react';
import * as rideApi from '../api/rideApi';

export const RideContext = createContext();

export default function RideProvider({ children }) {
  const [currentRide, setCurrentRide] = useState(null);
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRides = async () => {
    setLoading(true);
    try {
      const res = await rideApi.getRides();
      setRides(res.data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRides();
  }, []);

  const createRide = async (payload) => {
    const res = await rideApi.createRide(payload);
    const ride = res.data;
    setCurrentRide(ride);
    setRides(prev => [ride, ...prev]);
    return ride;
  };

  const updateRide = async (rideId, payload) => {
    const res = await rideApi.updateRide(rideId, payload);
    const updated = res.data;
    setRides(prev => prev.map(r => (r.id === rideId ? updated : r)));
    if (currentRide?.id === rideId) setCurrentRide(updated);
    return updated;
  };

  const cancelRide = async (rideId) => {
    await rideApi.cancelRide(rideId);
    setRides(prev => prev.filter(r => r.id !== rideId));
    if (currentRide?.id === rideId) setCurrentRide(null);
  };

  return (
    <RideContext.Provider value={{
      currentRide,
      rides,
      loading,
      fetchRides,
      createRide,
      updateRide,
      cancelRide,
      setCurrentRide
    }}>
      {children}
    </RideContext.Provider>
  );
}
