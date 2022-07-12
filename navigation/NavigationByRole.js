import React, { useState, useEffect, Fragment } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import Tabs from "./tabs";
import WatchmanTabs from "./WatchmanTabs";
import { useSelector } from "react-redux";
const NavigationByRole = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [memberLoggedIn, setMemberLoggedIn] = useState(null);
  const member = useSelector((state) => state.member.loggedInMember);
  
  useEffect(() => {
    if (member != undefined) {
      setMemberLoggedIn(member);
      setIsLoading(false);
    }
  }, [member]);

  if (isLoading) {
    return(
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size="large" color="blue" />
    </View>);
  }
  return (
    <Fragment>
      {memberLoggedIn.memberType === "member" ? <Tabs /> : null}
      {memberLoggedIn.memberType==='watchman' ? <WatchmanTabs /> :null}
    </Fragment>
  );
};

export default NavigationByRole;
