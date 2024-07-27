import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
type buttonProps = {
  text: string;
  bgColor?: string;
  color?: string;
  onPress: () => void;
};
export default function Button({text, bgColor, color, onPress}: buttonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: `${bgColor ? bgColor : '#F8EDED'}`,
        ...styles.button,
      }}>
      <Text
        style={{
          color: `${color ? color : 'white'}`,
          fontWeight: 'bold',
          textTransform: 'capitalize',
        }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    margin: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignItems: 'center',
  },
});
