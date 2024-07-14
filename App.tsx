/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Home from './screens/Home';
import Detail from './screens/Details';
import {SQLiteProvider} from 'expo-sqlite';
// import {TListItem} from '@/model';

export type SharedElementStackParamList = {
  Home: undefined;
  Detail: {id: string};
};

function App() {
  const Stack = createNativeStackNavigator<SharedElementStackParamList>();
  return (
    <SQLiteProvider
      databaseName="ripple.db"
      assetSource={{assetId: require('./assets/ripple.db')}}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Detail"
            component={Detail}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SQLiteProvider>
  );
}

export default App;
