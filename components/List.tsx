import React, {useEffect, useState} from 'react';

import {View, Text, StyleSheet, FlatList, TextInput} from 'react-native';
import ListItem from '@/components/ListItem';
import {TListItem} from '@/model';
import db from '@/db/db';
import {useIsFocused} from '@react-navigation/native';
import ButtonIcon from './ButtonIcon';
import Dialog from './Dialog';
import Button from './Button';

export default function ListSection() {
  const [items, setItems] = useState<TListItem[]>([]);
  const [addListdialogOpen, toggleAddListDialog] = useState(false);
  const [deleteListdialogOpen, toggleDeleteListDialog] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [deleteState, setDeleteState] = useState<any>({});
  const [selectedList, setSelectedList] = useState<TListItem | null>(null);
  const isFocused = useIsFocused();

  //helper function
  const handleAddListDialogClose = () => {
    toggleAddListDialog(!addListdialogOpen);
  };

  const handleDeleteListDialogClose = () => {
    toggleDeleteListDialog(!deleteListdialogOpen);
  };
  const resetStates = () => {
    setInputValue('');
  };

  const addList = async (title: string, bg_color = '#0f0f0f') => {
    try {
      await db.addList(title, bg_color);
      let results: TListItem[] = await db.getAllLists();
      setItems(results);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = async () => {
    if (!selectedList) {
      return;
    }
    try {
      await db.deleteListByID(selectedList.id);
      const result: TListItem[] = await db.getAllLists();
      setItems(result);
      setSelectedList(null);
      setDeleteState(0);
      toggleDeleteListDialog(false);
    } catch (error) {
      console.error(error);
    }
  };
  const deleteList = (item: any) => {
    setSelectedList(item);
    setDeleteState(item.id);
    toggleDeleteListDialog(true);
  };

  //load the lists whenever this component comes on focus
  useEffect(() => {
    async function setup() {
      try {
        let results: TListItem[] = await db.getAllLists();
        setItems(results);
      } catch (error) {
        console.error(error);
      }
    }
    if (isFocused) {
      setup();
    }
  }, [isFocused]);

  return (
    <>
      <Dialog
        visible={deleteListdialogOpen}
        onClose={handleDeleteListDialogClose}>
        <Text style={styles.dialogTitle}>Delete {selectedList?.title}?</Text>
        <View style={styles.buttonContainers}>
          <Button text={'cancel'} onPress={handleDeleteListDialogClose} />
          <Button text={'confirm'} type="Danger" onPress={handleDelete} />
        </View>
      </Dialog>
      <Dialog visible={addListdialogOpen} onClose={handleAddListDialogClose}>
        <Text style={styles.dialogTitle}>Add a list</Text>
        <TextInput
          placeholder="eg: study"
          placeholderTextColor="#575757"
          style={styles.taskInput}
          value={inputValue}
          onChangeText={setInputValue}
        />

        <View style={{marginTop: 30}}>
          <Button
            style={inputValue.length > 0 ? {} : {opacity: 0.5}}
            text={'Add'}
            type="Danger"
            onPress={() => {
              if (inputValue === '') {
                return;
              }
              addList(inputValue);
              resetStates();
              handleAddListDialogClose();
            }}
            disabled={inputValue.length > 0 ? false : true}
          />
          <Button
            text={'cancel'}
            onPress={() => {
              resetStates();
              handleAddListDialogClose();
            }}
          />
        </View>
      </Dialog>
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'baseline',
            justifyContent: 'space-between',
          }}>
          <Text style={styles.listSectionHeading}>Your lists</Text>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 20,
            }}>
            <ButtonIcon
              onPress={() => toggleAddListDialog(true)}
              type="Warning"
              border={{
                borderWidth: 1,
                borderColor: 'white',
                borderRadius: 17,
              }}
            />
          </View>
        </View>
        <FlatList
          data={items}
          horizontal={true}
          renderItem={({item, index}) => (
            <ListItem
              item={item}
              handleDelete={deleteList}
              deleteState={deleteState}
              index={index}
            />
          )}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={styles.listContainer}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  listSectionHeading: {
    fontSize: 40,
    marginTop: 25,

    marginLeft: 10,
  },
  listContainer: {
    marginTop: 20,
  },

  dialogTitle: {
    fontSize: 20,
  },
  taskInput: {
    padding: 10,
    backgroundColor: '#000000',
    borderColor: 'white',
    borderRadius: 10,
    marginVertical: 30,
  },

  buttonContainers: {
    flexDirection: 'row',
    marginLeft: 'auto',
    marginTop: 25,
  },
});
