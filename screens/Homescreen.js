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
import { List, Card, Button } from "react-native-paper";;
const { width, height } = Dimensions.get("window");
import * as visitorInfoActions from "../store/actions/VisitorInfo";
import * as authActions from "../store/actions/auth";
import * as memberActions from "../store/actions/member";
const Homescreen = ({ navigation }) => {
  const memberData = useSelector((state) => state.member.loggedInMember);
  const allVisitors = useSelector((state) => state.visitors.visitors);
  const [switchValue, setSwitchValue] = useState(memberData.availabilityStatus);
  const [error, setError] = useState();
  
  useEffect(() => {
    try {
      dispatch(visitorInfoActions.fetch_visitors());
    } catch (err) {
      console.log(err.message);
    }
  }, [dispatch]);
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

  const acceptedVisitorList = allVisitors.filter(
    (v) => v.status === "Accepted" && v.memberUserId===memberData.userId
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
