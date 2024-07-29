import React, {Dispatch, SetStateAction, useRef} from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {Swipeable} from 'react-native-gesture-handler';
import {displayDuration} from '@/utils/Utils';
import {TCurrentTask, TTask} from '@/model';

type TaskProps = {
  task: TTask;
  index: number;
  checked: boolean;
  bg_color: string;
  handlePress: Function;
  dialogOpen: boolean;
  toggleDialog: Function;
  setCurrentTask: Dispatch<SetStateAction<TCurrentTask>>;
};
export default function TaskItem({
  task,
  index,
  checked,
  bg_color,
  handlePress,
  dialogOpen,
  toggleDialog,
  setCurrentTask,
}: TaskProps) {
  const swipeableRef = useRef<Swipeable>(null);
  const doSomeAction = (item: TTask) => {
    setCurrentTask({task: item, ref: swipeableRef.current});
    toggleDialog(!dialogOpen);
  };
  return (
    <Swipeable
      ref={swipeableRef}
      containerStyle={{
        margin: 10,
      }}
      onSwipeableOpen={() => {
        doSomeAction(task);
      }}
      rightThreshold={70}
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
              {displayDuration(task.duration, true)}
            </Text>
            <Text
              style={[
                checked ? style.completedTask : style.unCompletedTask,
                style.taskTitleText,
              ]}>
              {task.title}
            </Text>
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
  },
  taskDurationText: {
    fontSize: 12,
    color: '#C3C3C3',
  },
  completedTask: {
    color: 'gray',
    textDecorationLine: 'line-through',
  },
  unCompletedTask: {
    color: 'white',
  },
});
