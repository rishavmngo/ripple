import BottomTaskList from '@/components/BottomTaskList';
import ListSection from '@/components/List';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
function Home() {
  return (
    <View style={style.view}>
      <Text style={style.grettingText}>Hello, Rishav</Text>
      <ListSection />
      <BottomTaskList />
    </View>
  );
}

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
});

export default Home;
