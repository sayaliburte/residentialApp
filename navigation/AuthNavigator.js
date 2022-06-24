import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthScreen from "../screens/AuthScreen";
const AuthStack = createNativeStackNavigator();
const AuthNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#8100ff",
        },
        headerTintColor: "white",
      }}
    >
      <AuthStack.Screen
        name="Auth"
        component={AuthScreen}
        options={{ headerTitle: "Authenticate" }}
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
