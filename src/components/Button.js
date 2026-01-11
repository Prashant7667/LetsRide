import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';

export default function Button({ title, onPress, disabled, variant, style, loading, size = 'medium' }) {
  const isGhost = variant === 'ghost';
  const isDanger = variant === 'danger';
  const isSmall = size === 'small';
  const isLarge = size === 'large';

  const buttonStyle = [
    styles.button,
    isSmall && styles.buttonSmall,
    isLarge && styles.buttonLarge,
    isGhost && styles.buttonGhost,
    isDanger && styles.buttonDanger,
    (disabled || loading) && styles.buttonDisabled,
    style
  ];

  const textStyle = [
    styles.text,
    isSmall && styles.textSmall,
    isLarge && styles.textLarge,
    isGhost && styles.textGhost,
    isDanger && styles.textDanger
  ];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={buttonStyle}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={isGhost || isDanger ? '#1f6feb' : '#fff'} size={isSmall ? 'small' : 'small'} />
      ) : (
        <Text style={textStyle}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1f6feb',
    shadowColor: '#1f6feb',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonSmall: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonLarge: {
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 14,
  },
  buttonGhost: {
    backgroundColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0,
    borderWidth: 1.5,
    borderColor: '#1f6feb',
  },
  buttonDanger: {
    backgroundColor: '#da3633',
    shadowColor: '#da3633',
  },
  buttonDisabled: {
    opacity: 0.5,
    shadowOpacity: 0,
    elevation: 0,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  textSmall: {
    fontSize: 14,
  },
  textLarge: {
    fontSize: 18,
  },
  textGhost: {
    color: '#1f6feb',
  },
  textDanger: {
    color: '#fff',
  },
});
