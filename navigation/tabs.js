import * as React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/Homescreen";

import IncomingRequestScreen from "../screens/IncomingRequestScreen";
import History from "../screens/History";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Communication from "../screens/communication";
import RaiseComplaintScreen from "../screens/CommunicationScreens/RaiseCompliantScreen";
import PostNewIdeas from "../screens/CommunicationScreens/PostNewIdeas";
import HomeCareContactList from "../screens/CommunicationScreens/HomeCareContactList";
import PostInvitation from "../screens/CommunicationScreens/PostInvitation";
import NoticeBoard from "../screens/CommunicationScreens/NoticeBoard";
import ViewMaintenanceStatus from "../screens/CommunicationScreens/ViewMaintenanceStatus";
import ChangeHomeAvailableStatus from "../screens/CommunicationScreens/ChangeHomeAvailableStatus";
import DetailViewOfScreens from '../components/UI/DetailViewOfScreen';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const Stacks = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#8100ff",
        },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen
        name="Communication"
        component={Communication}
        options={{}}
      />

      <Stack.Screen
        name="RaiseComplaintScreen"
        component={RaiseComplaintScreen}
      />
   
      <Stack.Screen name="PostNewIdeas" component={PostNewIdeas} />
      <Stack.Screen name="DetailView" component={DetailViewOfScreens} />

      <Stack.Screen
        name="HomeCareContactList"
        component={HomeCareContactList}
      />
      <Stack.Screen name="PostInvitation" component={PostInvitation} />
      <Stack.Screen name="NoticeBoard" component={NoticeBoard} />
      <Stack.Screen
        name="ViewMaintenanceStatus"
        component={ViewMaintenanceStatus}
      />
      <Stack.Screen
        name="ChangeHomeAvailableStatus"
        component={ChangeHomeAvailableStatus}
      />
    </Stack.Navigator>
  );
};
const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
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
      <Tab.Screen
        name=" Welcome Sayali"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Incoming Visitor Request List"
        component={IncomingRequestScreen}
        options={{
          tabBarBadge: 5,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="navigate-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Communication Section"
        component={Stacks}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="chatbubble-ellipses-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="history" color={color} size={size} />
          ),
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

export default Tabs;
