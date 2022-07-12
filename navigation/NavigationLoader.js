import React, { useState, useEffect, Fragment } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useDispatch } from "react-redux";
import NavigationByRole from "./NavigationByRole";
import * as memberActions from "../store/actions/member";

const NavigationLoader = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      try {
        dispatch(memberActions.fetch_members());
      } catch (err) {
        console.log(err.message);
      }
      setIsLoading(false);
    }, 2000);
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <Fragment>
      <NavigationByRole />
    </Fragment>
  );
};

export default NavigationLoader;
