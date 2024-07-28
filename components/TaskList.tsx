import React, {memo, useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import TaskItem from './TaskItem';
import {useSQLiteContext} from 'expo-sqlite';
import query from '@/queries/query';
import Dialog from './Dialog';
import Button from './Button';
import {TCurrentTask, TTask} from '@/model';
import {useTasks} from '@/store/store';

type TaskListProps = {
  tasks: TTask[];
  bg_color: string;
};

const MemoziedTaskItem = memo(TaskItem);
export default function TaskList({tasks, bg_color}: TaskListProps) {
  const db = useSQLiteContext();
  const [currentTask, setCurrentTask] = useState<TCurrentTask>({
    task: null,
    ref: null,
  });
  const [dialogOpen, toggleDialog] = useState(false);
  const [checkedStates, setCheckedStates] = useState<boolean[]>([]);
  const fetchTasks = useTasks(state => state.fetchTasks);
  const handlePress = (taskId: number, index: number) => {
    setCheckedStates(prevStates => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
    toggleStatus(taskId, checkedStates[index] ? 'incomplete' : 'complete');
  };

  function handleDialogClose() {
    toggleDialog(!dialogOpen);
    if (currentTask.ref) {
      currentTask.ref.close();
    }
  }

  const handleDelete = () => {
    if (currentTask.task) {
      DeleteTaskByID(currentTask.task.id, currentTask.task.list_id);
    }
  };

  const DeleteTaskByID = async (taskId: number, list_id: number) => {
    try {
      await db.runAsync(query.DELETE_TASK_BY_ID, [taskId]);
      fetchTasks(list_id);
    } catch (error) {
      console.error(error);
    }
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
    <>
      <Dialog visible={dialogOpen} onClose={handleDialogClose}>
        <Text style={styles.dialogTitle}>
          Delete {currentTask.task?.title}?
        </Text>
        <View style={styles.buttonContainers}>
          <Button
            text={'cancel'}
            bgColor="#363533"
            onPress={handleDialogClose}
          />
          <Button text={'confirm'} bgColor={'#EF5A6F'} onPress={handleDelete} />
        </View>
      </Dialog>
      <FlatList
        data={tasks}
        renderItem={({item, index}) => (
          <MemoziedTaskItem
            handlePress={handlePress}
            task={item}
            checked={checkedStates[index]}
            index={index}
            dialogOpen={dialogOpen}
            toggleDialog={toggleDialog}
            bg_color={bg_color}
            setCurrentTask={setCurrentTask}
          />
        )}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
      />
    </>
  );
}

const styles = StyleSheet.create({
  dialogTitle: {
    color: 'gray',
    fontWeight: 'bold',
    fontSize: 15,
  },
  buttonContainers: {
    flexDirection: 'row',
    marginLeft: 'auto',
    marginTop: 25,
  },
});
