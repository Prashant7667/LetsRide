import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function DriverCard({ driver = {}, onPress, showRating = true }) {
  return (
    <TouchableOpacity 
      onPress={onPress} 
      style={styles.card}
      activeOpacity={0.7}
    >
      <Image 
        source={driver.avatar ? { uri: driver.avatar } : require('../assets/driver.jpg')} 
        style={styles.avatar} 
      />
      <View style={styles.info}>
        <Text style={styles.name}>{driver.name || 'Unknown Driver'}</Text>
        {driver.vehicle && (
          <Text style={styles.vehicle}>{driver.vehicle}</Text>
        )}
        {driver.phone && (
          <Text style={styles.phone}>{driver.phone}</Text>
        )}
      </View>
      {showRating && (
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>⭐</Text>
          <Text style={styles.ratingValue}>
            {driver.rating ? driver.rating.toFixed(1) : 'N/A'}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#161b22',
    alignItems: 'center',
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#30363d',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
    backgroundColor: '#30363d',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#c9d1d9',
    marginBottom: 4,
  },
  vehicle: {
    fontSize: 14,
    color: '#8b949e',
    marginBottom: 2,
  },
  phone: {
    fontSize: 12,
    color: '#6e7681',
  },
  ratingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 12,
  },
  rating: {
    fontSize: 20,
    marginBottom: 4,
  },
  ratingValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#c9d1d9',
  },
});
