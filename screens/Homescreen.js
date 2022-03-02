import React, { useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  ImageBackground,
  Dimensions,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";

import VisitorList from "../components/Member/VisitorsList";

import BannerComponent from "../components/UI/BannerComponent";
const { width, height } = Dimensions.get("window");
const visitorRequest = [
  {
    vid: 1,
    photo: {
      uri: "https://images.alphacoders.com/695/thumb-350-695222.jpg",
    },
    role:"Courier Boy",
    reason:"For Parcel",
    visitorName: "Sanket khardekar",
  },
  {
    vid: 2,
    photo: "",
    role:"Maid",
    reason:"Household",
    visitorName: "Rahul gdgfdfr",
  },
  {
    vid: 3,
    visitorName: "Shruti resdfs",
    role:"",
    reason:"",
  },
  {
    vid: 4,
    visitorName: "Hello resfser",
    role:"sdf",
    reason:"dfsd",
  },
  {
    vid: 5,
    visitorName: "Sanket rfrf",
    role:"",
    reason:"",
  },
  {
    vid: 6,
    visitorName: "Hello",
    role:"",
    reason:"",
  },
  {
    vid: 7,
    visitorName: "Sanket sfs",
    role:"",
    reason:"",
  },
];
const DUMMY_EXPENSES = [
  {
    id: "e1",
    memberName: "Ram",
    date: "5/2/2022",
    time: "4:50 pm",
  },
  {
    id: "e2",
    memberName: "Rahul",
    date: "4/2/2022",
    time: "4:55 pm",
  },
  { id: "e3", memberName: "Sayali", date: "15/2/2022", time: "4:55 pm" },
  {
    id: "e4",
    memberName: "Sanket",
    date: "14/2/2022",
    time: "4:55 pm",
  },
  {
    id: "e5",
    memberName: "Sayali",
    date: "11/2/2022",
    time: "1:45 pm",
  },
  {
    id: "e6",
    memberName: "Sayali",
    date: "11/2/2022",
    time: "1:45 pm",
  },
  {
    id: "e7",
    memberName: "Sayali",
    date: "11/2/2022",
    time: "1:45 pm",
  },
  {
    id: "e8",
    memberName: "Sayali",
    date: "11/2/2022",
    time: "1:45 pm",
  },
];

const Homescreen = ({ navigation }) => {
  const [visible, setVisible] = useState(true);
  const actions = [
    {
      label: "View",
      onPress: () =>
        navigation.navigate("IncomingRequestScreen", { data: visitorRequest }),
    },
    {
      label: "Dismiss",
      onPress: () => setVisible(false),
    },
  ];

  return (
    <View style={{ flexDirection: "column" }}>
      <View></View>
      {visitorRequest.length > 0 ? (
        <BannerComponent
          visible={visible}
          actions={actions}
          description={`Dear Sanket,You have ${visitorRequest.length} visitor request pending`}
          visitorArray={visitorRequest}
        />
      ) : (
        <View></View>
      )}

      <View
        style={
          visitorRequest.length > 0
            ? styles.visitorCardContainer2
            : styles.visitorCardContainer
        }
      >
        <VisitorList data={DUMMY_EXPENSES} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  visitorCardContainer: {
    height: height / 2,
    paddingTop: height * 0.15,
    flexDirection: "column",
    alignItems: "center",
  },

  visitorCardContainer2: {
    height: height / 2,
    paddingTop: height * 0.1,
    flexDirection: "column",
    alignItems: "center",
  },
});
export default Homescreen;
