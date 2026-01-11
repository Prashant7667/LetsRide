import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { formatCurrency, shortText } from '../utils/formatters';

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
    REQUESTED: 'Requested',
    ACCEPTED: 'Accepted',
    IN_PROGRESS: 'In Progress',
    COMPLETED: 'Completed',
    CANCELLED: 'Cancelled',
    REJECTED: 'Rejected',
  };
  return statusMap[status] || status;
};

export default function RideCard({ ride = {}, onPress }) {
  const statusColor = getStatusColor(ride.status);
  
  return (
    <TouchableOpacity 
      onPress={onPress} 
      style={styles.card}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <View style={styles.statusContainer}>
          <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
          <Text style={[styles.statusText, { color: statusColor }]}>
            {getStatusText(ride.status)}
          </Text>
        </View>
        <Text style={styles.fare}>{formatCurrency(ride.fare)}</Text>
      </View>
      
      {ride.pickupLocation && (
        <View style={styles.locationRow}>
          <Text style={styles.locationLabel}>📍</Text>
          <Text style={styles.locationText}>{shortText(ride.pickupLocation, 35)}</Text>
        </View>
      )}
      
      {ride.dropLocation && (
        <View style={styles.locationRow}>
          <Text style={styles.locationLabel}>🎯</Text>
          <Text style={styles.locationText}>{shortText(ride.dropLocation, 35)}</Text>
        </View>
      )}
      
      {ride.driver && (
        <View style={styles.driverRow}>
          <Text style={styles.driverLabel}>Driver:</Text>
          <Text style={styles.driverName}>{ride.driver.name || 'Not assigned'}</Text>
        </View>
      )}
      
      {ride.createdAt && (
        <Text style={styles.date}>
          {new Date(ride.createdAt).toLocaleDateString()}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#161b22',
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#30363d',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  fare: {
    fontSize: 18,
    fontWeight: '700',
    color: '#c9d1d9',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationLabel: {
    fontSize: 14,
    marginRight: 8,
  },
  locationText: {
    fontSize: 14,
    color: '#8b949e',
    flex: 1,
  },
  driverRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#30363d',
  },
  driverLabel: {
    fontSize: 13,
    color: '#8b949e',
    marginRight: 6,
  },
  driverName: {
    fontSize: 13,
    color: '#c9d1d9',
    fontWeight: '500',
  },
  date: {
    fontSize: 12,
    color: '#6e7681',
    marginTop: 8,
  },
});
