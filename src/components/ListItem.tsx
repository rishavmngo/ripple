import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function ListItem({item}) {
  console.log('herell', item);
  return (
    <View style={style.view}>
      <Text style={style.titleText}>{item.title}</Text>
    </View>
  );
}

const style = StyleSheet.create({
  view: {
    backgroundColor: '#010101',
    height: 200,
    width: 200,
    margin: 5,
    padding: 5,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 30,
  },
});
