import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Alert, ScrollView, StyleSheet, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/Button';
import RideCard from '../../components/RideCard';
import DriverCard from '../../components/DriverCard';
import { RideContext } from '../../context/RideContext';
import { AuthContext } from '../../context/AuthContext';
import { formatCurrency } from '../../utils/formatters';

const getStatusColor = (status) => {
  const statusColors = {
    REQUESTED: '#f79009',
    ACCEPTED: '#1f6feb',
    IN_PROGRESS: '#1f6feb',
    COMPLETED: '#238636',
    CANCELLED: '#da3633',
    REJECTED: '#da3633',
  };
  return statusColors[status] || '#8b949e';
};

const getStatusText = (status) => {
  const statusMap = {
    REQUESTED: 'Waiting for driver...',
    ACCEPTED: 'Driver on the way',
    IN_PROGRESS: 'Ride in progress',
    COMPLETED: 'Ride completed',
    CANCELLED: 'Ride cancelled',
    REJECTED: 'Ride rejected',
  };
  return statusMap[status] || status;
};

export default function RideDetailsScreen({ route, navigation }) {
  const { rideId } = route.params;
  const { userId, role } = useContext(AuthContext);
  const { currentRide, refreshRide, cancelRide } = useContext(RideContext);
  const [ride, setRide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadRide();
    const interval = setInterval(() => {
      refreshRideData();
    }, 5000); // Refresh every 5 seconds

    return () => clearInterval(interval);
  }, [rideId]);

  const loadRide = async () => {
    setLoading(true);
    try {
      const updatedRide = await refreshRide(rideId);
      setRide(updatedRide);
    } catch (e) {
      Alert.alert('Error', 'Failed to load ride details');
    } finally {
      setLoading(false);
    }
  };

  const refreshRideData = async () => {
    try {
      const updatedRide = await refreshRide(rideId);
      setRide(updatedRide);
    } catch (e) {
      // Silent refresh failure
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await refreshRideData();
    setRefreshing(false);
  };

  const handleCancel = () => {
    Alert.alert(
      'Cancel Ride',
      'Are you sure you want to cancel this ride?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes, Cancel',
          style: 'destructive',
          onPress: async () => {
            try {
              await cancelRide(rideId, ride?.driver?.id);
              Alert.alert('Success', 'Ride cancelled');
              navigation.goBack();
            } catch (e) {
              Alert.alert('Error', e?.response?.data?.message || 'Failed to cancel ride');
            }
          },
        },
      ]
    );
  };

  if (loading && !ride) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading ride details...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!ride) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.errorText}>Ride not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const statusColor = getStatusColor(ride.status);
  const isPassenger = role === 'PASSENGER';
  const canCancel = isPassenger && (ride.status === 'REQUESTED' || ride.status === 'ACCEPTED');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor="#1f6feb" />
        }
      >
        <View style={styles.statusBanner}>
          <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
          <Text style={[styles.statusText, { color: statusColor }]}>
            {getStatusText(ride.status)}
          </Text>
        </View>

        <RideCard ride={ride} />

        {ride.driver && (
          <View style={styles.driverSection}>
            <Text style={styles.sectionTitle}>Driver Details</Text>
            <DriverCard driver={ride.driver} showRating={true} />
          </View>
        )}

        <View style={styles.detailsSection}>
          <Text style={styles.sectionTitle}>Ride Details</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Fare</Text>
            <Text style={styles.detailValue}>{formatCurrency(ride.fare)}</Text>
          </View>
          {ride.pickupLocation && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Pickup</Text>
              <Text style={styles.detailValue}>{ride.pickupLocation}</Text>
            </View>
          )}
          {ride.dropLocation && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Destination</Text>
              <Text style={styles.detailValue}>{ride.dropLocation}</Text>
            </View>
          )}
          {ride.createdAt && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Requested</Text>
              <Text style={styles.detailValue}>
                {new Date(ride.createdAt).toLocaleString()}
              </Text>
            </View>
          )}
        </View>

        {canCancel && (
          <Button
            title="Cancel Ride"
            variant="danger"
            onPress={handleCancel}
            style={styles.cancelButton}
          />
        )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#8b949e',
    fontSize: 16,
  },
  errorText: {
    color: '#da3633',
    fontSize: 16,
  },
  statusBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#161b22',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#30363d',
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
  },
  driverSection: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#c9d1d9',
    marginBottom: 12,
  },
  detailsSection: {
    backgroundColor: '#161b22',
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#30363d',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#30363d',
  },
  detailLabel: {
    fontSize: 14,
    color: '#8b949e',
    flex: 1,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#c9d1d9',
    flex: 2,
    textAlign: 'right',
  },
  cancelButton: {
    marginTop: 24,
  },
});
