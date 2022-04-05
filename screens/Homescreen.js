import React, { useState, useLayoutEffect } from "react";
import { StyleSheet, View, Dimensions } from "react-native";

import VisitorList from "../components/Member/VisitorsList";
import { Button } from "react-native-paper";

import BannerComponent from "../components/UI/BannerComponent";
const { width, height } = Dimensions.get("window");
const allVisitorData = [
  {
    vid: 1,
    photo: {
      uri: "https://images.alphacoders.com/695/thumb-350-695222.jpg",
    },
    role: "Courier Boy",
    reason: "For Parcel",
    visitorName: "Sayali Burte",
    dateTime: "5/6/2022 06:33",
    requestStatus:"accepted"
  },
  {
    vid: 2,
    photo: "",
    role: "Maid",
    reason: "Household",
    visitorName: "Sanket Khardekar",
    dateTime: "5/6/2022 06:33",
    requestStatus:"accepted"
  },
  {
    vid: 3,

    role: "Maid",
    reason: "Household",
    visitorName: "Shital Bhosale",
    dateTime: "5/6/2022 06:33",
    requestStatus:"accepted"
  },
  {
    vid: 4,
    photo: "",
    role: "Maid",
    reason: "Guest",
    visitorName: "Chanakya Lahiri",
    dateTime: "5/6/2022 06:33",
    requestStatus:"accepted"
  },
  {
    vid: 5,
    photo: "",
    role: "Maid",
    reason: "Household",
    visitorName: "Shivani",
    dateTime: "5/6/2022 06:33",
    requestStatus:"decline"
  },
  
];

const Homescreen = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          icon="account-box"
          labelStyle={{ fontSize: 27 }}
          onPress={() => console.log("Pressed")}
          title=""
          color="white"
        />
      ),
    });
  }, [navigation]);
  const [visible, setVisible] = useState(true);
  const actions = [
    {
      label: "View",
      onPress: () => navigation.navigate("IncomingRequestScreen"),
    },
    {
      label: "Dismiss",
      onPress: () => setVisible(false),
    },
  ];

  const acceptedVisitorList=allVisitorData.filter(v=>v.requestStatus==="accepted");
 
  return (
    <View style={{ flexDirection: "column" }}>
      <View style={styles.visitorCardContainer}>
        <VisitorList data={acceptedVisitorList} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  visitorCardContainer: {
    height: height / 2,
    paddingTop: height * 0.1,
    flexDirection: "column",
    alignItems: "center",
  },
});
export default Homescreen;
