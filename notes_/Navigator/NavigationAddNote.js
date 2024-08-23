import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Addnote from '../Pages/Addnote';
import Home from '../Pages/Home';
const Stack = createNativeStackNavigator();
export default function NavigationAddNote() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Addnote" component={Addnote} />
    </Stack.Navigator>
  )
}

// const styles = StyleSheet.create({})