import React, { useEffect, useRef, useContext } from 'react';
import { View, Text, Animated, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/Button';
import { RideContext } from '../../context/RideContext';
import RideCard from '../../components/RideCard';

export default function HomeScreen({ navigation }) {
  const { currentRide } = useContext(RideContext);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true
      })
    ]).start();
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome 👋</Text>
            <Text style={styles.subtitle}>Where do you want to go today?</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Text style={styles.profileIcon}>👤</Text>
          </TouchableOpacity>
        </View>

        {currentRide && (
          <View style={styles.activeRideSection}>
            <Text style={styles.sectionTitle}>Active Ride</Text>
            <RideCard
              ride={currentRide}
              onPress={() => navigation.navigate('RideDetails', { rideId: currentRide.id })}
            />
          </View>
        )}

        <View style={styles.actionsContainer}>
          <View style={styles.card}>
            <Text style={styles.cardIcon}>🚕</Text>
            <Text style={styles.cardTitle}>Quick Ride</Text>
            <Text style={styles.cardDescription}>
              Book an instant ride nearby
            </Text>
            <Button
              title="Book Now"
              onPress={() => navigation.navigate('QuickRide')}
              style={styles.cardButton}
            />
          </View>

          <View style={styles.card}>
            <Text style={styles.cardIcon}>📜</Text>
            <Text style={styles.cardTitle}>Ride History</Text>
            <Text style={styles.cardDescription}>
              View your past rides and payments
            </Text>
            <Button
              title="View History"
              variant="ghost"
              onPress={() => navigation.navigate('RideHistory')}
              style={styles.cardButton}
            />
          </View>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d1117',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 32,
  },
  greeting: {
    fontSize: 32,
    fontWeight: '700',
    color: '#c9d1d9',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#8b949e',
  },
  profileIcon: {
    fontSize: 28,
  },
  activeRideSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#c9d1d9',
    marginBottom: 12,
  },
  actionsContainer: {
    gap: 16,
  },
  card: {
    backgroundColor: '#161b22',
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#30363d',
  },
  cardIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#c9d1d9',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#8b949e',
    marginBottom: 20,
  },
  cardButton: {
    marginTop: 4,
  },
});
