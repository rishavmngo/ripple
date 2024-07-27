import React from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';
import {TTask} from '@/models/Task.type';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {Swipeable} from 'react-native-gesture-handler';
import {displayDuration} from '@/utils/Utils';

type TaskProps = {
  task: TTask;
  index: number;
  checked: boolean;
  bg_color: string;
  handlePress: Function;
};
export default function TaskItem({
  task,
  index,
  checked,
  bg_color,
  handlePress,
}: TaskProps) {
  console.log(task, checked);
  return (
    <Swipeable
      containerStyle={{
        margin: 10,
      }}
      onSwipeableOpen={event => {
        console.log(event);
      }}
      rightThreshold={30}
      renderRightActions={() => (
        <View
          style={{
            backgroundColor: 'white',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'flex-end',
            borderRadius: 5,
          }}>
          <Icon
            name="trash-can"
            style={{marginRight: 20, color: bg_color}}
            size={20}
          />
        </View>
      )}>
      <Pressable
        key={`taks-${task.id}`}
        style={{
          backgroundColor: bg_color,

          borderRadius: 5,
          ...style.listItem,
        }}
        onPress={() => handlePress(task.id, index)}
        onLongPress={() => console.log('heell')}>
        <BouncyCheckbox
          isChecked={checked}
          onPress={() => handlePress(task.id, index)}
        />
        <View>
          <>
            <Text style={style.taskDurationText}>
              {displayDuration(task.duration)} hours
            </Text>
            <Text style={style.taskTitleText}>{task.title}</Text>
          </>
        </View>
      </Pressable>
    </Swipeable>
  );
}

const style = StyleSheet.create({
  itemsContainer: {
    marginHorizontal: 10,
    marginTop: 90,
  },
  listItem: {flexDirection: 'row'},
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
