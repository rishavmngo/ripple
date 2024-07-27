import React, {useEffect} from 'react';
import {TTask} from '@/models/Task.type';
import {FlatList} from 'react-native';
import TaskItem from './TaskItem';
import {useSQLiteContext} from 'expo-sqlite';
import {useState} from 'react';
import query from '@/queries/query';

type TaskListProps = {
  tasks: TTask[];
  bg_color: string;
};

export default function TaskList({tasks, bg_color}: TaskListProps) {
  const db = useSQLiteContext();
  const [checkedStates, setCheckedStates] = useState<boolean[]>([]);
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
        await db.runAsync(query.UPDATE_TASK_STATUS, [status, taskId]);
      } catch (error) {
        console.error(error);
      }
    }
    updateTask();
  };

  useEffect(() => {
    setCheckedStates(
      tasks.map(task => (task.status === 'complete' ? true : false)),
    );
  }, [tasks]);

  return (
    <FlatList
      data={tasks}
      renderItem={({item, index}) => (
        <TaskItem
          handlePress={handlePress}
          task={item}
          checked={checkedStates[index]}
          index={index}
          bg_color={bg_color}
        />
      )}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      keyExtractor={item => item.id.toString()}
    />
  );
}
