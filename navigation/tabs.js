import * as React from "react";
import { Text, View } from "react-native";
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
import AddMaintenanceDetails from "../screens/CommunicationScreens/AddMaintenanceDetails";
import MemberProfileScreen from "../screens/MemberProfileScreen";
import DetailViewOfScreens from "../components/UI/DetailViewOfScreen";
import ViewInvitationPhoto from "../screens/CommunicationScreens/ViewInvitationPhoto";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const HomeScreenStack = createNativeStackNavigator();
const IncomingRequestScreenStack = createNativeStackNavigator();
const HistoryStack = createNativeStackNavigator();
const HomeScreens = () => {
  return (
    <HomeScreenStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#8100ff",
        },
        headerTintColor: "white",
      }}
    >
      <HomeScreenStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{}}
      />
      <HomeScreenStack.Screen
        name="MemberProfile"
        component={MemberProfileScreen}
        options={{}}
      />
    </HomeScreenStack.Navigator>
  );
};

const IncomingRequestScreens = () => {
  return (
    <IncomingRequestScreenStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#8100ff",
        },
        headerTintColor: "white",
      }}
    >
      <IncomingRequestScreenStack.Screen
        name="IncomingRequest"
        component={IncomingRequestScreen}
        options={{}}
      />
    </IncomingRequestScreenStack.Navigator>
  );
};

const HistoryScreens = () => {
  return (
    <HistoryStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#8100ff",
        },
        headerTintColor: "white",
      }}
    >
      <HistoryStack.Screen
        name="HistoryScreens"
        component={History}
        options={{}}
      />
    </HistoryStack.Navigator>
  );
};
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
      <Stack.Screen name="InvitationPhoto" component={ViewInvitationPhoto} />
      <Stack.Screen
        name="HomeCareContactList"
        component={HomeCareContactList}
      />
      <Stack.Screen name="PostInvitation" component={PostInvitation} />
      <Stack.Screen name="MemberProfile" component={MemberProfileScreen} />
      <Stack.Screen name="NoticeBoard" component={NoticeBoard} />
      <Stack.Screen
        name="AddMaintenanceDetails"
        component={AddMaintenanceDetails}
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
        headerShown: false,
        headerTintColor: "white",
      }}
    >
      <Tab.Screen
        name="Welcome Sayali"
        component={HomeScreens}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Incoming Visitor Request List"
        component={IncomingRequestScreens}
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
        component={HistoryScreens}
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
