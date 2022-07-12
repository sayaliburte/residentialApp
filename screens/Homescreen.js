import React, { useState, useLayoutEffect, useEffect } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Switch,
  Text,
  Alert,
} from "react-native";

import VisitorList from "../components/Member/VisitorsList";
import { useSelector, useDispatch } from "react-redux";
import { List, Card, Button } from "react-native-paper";
const { width, height } = Dimensions.get("window");

import * as authActions from "../store/actions/auth";
import * as memberActions from "../store/actions/member";
const allVisitorData = [
  {
    vid: 1,
    photo: {
      uri: "https://images.alphacoders.com/695/thumb-350-695222.jpg",
    },
    role: "Guest",
    reason: "Guest",
    visitorName: "Sayali Burte",
    dateTime: "5/6/2022 06:33",
    requestStatus: "accepted",
  },
  {
    vid: 2,
    photo: "",
    role: "Guest",
    reason: "Guest",
    visitorName: "Sanket Khardekar",
    dateTime: "5/6/2022 06:33",
    requestStatus: "accepted",
  },
  {
    vid: 3,

    role: "Maid",
    reason: "Household",
    visitorName: "Shital Bhosale",
    dateTime: "5/6/2022 06:33",
    requestStatus: "accepted",
  },
  {
    vid: 4,
    photo: "",
    role: "Courier Boy",
    reason: "Courier Boy",
    visitorName: "Chanakya Lahiri",
    dateTime: "5/6/2022 06:33",
    requestStatus: "accepted",
  },
  {
    vid: 5,
    photo: "",
    role: "Guest",
    reason: "Guest",
    visitorName: "Shivani Shevale",
    dateTime: "5/6/2022 06:33",
    requestStatus: "decline",
  },
  {
    vid: 6,
    photo: "",
    role: "Guest",
    reason: "Guest",
    visitorName: "Snehal Salunkhe",
    dateTime: "5/6/2022 06:33",
    requestStatus: "decline",
  },
  {
    vid: 7,
    photo: "",
    role: "Maid",
    reason: "Household",
    visitorName: "Samiksha Gurav",
    dateTime: "5/6/2022 06:33",
    requestStatus: "decline",
  },
];

const Homescreen = ({ navigation }) => {
  const memberData = useSelector((state) => state.member.loggedInMember);

  const [switchValue, setSwitchValue] = useState(memberData.availabilityStatus);
  const [error, setError] = useState();
  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);
  const dispatch = useDispatch();

  const toggleSwitch = () => {
    try {
      dispatch(
        memberActions.update_homeStatus(
          { availabilityStatus: !switchValue },
          memberData.key
        )
      );
      setSwitchValue(!switchValue);
    } catch (err) {
      setError(err.message);
    }
  };
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: "row" }}>
          <Button
            icon="account-box"
            labelStyle={{ fontSize: 27 }}
            onPress={() => {
              navigation.navigate("MemberProfile");
            }}
            title=""
            color="white"
          />
          <Button
            icon="logout"
            labelStyle={{ fontSize: 27 }}
            onPress={() => {
              dispatch(authActions.logout());
            }}
            title=""
            color="white"
          />
        </View>
      ),
    });
  }, [navigation]);

  const acceptedVisitorList = allVisitorData.filter(
    (v) => v.requestStatus === "accepted"
  );
  return (
    <View style={{ flexDirection: "column" }}>
      <View style={styles.switchView}>
        <Text style={{ color: "white", fontSize: 17 }}>Availble At Home?</Text>
        <Switch onValueChange={toggleSwitch} value={switchValue} />
      </View>
      <View style={styles.visitorCardContainer}>
        <VisitorList data={acceptedVisitorList} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  visitorCardContainer: {
    height: height / 2,
    paddingTop: height * 0.04,
    flexDirection: "column",
    alignItems: "center",
  },
  switchView: {
    backgroundColor: "#827397",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Homescreen;
