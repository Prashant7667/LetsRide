import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import RideCard from '../../components/RideCard';
import Button from '../../components/Button';
import { RideContext } from '../../context/RideContext';
import { AuthContext } from '../../context/AuthContext';

export default function RideRequestsScreen({ navigation }) {
  const { userId } = useContext(AuthContext);
  const { availableRides, loading, fetchAvailableRides, acceptRide, rejectRide } = useContext(RideContext);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchAvailableRides();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchAvailableRides();
    setRefreshing(false);
  };

  const handleAccept = async (rideId) => {
    try {
      Alert.alert(
        'Accept Ride',
        'Are you sure you want to accept this ride?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Accept',
            onPress: async () => {
              try {
                await acceptRide(rideId);
                Alert.alert('Success', 'Ride accepted!');
                navigation.navigate('DriverDashboard');
              } catch (e) {
                Alert.alert('Error', e?.response?.data?.message || 'Failed to accept ride');
              }
            },
          },
        ]
      );
    } catch (e) {
      Alert.alert('Error', 'Failed to accept ride');
    }
  };

  const handleReject = async (rideId) => {
    try {
      Alert.alert(
        'Reject Ride',
        'Are you sure you want to reject this ride?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Reject',
            style: 'destructive',
            onPress: async () => {
              try {
                await rejectRide(rideId);
                Alert.alert('Success', 'Ride rejected');
              } catch (e) {
                Alert.alert('Error', e?.response?.data?.message || 'Failed to reject ride');
              }
            },
          },
        ]
      );
    } catch (e) {
      Alert.alert('Error', 'Failed to reject ride');
    }
  };

  const renderRideItem = ({ item }) => (
    <View style={styles.rideItem}>
      <RideCard 
        ride={item} 
        onPress={() => navigation.navigate('RideDetails', { rideId: item.id })} 
      />
      <View style={styles.actions}>
        <Button
          title="Accept"
          onPress={() => handleAccept(item.id)}
          style={styles.acceptButton}
          size="small"
        />
        <Button
          title="Reject"
          onPress={() => handleReject(item.id)}
          variant="danger"
          size="small"
          style={styles.rejectButton}
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Available Rides</Text>
        <Text style={styles.subtitle}>{availableRides.length} requests</Text>
      </View>

      <FlatList
        data={availableRides}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderRideItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>🚕</Text>
            <Text style={styles.emptyTitle}>No ride requests</Text>
            <Text style={styles.emptySubtitle}>Check back later for new requests</Text>
          </View>
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing || loading}
            onRefresh={handleRefresh}
            tintColor="#1f6feb"
          />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d1117',
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#30363d',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#c9d1d9',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#8b949e',
  },
  listContent: {
    padding: 16,
  },
  rideItem: {
    marginBottom: 16,
  },
  actions: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 12,
  },
  acceptButton: {
    flex: 1,
  },
  rejectButton: {
    flex: 1,
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 60,
    marginTop: 40,
  },
  emptyText: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#c9d1d9',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#8b949e',
    textAlign: 'center',
  },
});
