import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

type BottomTaskListItemProps = {
  item: any;
  index: number;
};

export default function BottomTaskListItem({
  item,
  index,
}: BottomTaskListItemProps) {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.numberBadgeContainer}>
        <Text style={styles.numberBadgeText}>{index + 1}</Text>
      </View>
      <View style={styles.taskContainer}>
        <Text style={styles.taskListText}>{item.list_name}</Text>
        <Text style={styles.taskText}>{item.title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {flexDirection: 'row'},
  numberBadgeContainer: {
    backgroundColor: '#DEECED',
    marginRight: 10,
    width: 40,
    height: 40,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberBadgeText: {fontSize: 20, color: '#000'},
  taskContainer: {marginRight: 'auto'},
  taskListText: {color: '#585858', fontSize: 20},
  taskText: {color: '#2B2B2B', fontWeight: 'semibold', fontSize: 30},
});
