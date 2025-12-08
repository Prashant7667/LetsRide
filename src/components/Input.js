import React from 'react';
import { TextInput, View, Text } from 'react-native';

export default function Input({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType,
  autoCapitalize = 'none',
  style,
  label,
  ...rest
}) {
  return (
    <View style={{ marginBottom: 4 }}>
      {label ? <Text style={{ marginBottom: 6 }}>{label}</Text> : null}
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        style={[
          {
            borderWidth: 1,
            borderColor: '#e6e6e6',
            paddingVertical: 10,
            paddingHorizontal: 12,
            borderRadius: 8,
            fontSize: 16,
            backgroundColor: '#fff'
          },
          style
        ]}
        {...rest}
      />
    </View>
  );
}
