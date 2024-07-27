import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {displayDuration, padNumber} from '@/utils/Utils';
import {useNavigation} from '@react-navigation/native';
import {TListItem} from './List.types';

interface ListItemProps {
  item: TListItem;
  index: number;
}

function ListItem({item, index}: ListItemProps) {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => {
        navigation.navigate('Detail', {id: item.id.toString()});
      }}
      style={[index === 0 && style.firstElement]}>
      <View style={[style.mainContainer, {backgroundColor: item.bg_color}]}>
        <Text style={style.durationText}>
          {displayDuration(item.total_duration)} hr
        </Text>

        <Text style={style.titleText}>{item.title}</Text>
      </View>

      <Text style={style.noOfItemsText}>
        {padNumber(item.total_tasks, 2)} items
      </Text>
    </Pressable>
  );
}

const style = StyleSheet.create({
  mainContainer: {
    borderRadius: 40,
    margin: 5,
    height: 200,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },

  firstElement: {
    marginLeft: 30,
  },
  titleText: {
    fontSize: 30,
  },
  durationText: {
    position: 'absolute',
    top: 25,
    left: 20,
    fontSize: 15,
    backgroundColor: '#403E3C',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  noOfItemsText: {
    position: 'absolute',
    bottom: 25,
    right: 20,
  },
});

export default ListItem;
