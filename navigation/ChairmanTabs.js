import React, { useState, useEffect, Fragment } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import Reports from "../screens/ChairmanScreens/Reports";
import MaintenanceReports from "../screens/ChairmanScreens/MaintenanceReports";
import HomeScreen from "../screens/ChairmanScreens/HomeScreen";
import Communications from "../screens/ChairmanScreens/Communications";
import AllMemberDetailScreen from "../screens/ChairmanScreens/AllMemberDetailScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import ViewInvitationPhoto from "../screens/CommunicationScreens/ViewInvitationPhoto"
import { useSelector } from "react-redux";
const chairmanTabs = createBottomTabNavigator();

const ChairmanStack = createNativeStackNavigator();

const ChairmanReportScreens = () => {
  return (
    <ChairmanStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#8100ff",
        },
        headerTintColor: "white",
      }}
    >
      <ChairmanStack.Screen name="Reports" component={Reports} options={{}} />
      <ChairmanStack.Screen
        name="MaintenanceReports"
        component={MaintenanceReports}
        options={{}}
      />
      <ChairmanStack.Screen
        name="ViewInvitationPhoto"
        component={ViewInvitationPhoto}
        options={{}}
      />
    </ChairmanStack.Navigator>
  );
};

const ChairmanCommunicationScreens = () => {
  return (
    <ChairmanStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#8100ff",
        },
        headerTintColor: "white",
      }}
    >
      <ChairmanStack.Screen
        name="Communications"
        component={Communications}
        options={{}}
      />
    </ChairmanStack.Navigator>
  );
};
const ChairmanTabs = () => {
  const member = useSelector((state) => state.member.loggedInMember);
  return (
    <chairmanTabs.Navigator
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
      <chairmanTabs.Screen
        name={`Welcome ${member.name}`}
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <chairmanTabs.Screen
        name="ChairmanReportScreens"
        component={ChairmanReportScreens}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <chairmanTabs.Screen
        name="ChairmanCommunicationScreens"
        component={ChairmanCommunicationScreens}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="ios-people-circle-outline"
              color={color}
              size={size}
            />
          ),
          headerShown: false,
        }}
      />
      <chairmanTabs.Screen
        name="AllMemberDetailScreen"
        component={AllMemberDetailScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="list-alt" size={size} color={color} />
          ),
        }}
      />
    </chairmanTabs.Navigator>
  );
};

export default ChairmanTabs;
