import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {displayDuration, padNumber} from '@/utils/Utils';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ID, TListItem} from '@/model';

type RootStackParamList = {
  Detail: {id: string};
};
type ListItemProps = {
  item: TListItem;
  index: number;
  handleDelete: (list: any) => void;
  deleteState: ID;
};
function ListItem({item, index, handleDelete, deleteState}: ListItemProps) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <Pressable
      onLongPress={() => handleDelete(item)}
      onPress={() => {
        navigation.navigate('Detail', {id: item.id.toString()});
      }}
      style={[index === 0 && style.firstElement]}>
      <View
        style={[
          style.mainContainer,
          {backgroundColor: item.bg_color},
          // deleteState === item.id ? style.deleteState : {},
        ]}>
        <Text style={style.durationText}>
          {displayDuration(item.total_duration)}
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
  deleteState: {
    borderWidth: 2,
    backgroundColor: '#4a6e22',
    borderColor: '#B4E380',
    opacity: 0.8,
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
    bottom: 35,
    right: 25,
  },
});

export default ListItem;
