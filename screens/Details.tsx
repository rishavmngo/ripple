import {displayDuration} from '@/utils/Utils';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import TaskList from '@/components/TaskList';
import {useTasks} from '@/store/store';
import {TListItem, TTask} from '@/model';
import db from '@/db/db';
import ButtonIcon from '@/components/ButtonIcon';
import Dialog from '@/components/Dialog';
import Button from '@/components/Button';
import {TextInput} from 'react-native-gesture-handler';
import Slider from '@react-native-community/slider';
import colors from '@/utils/Colors';

type RootStackParamList = {
  Detail: {id: string};
};

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>;
type DetailProps = {
  route: DetailScreenRouteProp;
};

const MIN_DURATION = 5;
const MAX_DURATION = 240;
const INITAL_DURATION = 25;
export default function Detail({route}: DetailProps) {
  const id = route.params.id;
  const [list, setList] = useState<TListItem | null>(null);
  const tasks = useTasks(state => state.tasks);
  const fetchTasks = useTasks(state => state.fetchTasks);
  const [dialogOpen, toggleDialog] = useState(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [duration, setDuration] = useState(INITAL_DURATION);

  const resetStates = () => {
    setInputValue('');
    setDuration(INITAL_DURATION);
  };
  function handleDialogClose() {
    toggleDialog(!dialogOpen);
  }

  useEffect(() => {
    fetchTasks(id);
  }, [id, fetchTasks]);

  useEffect(() => {
    async function getList() {
      try {
        let result: TListItem = await db.getListById(id);
        setList(result);
      } catch (error) {
        console.error(error);
      }
    }
    getList();
  }, [id]);
  const addTask = async (title: string, duration: number, list_id: number) => {
    try {
      const task: TTask = {
        id: 0,
        title: title,
        duration: duration,
        list_id: list_id,
        status: 'incomplete',
        created_at: null,
        updated_at: null,
      };
      await db.addTasks(task);
      fetchTasks(id);
    } catch (error) {
      console.error(error);
    }
  };

  if (!list) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <>
      <Dialog visible={dialogOpen} onClose={handleDialogClose}>
        <Text style={styles.dialogTitle}>Add a task</Text>
        <TextInput
          placeholder="eg: exercise"
          placeholderTextColor="#575757"
          style={styles.taskInput}
          value={inputValue}
          onChangeText={setInputValue}
        />
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontWeight: 'bold'}}>Duration (in minutes) </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>{MIN_DURATION} </Text>
          <Slider
            style={{width: 150}}
            thumbTintColor="white"
            step={5}
            maximumValue={MAX_DURATION}
            minimumValue={MIN_DURATION}
            value={duration}
            onValueChange={setDuration}
            minimumTrackTintColor={colors.lightPurple}
            maximumTrackTintColor={colors.lightBlack}
            tapToSeek
          />
          <Text>{MAX_DURATION}</Text>
          <View
            style={{
              width: 50,
              padding: 3,
              borderWidth: 1,
              borderRadius: 5,
              borderColor: colors.lightPurple,
              marginLeft: 'auto',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text>{duration} m</Text>
          </View>
        </View>
        <View style={{marginTop: 30}}>
          <Button
            disabled={inputValue.length > 0 ? false : true}
            style={inputValue.length > 0 ? {} : {opacity: 0.5}}
            text={'Add'}
            type="Danger"
            onPress={() => {
              if (inputValue === '') {
                return;
              }
              addTask(inputValue, duration, parseInt(id, 10));
              resetStates();
              handleDialogClose();
            }}
          />
          <Button
            text={'cancel'}
            onPress={() => {
              resetStates();
              handleDialogClose();
            }}
          />
        </View>
      </Dialog>
      <View style={[styles.container]}>
        <View
          style={[styles.innerContainer, {backgroundColor: list?.bg_color}]}>
          <View style={styles.headerSection}>
            <Text style={styles.titleText}>{list?.title}</Text>
            <Text style={styles.listDurationText}>
              {displayDuration(list?.total_duration)}
            </Text>
          </View>
        </View>
        <View style={styles.itemsContainer}>
          <TaskList tasks={tasks} bg_color={list.bg_color} />
        </View>

        <View style={{position: 'absolute', bottom: 100, right: 50}}>
          <ButtonIcon onPress={() => toggleDialog(true)} />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  itemsContainer: {
    marginHorizontal: 10,
    marginTop: 90,
  },
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
  dialogTitle: {
    fontSize: 20,
  },
  taskInput: {
    // borderBottomWidth: 1,
    padding: 10,
    backgroundColor: '#000000',
    borderColor: 'white',
    borderRadius: 10,
    marginVertical: 30,
  },
});
