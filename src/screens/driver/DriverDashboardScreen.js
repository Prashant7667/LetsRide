import React, { useContext, useEffect, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/Button';
import RideCard from '../../components/RideCard';
import { AuthContext } from '../../context/AuthContext';
import { RideContext } from '../../context/RideContext';
import * as rideApi from '../../api/rideApi';

export default function DriverDashboardScreen({ navigation }) {
  const { userId, logout } = useContext(AuthContext);
  const { currentRide, loading, fetchAvailableRides, refreshRide } = useContext(RideContext);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentRide) {
        refreshRide(currentRide.id);
      }
    }, 5000); // Refresh every 5 seconds

    return () => clearInterval(interval);
  }, [currentRide]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchAvailableRides();
    if (currentRide) {
      await refreshRide(currentRide.id);
    }
    setRefreshing(false);
  };

  const handleStartRide = async () => {
    try {
      await rideApi.StartRide(currentRide.id);
      await refreshRide(currentRide.id);
      Alert.alert('Success', 'Ride started!');
    } catch (e) {
      Alert.alert('Error', e?.response?.data?.message || 'Failed to start ride');
    }
  };

  const handleCompleteRide = async () => {
    try {
      await rideApi.CompleteRide(currentRide.id);
      Alert.alert('Success', 'Ride completed!');
    } catch (e) {
      Alert.alert('Error', e?.response?.data?.message || 'Failed to complete ride');
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Driver Dashboard</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Text style={styles.profileButton}>👤</Text>
          </TouchableOpacity>
        </View>

        {currentRide ? (
          <View style={styles.activeRideContainer}>
            <Text style={styles.sectionTitle}>Active Ride</Text>
            <RideCard ride={currentRide} onPress={() => navigation.navigate('RideDetails', { rideId: currentRide.id })} />
            
            {currentRide.status === 'ACCEPTED' && (
              <Button
                title="Start Ride"
                onPress={handleStartRide}
                style={styles.actionButton}
              />
            )}
            
            {currentRide.status === 'IN_PROGRESS' && (
              <Button
                title="Complete Ride"
                onPress={handleCompleteRide}
                style={styles.actionButton}
                variant="danger"
              />
            )}
          </View>
        ) : (
          <View style={styles.noRideContainer}>
            <Text style={styles.noRideText}>🚗</Text>
            <Text style={styles.noRideTitle}>No Active Ride</Text>
            <Text style={styles.noRideSubtitle}>Check for new ride requests</Text>
          </View>
        )}

        <View style={styles.actionsContainer}>
          <Button
            title="View Ride Requests"
            onPress={() => navigation.navigate('RideRequests')}
            style={styles.primaryButton}
          />
          <Button
            title="Ride History"
            onPress={() => navigation.navigate('RideHistory')}
            variant="ghost"
            style={styles.secondaryButton}
          />
        </View>

        <Button
          title="Refresh"
          onPress={handleRefresh}
          loading={refreshing}
          variant="ghost"
          size="small"
          style={styles.refreshButton}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d1117',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#c9d1d9',
  },
  profileButton: {
    fontSize: 28,
  },
  activeRideContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#c9d1d9',
    marginBottom: 12,
  },
  actionButton: {
    marginTop: 16,
  },
  noRideContainer: {
    alignItems: 'center',
    padding: 40,
    marginBottom: 24,
    backgroundColor: '#161b22',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#30363d',
  },
  noRideText: {
    fontSize: 64,
    marginBottom: 16,
  },
  noRideTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#c9d1d9',
    marginBottom: 8,
  },
  noRideSubtitle: {
    fontSize: 14,
    color: '#8b949e',
  },
  actionsContainer: {
    marginTop: 8,
  },
  primaryButton: {
    marginBottom: 12,
  },
  secondaryButton: {
    marginBottom: 12,
  },
  refreshButton: {
    marginTop: 8,
  },
});
