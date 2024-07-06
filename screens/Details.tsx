import {getById} from '@/data';
import {displayDuration} from '@/utils/Utils';
import BouncyCheckbox, {
  BouncyCheckboxHandle,
} from 'react-native-bouncy-checkbox';
import React, {useRef} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Animated from 'react-native-reanimated';

export default function Detail({route}) {
  let bouncyCheckboxRef = useRef<BouncyCheckboxHandle>(null);
  const id = route.params.id;
  const item = getById(id);
  if (!item) {
    return;
  }
  return (
    <View style={[style.container]}>
      <Animated.View
        sharedTransitionTag={item.id}
        style={[style.innerContainer, {backgroundColor: item?.itemColor}]}>
        <View style={style.headerSection}>
          <Animated.Text
            style={style.titleText}
            sharedTransitionTag={`${item.id}-title-text`}>
            {item.title}
          </Animated.Text>
          <Animated.Text
            style={style.listDurationText}
            sharedTransitionTag={`${item.id}-duration-text`}>
            {displayDuration(item.totalDurationOfTasks)}
          </Animated.Text>
        </View>
      </Animated.View>
      <Pressable
        onPress={() => {
          if (bouncyCheckboxRef.current) {
            bouncyCheckboxRef.current.onCheckboxPress();
          }
        }}
        style={{margin: 10, marginTop: 90, flexDirection: 'row'}}>
        <BouncyCheckbox ref={bouncyCheckboxRef} />
        <View>
          <Text style={style.taskDurationText}>01 hours</Text>
          <Text style={style.taskTitleText}>Mathematics-II</Text>
        </View>
      </Pressable>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    marginHorizontal: 20,
  },

  titleText: {
    fontSize: 30,
  },

  listDurationText: {
    fontSize: 15,
    backgroundColor: '#403E3C',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  taskTitleText: {
    fontSize: 20,
    color: 'white',
  },
  taskDurationText: {
    fontSize: 12,
    color: '#C3C3C3',
  },
});
