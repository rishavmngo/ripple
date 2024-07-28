import React, {useEffect, useState} from 'react';

import {View, Text, StyleSheet, FlatList} from 'react-native';
import ListItem from '@/components/ListItem';
import {TListItem} from '@/model';
import db from '@/db/db';

export default function ListSection() {
  const [items, setItems] = useState<TListItem[]>([]);

  useEffect(() => {
    async function setup() {
      try {
        let results: TListItem[] = await db.getAllLists();
        setItems(results);
      } catch (error) {
        console.error(error);
      }
    }
    setup();
  }, []);

  return (
    <View>
      <Text style={style.listSectionHeading}>Your lists</Text>
      <FlatList
        data={items}
        horizontal={true}
        renderItem={({item, index}) => <ListItem item={item} index={index} />}
        keyExtractor={item => item.id.toString()}
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
