import {displayDuration} from '@/utils/Utils';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {TListItem} from '@/components/List.types';
import {useSQLiteContext} from 'expo-sqlite';
import {TTask} from '@/models/Task.type';
import {RouteProp} from '@react-navigation/native';
import {Swipeable} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome6';
type RootStackParamList = {
  Detail: {id: string};
};

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>;
type DetailProps = {
  route: DetailScreenRouteProp;
};
export default function Detail({route}: DetailProps) {
  const db = useSQLiteContext();
  const id = route.params.id;
  const [tasks, setTasks] = useState<TTask[]>([]);
  const [checkedStates, setCheckedStates] = useState<boolean[]>([]);
  const [list, setList] = useState<TListItem | null>(null);

  const handlePress = (taskId: number, index: number) => {
    setCheckedStates(prevStates => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
    toggleStatus(taskId, checkedStates[index] ? 'incomplete' : 'complete');
  };

  const toggleStatus = (taskId: number, status: string) => {
    async function updateTask() {
      try {
        await db.runAsync('UPDATE Tasks set status = ? WHERE id = ?', [
          status,
          taskId,
        ]);
      } catch (error) {
        console.error(error);
      }
    }
    updateTask();
  };

  useEffect(() => {
    async function getTasks() {
      try {
        let results: TTask[] = await db.getAllAsync(
          'SELECT * FROM Tasks where list_id=?',
          [id],
        );

        setTasks(results);

        setCheckedStates(
          results.map(task => (task.status === 'complete' ? true : false)),
        );
      } catch (error) {
        console.error(error);
      }
    }

    async function getList() {
      try {
        let result: TListItem | null = await db.getFirstAsync(
          `SELECT 
  l.id,
  l.title,
  l.bg_color,
  l.created_at,
  l.updated_at,
  IFNULL(SUM(t.duration), 0) AS total_duration
FROM 
  Lists l
LEFT JOIN 
  Tasks t 
ON 
  l.id = t.list_id
WHERE l.id =? 
GROUP BY 
  l.id`,
          [id],
        );
        setList(result);
      } catch (error) {
        console.error(error);
      }
    }
    getList();
    getTasks();
  }, [db, id]);

  if (!list) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <View style={[style.container]}>
      <View
        // sharedTransitionTag={list?.id.toString()}
        style={[style.innerContainer, {backgroundColor: list?.bg_color}]}>
        <View style={style.headerSection}>
          <Text
            style={style.titleText}
            // sharedTransitionTag={`${list?.id}-title-text`}
          >
            {list?.title}
          </Text>
          <Text
            style={style.listDurationText}
            // sharedTransitionTag={`${list?.id}-duration-text`}
          >
            {displayDuration(list?.total_duration)} hr
          </Text>
        </View>
      </View>
      <View style={style.itemsContainer}>
        {tasks.map((task: TTask, index: number) => (
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
                  style={{marginRight: 20, color: list.bg_color}}
                  size={20}
                />
              </View>
            )}>
            <Pressable
              key={`taks-${task.id}`}
              style={{
                backgroundColor: list.bg_color,

                borderRadius: 5,
                ...style.listItem,
              }}
              onPress={() => handlePress(task.id, index)}
              onLongPress={() => console.log('heell')}>
              <BouncyCheckbox
                isChecked={checkedStates[index]}
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
        ))}
      </View>
    </View>
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
