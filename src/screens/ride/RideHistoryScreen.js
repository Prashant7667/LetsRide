import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, Text, FlatList, Animated, StyleSheet, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import RideCard from '../../components/RideCard';
import { RideContext } from '../../context/RideContext';

export default function RideHistoryScreen({ navigation }) {
  const { rides, loading, fetchRideHistory } = useContext(RideContext);
  const [refreshing, setRefreshing] = useState(false);
  const slideAnim = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    fetchRideHistory();
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true
    }).start();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchRideHistory();
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Animated.View
        style={[
          styles.content,
          {
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Ride History</Text>
          <Text style={styles.subtitle}>{rides.length} {rides.length === 1 ? 'ride' : 'rides'}</Text>
        </View>

        <FlatList
          data={rides}
          keyExtractor={(r) => r.id.toString()}
          renderItem={({ item }) => (
            <RideCard
              ride={item}
              onPress={() => navigation.navigate('RideDetails', { rideId: item.id })}
            />
          )}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyEmoji}>🚕</Text>
              <Text style={styles.emptyText}>
                {loading ? 'Loading rides...' : 'No rides yet'}
              </Text>
              <Text style={styles.emptySubtext}>
                {loading ? '' : 'Your ride history will appear here'}
              </Text>
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
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#c9d1d9',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#8b949e',
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 60,
    marginTop: 40,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#c9d1d9',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#8b949e',
    textAlign: 'center',
  },
});
