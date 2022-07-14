import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import authReducer from "./store/reducers/auth";
import memberReducer from "./store/reducers/member";
import communicationReducer from "./store/reducers/communication";
import { StyleSheet, Touchable, Text, View, Image } from "react-native";
import AppNavigator from "./navigation/AppNavigator";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import visitorReducer from "./store/reducers/VisitorInfo";
const rootReducer = combineReducers({
  auth: authReducer,
  member: memberReducer,
  communication: communicationReducer,
  visitors:visitorReducer
});

const store = configureStore(
  {
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
  },
  applyMiddleware(ReduxThunk)
);

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  shadow: {},
});
