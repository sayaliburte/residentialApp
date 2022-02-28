import React from "react";
import { StyleSheet } from "react-native";
import IncomingRequestScreen from './screens/IncomingRequestScreen';
import Homescreen from "./screens/Homescreen";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
export default function App() {
  return   (<NavigationContainer>
  <Stack.Navigator>
    <Stack.Screen
      name="HomeScreen"
      component={Homescreen}

    />
   <Stack.Screen
      name="IncomingRequestScreen"
      component={IncomingRequestScreen}

    />
  </Stack.Navigator>
</NavigationContainer>)
}

const styles = StyleSheet.create({});
