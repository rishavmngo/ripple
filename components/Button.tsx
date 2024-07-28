import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
type ButtonType = 'Danger' | 'Warning' | '';
type buttonProps = {
  text: string;
  onPress: () => void;
  type?: ButtonType;
};

function getStyle(type: ButtonType) {
  switch (type) {
    case 'Danger':
      return {bgColor: '#EF5A6F', color: '#F8EDED'};
    case 'Warning':
      return {bgColor: '', color: ''};
    default:
      return {bgColor: '#363533', color: '#F8EDED'};
  }
}
export default function Button({
  text,
  type = '',
  onPress,
  ...props
}: buttonProps) {
  const sty = getStyle(type);
  return (
    <TouchableOpacity
      onPress={onPress}
      {...props}
      style={{
        backgroundColor: sty.bgColor,
        ...styles.button,
      }}>
      <Text
        style={{
          color: sty.color,
          ...styles.text,
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
  text: {
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
});
