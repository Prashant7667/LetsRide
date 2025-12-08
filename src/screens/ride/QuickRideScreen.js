import React, { useState, useContext } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import DriverCard from '../../components/DriverCard';
import { RideContext } from '../../context/RideContext';
import * as rideApi from '../../api/rideApi';

export default function QuickRideScreen({ navigation }) {
  const { createRide, rides, loading, fetchRides } = useContext(RideContext);
  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');
  const [seats, setSeats] = useState('1');
  const [searching, setSearching] = useState(false);
  const [nearbyDrivers, setNearbyDrivers] = useState([]);

  const onRequestQuickRide = async () => {
    if (!pickup || !drop) {
      Alert.alert('Missing', 'Please add pickup and drop locations');
      return;
    }
    try {
      setSearching(true);
      const payload = { pickup, drop, seats: Number(seats) };
      const ride = await createRide(payload);
      navigation.navigate('RideDetails', { rideId: ride.id });
    } catch (e) {
      Alert.alert('Error', e?.response?.data?.message || e.message || 'Failed to create ride');
    } finally {
      setSearching(false);
    }
  };

  const findDrivers = async () => {
    try {
      setSearching(true);
      const res = await rideApi.getNearbyDrivers({ lat: 0, lng: 0 });
      setNearbyDrivers(res.data || []);
    } catch (e) {
      Alert.alert('Error', 'Failed to fetch drivers');
    } finally {
      setSearching(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, marginBottom: 12 }}>Quick Ride</Text>
      <Input placeholder="Pickup location" value={pickup} onChangeText={setPickup} />
      <Input placeholder="Drop location" value={drop} onChangeText={setDrop} />
      <Input placeholder="Seats" value={seats} onChangeText={setSeats} keyboardType="numeric" />
      <View style={{ height: 12 }} />
      <Button title={searching ? 'Searching...' : 'Request Ride'} onPress={onRequestQuickRide} loading={searching} />
      <View style={{ height: 10 }} />
      <Button title="Find nearby drivers" variant="ghost" onPress={findDrivers} />
      <View style={{ height: 16 }} />
      <Text style={{ fontSize: 16, marginBottom: 8 }}>Nearby drivers</Text>
      <FlatList
        data={nearbyDrivers}
        keyExtractor={(i) => i.id?.toString() || Math.random().toString()}
        renderItem={({ item }) => <DriverCard driver={item} onPress={() => Alert.alert('Driver selected', item.name || 'Driver')} />}
        ListEmptyComponent={<Text style={{ color: '#666' }}>No drivers found</Text>}
      />
      <View style={{ height: 16 }} />
      <Text style={{ fontSize: 16, marginBottom: 8 }}>Recent rides</Text>
      <FlatList
        data={rides}
        keyExtractor={(r) => r.id?.toString() || Math.random().toString()}
        renderItem={({ item }) => <DriverCard driver={{ name: item.driverName || 'Your ride', vehicle: item.vehicle }} onPress={() => navigation.navigate('RideDetails', { rideId: item.id })} />}
        ListEmptyComponent={<Text style={{ color: '#666' }}>No rides yet</Text>}
      />
    </View>
  );
}
