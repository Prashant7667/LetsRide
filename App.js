import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AuthProvider from './src/context/AuthContext';
import RideProvider from './src/context/RideContext';
import RootNavigation from './src/navigation'; 

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <RideProvider>
          <RootNavigation />
        </RideProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
