import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {TListItem} from '@/model';
import {displayDuration} from '@/utils/Utils';
import Animated from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SharedElementStackParamList} from '@/App';

interface ListItemProps {
  item: TListItem;
  index: number;
}

function ListItem({item, index}: ListItemProps) {
  const paddedNumber = String(item.noOfItems).padStart(2, '0');
  const navigation =
    useNavigation<NativeStackNavigationProp<SharedElementStackParamList>>();
  return (
    <View style={[index === 0 && style.firstElement]}>
      <Animated.View
        sharedTransitionTag={item.id}
        style={[style.mainContainer, {backgroundColor: item.itemColor}]}
      />

      <Pressable
        style={[style.innerContainer]}
        onPress={() => {
          navigation.navigate('Detail', {id: item.id});
        }}>
        <Animated.Text style={style.durationText}>
          {displayDuration(item.totalDurationOfTasks)}
        </Animated.Text>
        <Animated.Text style={style.titleText}>{item.title}</Animated.Text>
        <Animated.Text style={style.noOfItemsText}>
          {paddedNumber} items
        </Animated.Text>
      </Pressable>
    </View>
  );
}

const style = StyleSheet.create({
  mainContainer: {
    borderRadius: 40,
    margin: 5,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'red',
  },
  innerContainer: {
    height: 200,
    width: 200,
    padding: 5,
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
