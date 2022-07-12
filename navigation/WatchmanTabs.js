import React, { useState, useEffect, Fragment } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeScreen from "../screens/WatchManScreens/HomeScreen";
import AllRequestScreen from "../screens/WatchManScreens/AllRequestScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const watchmanTabs = createBottomTabNavigator();
import { useSelector } from "react-redux";
const WatchmanTabs = () => {
  const member = useSelector((state) => state.member.loggedInMember);
  return (
    <watchmanTabs.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: "#8100ff",
        },
        tabBarInactiveTintColor: "white",
        tabBarActiveTintColor: "red",
        headerStyle: {
          backgroundColor: "#8100ff",
        },

        headerTintColor: "white",
      }}
    >
      <watchmanTabs.Screen
        name={`Welcome ${member.name}`}
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <watchmanTabs.Screen
        name="AllRequestScreen"
        component={AllRequestScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
        }}
      />
    </watchmanTabs.Navigator>
  );
};

export default WatchmanTabs;
