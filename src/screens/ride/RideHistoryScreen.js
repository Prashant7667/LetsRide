import React, { useContext } from 'react';
import { View, Text, FlatList } from 'react-native';
import RideCard from '../../components/RideCard';
import { RideContext } from '../../context/RideContext';

export default function RideHistoryScreen({ navigation }) {
  const { rides, loading } = useContext(RideContext);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, marginBottom: 12 }}>Ride History</Text>
      <FlatList
        data={rides}
        keyExtractor={(r) => r.id?.toString() || Math.random().toString()}
        renderItem={({ item }) => <RideCard ride={item} onPress={() => navigation.navigate('RideDetails', { rideId: item.id })} />}
        ListEmptyComponent={<Text style={{ color: '#666' }}>{loading ? 'Loading...' : 'No rides yet'}</Text>}
      />
    </View>
  );
}
