import React from 'react';
import { View, Text } from 'react-native';
import Button from '../../components/Button';

export default function SelectRoleScreen({ navigation }) {
  return (
    <View style={{ flex: 1, padding: 24, justifyContent: 'center' }}>
      <Text style={{ fontSize: 28, marginBottom: 24 }}>Welcome to LetsRide</Text>
      <Button title="I'm a Passenger" onPress={() => navigation.navigate('Login', { as: 'passenger' })} />
      <View style={{ height: 12 }} />
      <Button title="I'm a Driver" onPress={() => navigation.navigate('Login', { as: 'driver' })} />
      <View style={{ height: 20 }} />
      <Button title="Create account" onPress={() => navigation.navigate('SignUp')} variant="ghost" />
    </View>
  );
}
