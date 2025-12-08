import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

export default function DriverCard({ driver = {}, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={{ flexDirection: 'row', padding: 12, borderRadius: 10, backgroundColor: '#fff', alignItems: 'center', marginVertical: 6 }}>
      <Image source={ driver.avatar ? { uri: driver.avatar } : require('../assets/avatar-placeholder.png') } style={{ width: 56, height: 56, borderRadius: 28, marginRight: 12 }} />
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 16, fontWeight: '600' }}>{driver.name || 'Unknown'}</Text>
        <Text style={{ color: '#666', marginTop: 4 }}>{driver.vehicle || '-'}</Text>
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <Text style={{ fontWeight: '700' }}>{driver.rating ? driver.rating.toFixed(1) : '—'}</Text>
      </View>
    </TouchableOpacity>
  );
}
