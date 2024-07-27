import {displayDuration} from '@/utils/Utils';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TListItem} from '@/components/List.types';
import {useSQLiteContext} from 'expo-sqlite';
import {TTask} from '@/models/Task.type';
import {RouteProp} from '@react-navigation/native';
import query from '@/queries/query';
import TaskList from '@/components/TaskList';

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
  const [list, setList] = useState<TListItem | null>(null);

  useEffect(() => {
    async function getTasks() {
      try {
        let results: TTask[] = await db.getAllAsync(query.SELECT_TASK_WITH_ID, [
          id,
        ]);
        setTasks(results);
      } catch (error) {
        console.error(error);
      }
    }

    async function getList() {
      try {
        let result: TListItem | null = await db.getFirstAsync(
          query.SELECT_LIST_WITH_ID,
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
      <View style={[style.innerContainer, {backgroundColor: list?.bg_color}]}>
        <View style={style.headerSection}>
          <Text style={style.titleText}>{list?.title}</Text>
          <Text style={style.listDurationText}>
            {displayDuration(list?.total_duration)} hr
          </Text>
        </View>
      </View>
      <View style={style.itemsContainer}>
        <TaskList tasks={tasks} bg_color={list.bg_color} />
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
