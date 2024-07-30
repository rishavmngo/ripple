import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, FlatList} from 'react-native';
import BottomTaskListItem from './BottomTaskListItem';
import {useIsFocused} from '@react-navigation/native';
import db from '@/db/db';

export default function BottomTaskList() {
  const [taskLists, setTaskLists] = useState<any[]>([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    async function setup() {
      try {
        let results: any[] = await db.getAllTasksFromToday();
        for (let i = 0; i < results.length; i++) {
          console.log(results[i]);
        }
        setTaskLists(results);
      } catch (error) {
        console.error(error);
      }
    }
    if (isFocused) {
      setup();
    }
  }, [isFocused]);
  return (
    <View style={style.bottomSheetContainer}>
      <View style={style.headerContainer}>
        <View style={style.taskCountContainer}>
          <Text style={style.taskCountText}>03 tasks</Text>
          <TouchableOpacity>
            <Text style={style.addButton}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={style.listSelectorContainer}>
          <Text style={style.listSelectorText}>All</Text>
        </View>
      </View>

      <FlatList
        data={taskLists}
        horizontal={false}
        renderItem={({item, index}) => (
          <BottomTaskListItem item={item} index={index} />
        )}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={{marginTop: 20}}
      />
    </View>
  );
}

const BORDER_RADIUS = 55;
const style = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#825CC0',
  },
  grettingText: {
    fontSize: 20,
    marginLeft: 10,
    marginTop: 10,
  },
  bottomSheetContainer: {
    backgroundColor: 'white',
    width: '100%',
    height: 300,
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: BORDER_RADIUS,
    borderTopRightRadius: BORDER_RADIUS,
    padding: 30,
    color: 'black',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  taskCountContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  taskCountText: {
    color: '#5B5B5B',
    fontSize: 25,
  },
  addButton: {
    color: '#5B5B5B',
    fontSize: 20,
    backgroundColor: '#D9D9D9',
    padding: 5,
    paddingHorizontal: 20,
    borderRadius: 100,
    // height: 15,
    // width: 15,
  },

  listSelectorContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  listSelectorText: {
    color: '#5B5B5B',
    fontSize: 20,
  },
});
