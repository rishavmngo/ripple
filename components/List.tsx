import React, {useEffect, useState} from 'react';

import {View, Text, StyleSheet, FlatList} from 'react-native';
import ListItem from '@/components/ListItem';
import {useSQLiteContext} from 'expo-sqlite';
import {TListItem} from './List.types';
import query from '@/queries/query';

export default function ListSection() {
  const db = useSQLiteContext();
  const [items, setItems] = useState<TListItem[]>([]);

  useEffect(() => {
    async function setup() {
      try {
        let results: TListItem[] = await db.getAllAsync(query.SELECT_ALL_LISTS);
        setItems(results);
      } catch (error) {
        console.error(error);
      }
    }
    setup();
  }, [db]);

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
