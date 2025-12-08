import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function RideCard({ ride = {}, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={{ padding: 12, borderRadius: 10, backgroundColor: '#fff', marginVertical: 6 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ fontWeight: '700' }}>{ride.status || 'UNKNOWN'}</Text>
        <Text>{ride.fare ? `₹${ride.fare}` : ''}</Text>
      </View>
      <View style={{ marginTop: 8 }}>
        <Text style={{ color: '#444' }}>{ride.pickup || 'Pickup'}</Text>
        <Text style={{ color: '#444', marginTop: 4 }}>{ride.drop || 'Drop'}</Text>
      </View>
    </TouchableOpacity>
  );
}
