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
import { useSelector } from "react-redux";
const NavigationByRole = () => {
  const loggedInMember = useSelector((state) => state.member.loggedInMember);
  
  
  return<Fragment>{loggedInMember.memberType==="member" ? <Tabs />:null}</Fragment>
};

export default NavigationByRole;
