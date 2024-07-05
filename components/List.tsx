import React from 'react';

import {View, Text, StyleSheet, FlatList} from 'react-native';
import ListItem from '@/components/ListItem';
import {LISTS} from '@/data';

export default function ListSection() {
  return (
    <View>
      <Text style={style.listSectionHeading}>Your lists</Text>
      <FlatList
        data={LISTS}
        horizontal={true}
        renderItem={({item, index}) => <ListItem item={item} index={index} />}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={style.listContainer}
      />
    </View>
  );
}

const style = StyleSheet.create({
  listSectionHeading: {
    fontSize: 40,
    marginTop: 25,

    marginLeft: 10,
  },
  listContainer: {
    marginTop: 20,
  },
});
