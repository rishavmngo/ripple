import React, {useEffect, useState} from 'react';

import {View, Text, StyleSheet, FlatList} from 'react-native';
import ListItem from '@/components/ListItem';
import {TListItem} from '@/model';
import db from '@/db/db';
import {useIsFocused} from '@react-navigation/native';
import ButtonIcon from './ButtonIcon';

export default function ListSection() {
  const [items, setItems] = useState<TListItem[]>([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    console.log('runned');
    async function setup() {
      try {
        let results: TListItem[] = await db.getAllLists();
        setItems(results);
      } catch (error) {
        console.error(error);
      }
    }
    if (isFocused) {
      setup();
    }
  }, [isFocused]);

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'baseline',
          justifyContent: 'space-between',
        }}>
        <Text style={style.listSectionHeading}>Your lists</Text>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 20,
          }}>
          <ButtonIcon
            onPress={() => {}}
            type="Warning"
            border={{
              borderWidth: 1,
              borderColor: 'white',
              borderRadius: 17,
            }}
          />
        </View>
      </View>
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
