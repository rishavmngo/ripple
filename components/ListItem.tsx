import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
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
    // <View style={[index === 0 && style.firstElement]}>
    <Pressable
      onPress={() => {
        navigation.navigate('Detail', {id: item.id});
      }}
      style={[index === 0 && style.firstElement]}>
      <Animated.View
        sharedTransitionTag={item.id}
        style={[style.mainContainer, {backgroundColor: item.itemColor}]}>
        <Animated.Text
          style={style.durationText}
          sharedTransitionTag={`${item.id}-duration-text`}>
          {displayDuration(item.totalDurationOfTasks)}
        </Animated.Text>

        <Animated.Text
          style={style.titleText}
          sharedTransitionTag={`${item.id}-title-text`}>
          {item.title}
        </Animated.Text>
      </Animated.View>

      <Animated.Text style={style.noOfItemsText}>
        {paddedNumber} items
      </Animated.Text>
    </Pressable>

    // <Pressable
    //   style={[style.innerContainer]}
    //   <Animated.Text style={style.noOfItemsText}>
    //     {paddedNumber} items
    //   </Animated.Text>
    // </Pressable>
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
