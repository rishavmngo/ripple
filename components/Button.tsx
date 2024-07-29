import colors from '@/utils/Colors';
import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
type ButtonType = 'Danger' | 'Warning' | '';
type buttonProps = {
  text: string;
  onPress: () => void;
  type?: ButtonType;
  style?: any;
};

function getStyle(type: ButtonType) {
  switch (type) {
    case 'Danger':
      return {bgColor: colors.tomato, color: colors.creamWhite};
    case 'Warning':
      return {bgColor: '', color: ''};
    default:
      return {bgColor: colors.littleBlack, color: colors.creamWhite};
  }
}
export default function Button({
  text,
  type = '',
  onPress,
  style,
  ...props
}: buttonProps) {
  const sty = getStyle(type);
  return (
    <TouchableOpacity
      onPress={onPress}
      {...props}
      style={{
        backgroundColor: sty.bgColor,
        ...style,
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
