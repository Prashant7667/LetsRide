import React, { useState, useContext, useEffect } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { AuthContext } from '../../context/AuthContext';

export default function SignUpScreen({ route, navigation }) {
  const { as } = route.params || {};
  const roleParam = as || 'passenger';
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useContext(AuthContext);

  useEffect(() => {
    navigation.setOptions({ title: `Sign up as ${roleParam}` });
  }, [navigation, roleParam]);

  const onSubmit = async () => {
    setLoading(true);
    try {
      const payload = { name, email, password, phone };
      await register({ payload, as: roleParam });
    } catch (e) {
      Alert.alert('Sign up failed', e?.response?.data?.message || e.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
      <Text style={{ fontSize: 22, marginBottom: 20 }}>Create account ({roleParam})</Text>
      <Input placeholder="Full name" value={name} onChangeText={setName} />
      <View style={{ height: 12 }} />
      <Input placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <View style={{ height: 12 }} />
      <Input placeholder="Phone (optional)" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
      <View style={{ height: 12 }} />
      <Input placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <View style={{ height: 16 }} />
      <Button title={loading ? 'Creating...' : 'Create account'} onPress={onSubmit} disabled={loading} />
      <View style={{ height: 10 }} />
      <Button title="Already have an account? Login" variant="ghost" onPress={() => navigation.navigate('Login', { as: roleParam })} />
    </KeyboardAvoidingView>
  );
}
