import React from 'react';
import { View, Text } from 'react-native';
import Button from '../../components/Button';

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, padding: 24, justifyContent: 'center' }}>
      <Text style={{ fontSize: 26, marginBottom: 24 }}>Welcome 👋</Text>

      <Button
        title="Quick Ride"
        onPress={() => navigation.navigate('QuickRide')}
      />

      <View style={{ height: 12 }} />

      <Button
        title="Ride History"
        variant="ghost"
        onPress={() => navigation.navigate('RideHistory')}
      />
    </View>
  );
}
