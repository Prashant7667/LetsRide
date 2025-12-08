import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import QuickRideScreen from '../screens/ride/QuickRideScreen';
import RideDetailsScreen from '../screens/ride/RideDetailsScreen';
import RideHistoryScreen from '../screens/ride/RideHistoryScreen';

const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="QuickRide" component={QuickRideScreen} options={{ title: 'Quick Ride' }} />
      <Stack.Screen name="RideDetails" component={RideDetailsScreen} options={{ title: 'Ride Details' }} />
      <Stack.Screen name="RideHistory" component={RideHistoryScreen} options={{ title: 'Ride History' }} />
    </Stack.Navigator>
  );
}
