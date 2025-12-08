import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Alert } from 'react-native';
import Button from '../../components/Button';
import RideCard from '../../components/RideCard';
import { RideContext } from '../../context/RideContext';
import * as rideApi from '../../api/rideApi';

export default function RideDetailsScreen({ route, navigation }) {
  const { rideId } = route.params || {};
  const { currentRide, setCurrentRide, updateRide, cancelRide } = useContext(RideContext);
  const [ride, setRide] = useState(null);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    try {
      setLoading(true);
      const res = await rideApi.getRide(rideId);
      setRide(res.data);
      setCurrentRide(res.data);
    } catch (e) {
      Alert.alert('Error', 'Failed to load ride');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [rideId]);

  const onCancel = async () => {
    try {
      await cancelRide(rideId);
      Alert.alert('Cancelled', 'Ride cancelled');
      navigation.goBack();
    } catch (e) {
      Alert.alert('Error', 'Failed to cancel ride');
    }
  };

  const onMarkArrived = async () => {
    try {
      const updated = await updateRide(rideId, { status: 'ARRIVED' });
      setRide(updated);
      Alert.alert('Updated', 'Marked as arrived');
    } catch (e) {
      Alert.alert('Error', 'Failed to update ride');
    }
  };

  if (!ride && !loading) return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Ride not found</Text></View>;

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <RideCard ride={ride || currentRide || {}} />
      <View style={{ height: 12 }} />
      <Text style={{ fontSize: 16, marginBottom: 8 }}>Pickup: {ride?.pickup || '-'}</Text>
      <Text style={{ fontSize: 16, marginBottom: 8 }}>Drop: {ride?.drop || '-'}</Text>
      <Text style={{ fontSize: 16, marginBottom: 8 }}>Status: {ride?.status || '-'}</Text>
      <View style={{ height: 12 }} />
      <Button title="Mark arrived" onPress={onMarkArrived} />
      <View style={{ height: 8 }} />
      <Button title="Cancel ride" variant="ghost" onPress={onCancel} />
    </View>
  );
}
