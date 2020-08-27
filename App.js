import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen'
import ClassificationScreen from './screens/ClassificationScreen'
import AboutScreen from './screens/AboutScreen'
// import WindScreen from './screens/WindScreen'

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Classification" component={ClassificationScreen}/>
        {/* <Stack.Screen name="Temperature" component={TempScreen} options={({ route }) => ({ title: 'Temperature' })}/> */}
        <Stack.Screen name="About" component={AboutScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

