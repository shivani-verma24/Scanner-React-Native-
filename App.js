import 'react-native-gesture-handler';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import React from 'react';
import {Signup} from './screens';
import Tabs from './navigation/Tabs';
import { createStackNavigator } from '@react-navigation/stack';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    border: 'transparent'
  }
}


const Stack = createStackNavigator();

function App() {
  return (
      <NavigationContainer theme={theme}>
        <Stack.Navigator initialRouteName="Signup"
        screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen name='Signup' component={Signup}/>
          <Stack.Screen name='Tabs' component={Tabs}/>
        </Stack.Navigator>
      </NavigationContainer>

  )
}

export default App;

