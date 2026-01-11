import React, { createContext, useState, useEffect, useContext } from 'react';
import * as rideApi from '../api/rideApi';
import { toCoordinates } from '../utils/locationMapper';
import { AuthContext } from './AuthContext';

export const RideContext = createContext();

export default function RideProvider({ children }) {
  const { userId, role } = useContext(AuthContext);
  const [rides, setRides] = useState([]);
  const [availableRides, setAvailableRides] = useState([]);
  const [currentRide, setCurrentRide] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchRideHistory = async () => {
    setLoading(true);
    try {
      const res = await rideApi.getRideHistory();
      setRides(res.data || []);
    } catch (e) {
      console.error('Failed to fetch ride history:', e);
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailableRides = async () => {
    if (role !== 'DRIVER') return;
    setLoading(true);
    try {
      const res = await rideApi.getAvailableRides();
      setAvailableRides(res.data || []);
    } catch (e) {
      console.error('Failed to fetch available rides:', e);
    } finally {
      setLoading(false);
    }
  };

  const createRide = async ({ pickup, drop, fare, pickupLocation, dropLocation }) => {
    const coords = toCoordinates(pickup, drop);

    const payload = {
      ...coords,
      fare,
      pickupLocation: pickupLocation || pickup,
      dropLocation: dropLocation || drop,
    };

    const res = await rideApi.RequstRide(payload);
    const newRide = res.data;
    setCurrentRide(newRide);
    setRides(prev => [newRide, ...prev]);
    return newRide;
  };

  const acceptRide = async (rideId) => {
    if (!userId) throw new Error('User not authenticated');
    try {
      const res = await rideApi.AcceptRide(rideId, userId);
      const updatedRide = res.data;
      setCurrentRide(updatedRide);
      setRides(prev => prev.map(r => r.id === rideId ? updatedRide : r));
      setAvailableRides(prev => prev.filter(r => r.id !== rideId));
      return updatedRide;
    } catch (e) {
      console.error('Failed to accept ride:', e);
      throw e;
    }
  };

  const rejectRide = async (rideId) => {
    if (!userId) throw new Error('User not authenticated');
    try {
      await rideApi.RejectRide(rideId, userId);
      setAvailableRides(prev => prev.filter(r => r.id !== rideId));
    } catch (e) {
      console.error('Failed to reject ride:', e);
      throw e;
    }
  };

  const startRide = async (rideId) => {
    if (!userId) throw new Error('User not authenticated');
    try {
      const res = await rideApi.StartRide(rideId, userId);
      const updatedRide = res.data;
      setCurrentRide(updatedRide);
      setRides(prev => prev.map(r => r.id === rideId ? updatedRide : r));
      return updatedRide;
    } catch (e) {
      console.error('Failed to start ride:', e);
      throw e;
    }
  };

  const completeRide = async (rideId) => {
    if (!userId) throw new Error('User not authenticated');
    try {
      const res = await rideApi.CompleteRide(rideId, userId);
      const updatedRide = res.data;
      setCurrentRide(null);
      setRides(prev => prev.map(r => r.id === rideId ? updatedRide : r));
      return updatedRide;
    } catch (e) {
      console.error('Failed to complete ride:', e);
      throw e;
    }
  };

  const cancelRide = async (rideId, driverId = null) => {
    const cancelUserId = driverId || userId;
    if (!cancelUserId) throw new Error('User not authenticated');
    try {
      await rideApi.CancelRide(rideId, cancelUserId);
      setRides(prev => prev.filter(r => r.id !== rideId));
      if (currentRide?.id === rideId) {
        setCurrentRide(null);
      }
    } catch (e) {
      console.error('Failed to cancel ride:', e);
      throw e;
    }
  };

  const refreshRide = async (rideId) => {
    try {
      const res = await rideApi.getRideById(rideId);
      const updatedRide = res.data;
      setCurrentRide(prev => prev?.id === rideId ? updatedRide : prev);
      setRides(prev => prev.map(r => r.id === rideId ? updatedRide : r));
      return updatedRide;
    } catch (e) {
      console.error('Failed to refresh ride:', e);
      throw e;
    }
  };

  useEffect(() => {
    if (userId) {
      fetchRideHistory();
      if (role === 'DRIVER') {
        fetchAvailableRides();
      }
    }
  }, [userId, role]);

  return (
    <RideContext.Provider value={{
      rides,
      availableRides,
      currentRide,
      loading,
      fetchRideHistory,
      fetchAvailableRides,
      createRide,
      acceptRide,
      rejectRide,
      startRide,
      completeRide,
      cancelRide,
      refreshRide,
      setCurrentRide
    }}>
      {children}
    </RideContext.Provider>
  );
}
