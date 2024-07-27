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
import {GestureHandlerRootView} from 'react-native-gesture-handler';

function App() {
  const Stack = createNativeStackNavigator();
  return (
    <SQLiteProvider
      databaseName="ripple.db"
      assetSource={{assetId: require('./assets/ripple.db')}}>
      <GestureHandlerRootView>
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
      </GestureHandlerRootView>
    </SQLiteProvider>
  );
}

export default App;
