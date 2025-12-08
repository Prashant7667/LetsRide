import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';

export default function Button({ title, onPress, disabled, variant, style, loading }) {
  const isGhost = variant === 'ghost';
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        {
          paddingVertical: 12,
          paddingHorizontal: 16,
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: disabled || loading ? 0.6 : 1,
          backgroundColor: isGhost ? 'transparent' : '#1f6feb'
        },
        style
      ]}
    >
      {loading ? <ActivityIndicator /> : <Text style={{ color: isGhost ? '#1f6feb' : '#fff', fontSize: 16 }}>{title}</Text>}
    </TouchableOpacity>
  );
}
