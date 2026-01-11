import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/Button';
import { AuthContext } from '../../context/AuthContext';

export default function ProfileScreen({ navigation }) {
  const { userId, role, logout } = useContext(AuthContext);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            setLoggingOut(true);
            try {
              await logout();
            } catch (e) {
              Alert.alert('Error', 'Failed to logout');
            } finally {
              setLoggingOut(false);
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>
              {role === 'DRIVER' ? '🚗' : '👤'}
            </Text>
          </View>
          <Text style={styles.role}>{role === 'DRIVER' ? 'Driver' : 'Passenger'}</Text>
        </View>

        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>User ID</Text>
            <Text style={styles.infoValue}>{userId || 'N/A'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Role</Text>
            <Text style={styles.infoValue}>{role || 'N/A'}</Text>
          </View>
        </View>

        <View style={styles.actionsSection}>
          <Button
            title="Logout"
            onPress={handleLogout}
            loading={loggingOut}
            variant="danger"
            style={styles.logoutButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d1117',
  },
  content: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
    paddingTop: 20,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#161b22',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#30363d',
  },
  avatarText: {
    fontSize: 48,
  },
  role: {
    fontSize: 20,
    fontWeight: '600',
    color: '#c9d1d9',
  },
  infoSection: {
    backgroundColor: '#161b22',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#30363d',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#30363d',
  },
  infoLabel: {
    fontSize: 14,
    color: '#8b949e',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#c9d1d9',
  },
  actionsSection: {
    marginTop: 8,
  },
  logoutButton: {
    marginTop: 8,
  },
});
