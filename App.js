import React from "react";
import { StyleSheet, Touchable, Text, View, Image } from "react-native";
import IncomingRequestScreen from "./screens/IncomingRequestScreen";
import Homescreen from "./screens/Homescreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tabs from "./navigation/tabs";
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  shadow: {},
});
