import React, { useState, useContext, useRef, useEffect } from 'react';
import { View, Text, ScrollView, Alert, Animated, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { RideContext } from '../../context/RideContext';
import { isRequired } from '../../utils/validators';

export default function QuickRideScreen({ navigation }) {
  const { createRide } = useContext(RideContext);
  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');
  const [fare, setFare] = useState('150');
  const [searching, setSearching] = useState(false);
  const [errors, setErrors] = useState({});

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!isRequired(pickup)) {
      newErrors.pickup = 'Pickup location is required';
    }
    if (!isRequired(drop)) {
      newErrors.drop = 'Drop location is required';
    }
    if (!isRequired(fare) || isNaN(Number(fare)) || Number(fare) <= 0) {
      newErrors.fare = 'Please enter a valid fare amount';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onRequestQuickRide = async () => {
    if (!validate()) {
      return;
    }

    try {
      setSearching(true);
      const ride = await createRide({
        pickup,
        drop,
        fare: Number(fare),
        pickupLocation: pickup,
        dropLocation: drop,
      });
      Alert.alert('Success', 'Ride requested! Looking for drivers...');
      navigation.navigate('RideDetails', { rideId: ride.id });
    } catch (e) {
      Alert.alert('Error', e?.response?.data?.message || 'Failed to create ride. Please try again.');
    } finally {
      setSearching(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.title}>Book a Ride 🚕</Text>
            <Text style={styles.subtitle}>Enter your ride details</Text>

            <View style={styles.form}>
              <Input
                label="Pickup Location"
                placeholder="Enter pickup address"
                value={pickup}
                onChangeText={(text) => {
                  setPickup(text);
                  if (errors.pickup) setErrors({ ...errors, pickup: null });
                }}
                error={errors.pickup}
                autoCapitalize="words"
              />

              <Input
                label="Drop Location"
                placeholder="Enter destination address"
                value={drop}
                onChangeText={(text) => {
                  setDrop(text);
                  if (errors.drop) setErrors({ ...errors, drop: null });
                }}
                error={errors.drop}
                autoCapitalize="words"
              />

              <Input
                label="Fare (₹)"
                placeholder="Enter fare amount"
                keyboardType="numeric"
                value={fare}
                onChangeText={(text) => {
                  setFare(text);
                  if (errors.fare) setErrors({ ...errors, fare: null });
                }}
                error={errors.fare}
              />
            </View>

            <Button
              title={searching ? 'Requesting...' : 'Request Ride'}
              loading={searching}
              onPress={onRequestQuickRide}
              style={styles.submitButton}
              size="large"
            />
          </ScrollView>
        </Animated.View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d1117',
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#c9d1d9',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#8b949e',
    marginBottom: 32,
  },
  form: {
    marginBottom: 24,
  },
  submitButton: {
    marginTop: 8,
  },
});
