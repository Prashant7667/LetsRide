import React, { useState, useContext, useEffect } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { AuthContext } from '../../context/AuthContext';

export default function LoginScreen({ route, navigation }) {
  const { as } = route.params || {};
  const roleParam = as || 'passenger';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);

  useEffect(() => {
    navigation.setOptions({ title: `Login as ${roleParam}` });
  }, [navigation, roleParam]);

  const onSubmit = async () => {
    setLoading(true);
    try {
      await login({ email, password, as: roleParam });
    } catch (e) {
      Alert.alert('Login failed', e?.response?.data?.message || e.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
      <Text style={{ fontSize: 22, marginBottom: 20 }}>Login as {roleParam}</Text>
      <Input placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <View style={{ height: 12 }} />
      <Input placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <View style={{ height: 16 }} />
      <Button title={loading ? 'Signing in...' : 'Sign in'} onPress={onSubmit} disabled={loading} />
      <View style={{ height: 10 }} />
      <Button title="Don't have an account? Sign up" variant="ghost" onPress={() => navigation.navigate('SignUp', { as: roleParam })} />
    </KeyboardAvoidingView>
  );
}
