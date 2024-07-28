import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome6';
type ButtonType = 'Danger' | 'Warning' | '';
type buttonProps = {
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
export default function ButtonIcon({
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
      <Icon name="plus" style={{color: 'white'}} size={20} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
});
