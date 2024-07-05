import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {TListItem} from '@/model';
import {displayDuration} from '@/utils/Utils';

interface ListItemProps {
  item: TListItem;
  index: number;
}

function ListItem({item, index}: ListItemProps) {
  const paddedNumber = String(item.noOfItems).padStart(2, '0');
  return (
    <View
      style={[
        style.view,
        {backgroundColor: item.itemColor},
        index === 0 && style.firstElement,
      ]}>
      <Text style={style.durationText}>
        {displayDuration(item.totalDurationOfTasks)}
      </Text>
      <Text style={style.titleText}>{item.title}</Text>
      <Text style={style.noOfItemsText}>{paddedNumber} items</Text>
    </View>
  );
}

const style = StyleSheet.create({
  view: {
    height: 200,
    width: 200,
    margin: 5,
    padding: 5,
    borderRadius: 40,
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
    paddingVertical: 4,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  noOfItemsText: {
    position: 'absolute',
    bottom: 25,
    right: 20,
  },
});

export default ListItem;
