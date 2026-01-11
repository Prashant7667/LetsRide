import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '../context/AuthContext';
import HomeScreen from '../screens/home/HomeScreen';
import DriverDashboardScreen from '../screens/driver/DriverDashboardScreen';
import QuickRideScreen from '../screens/ride/QuickRideScreen';
import RideDetailsScreen from '../screens/ride/RideDetailsScreen';
import RideHistoryScreen from '../screens/ride/RideHistoryScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import RideRequestsScreen from '../screens/driver/RideRequestsScreen';

const Stack = createNativeStackNavigator();

export default function AppStack() {
  const { role } = useContext(AuthContext);
  const isDriver = role === 'DRIVER';

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#161b22',
        },
        headerTintColor: '#c9d1d9',
        headerTitleStyle: {
          fontWeight: '600',
        },
      }}
    >
      {isDriver ? (
        <>
          <Stack.Screen 
            name="DriverDashboard" 
            component={DriverDashboardScreen}
            options={{ title: 'Driver Dashboard' }}
          />
          <Stack.Screen 
            name="RideRequests" 
            component={RideRequestsScreen}
            options={{ title: 'Ride Requests' }}
          />
        </>
      ) : (
        <Stack.Screen 
          name="HomeScreen" 
          component={HomeScreen}
          options={{ headerShown: false }}
        />
      )}
      <Stack.Screen 
        name="QuickRide" 
        component={QuickRideScreen}
        options={{ title: 'Book Ride' }}
      />
      <Stack.Screen 
        name="RideDetails" 
        component={RideDetailsScreen}
        options={{ title: 'Ride Details' }}
      />
      <Stack.Screen 
        name="RideHistory" 
        component={RideHistoryScreen}
        options={{ title: 'Ride History' }}
      />
      <Stack.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ title: 'Profile' }}
      />
    </Stack.Navigator>
  );
}
