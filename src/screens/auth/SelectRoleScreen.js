import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/Button';

export default function SelectRoleScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.emoji}>🚗</Text>
          <Text style={styles.title}>Welcome to LetsRide</Text>
          <Text style={styles.subtitle}>Choose your role to continue</Text>
        </View>

        <View style={styles.roleContainer}>
          <TouchableOpacity
            style={styles.roleCard}
            onPress={() => navigation.navigate('Login', { as: 'passenger' })}
            activeOpacity={0.7}
          >
            <Text style={styles.roleEmoji}>👤</Text>
            <Text style={styles.roleTitle}>Passenger</Text>
            <Text style={styles.roleDescription}>Book rides and travel comfortably</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.roleCard}
            onPress={() => navigation.navigate('Login', { as: 'driver' })}
            activeOpacity={0.7}
          >
            <Text style={styles.roleEmoji}>🚗</Text>
            <Text style={styles.roleTitle}>Driver</Text>
            <Text style={styles.roleDescription}>Accept rides and earn money</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>New to LetsRide? </Text>
          <Button
            title="Create Account"
            variant="ghost"
            onPress={() => navigation.navigate('SignUp')}
            size="small"
          />
        </View>
      </View>
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
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  emoji: {
    fontSize: 72,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#c9d1d9',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#8b949e',
    textAlign: 'center',
  },
  roleContainer: {
    gap: 16,
    marginBottom: 32,
  },
  roleCard: {
    backgroundColor: '#161b22',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#30363d',
  },
  roleEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  roleTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#c9d1d9',
    marginBottom: 8,
  },
  roleDescription: {
    fontSize: 14,
    color: '#8b949e',
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    color: '#8b949e',
    fontSize: 14,
  },
});
