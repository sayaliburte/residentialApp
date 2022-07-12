import React, { useState, useEffect, useReducer, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  Alert,
  FlatList,
} from "react-native";

import {
  Avatar,
  Button,
  Card,
  List,
  Title,
  Paragraph,
} from "react-native-paper";

import { useSelector, useDispatch } from "react-redux";
const height = Dimensions.get("window").height;

const DetailViewofPostNewIdea = ({ route }) => {
  const { newPostkey } = route.params;
  const communicationData = useSelector(
    (state) => state.communication.communications
  );
  const filterCommunication = communicationData.filter(
    (comm) => comm.key === newPostkey
  );
  const temp=filterCommunication.pop();

  let mydate = new Date(temp.date);
  let dateToShow =
    mydate.getDate() +
    "-" +
    (mydate.getMonth() + 1) +
    "-" +
    mydate.getFullYear();
  let timeToShow = mydate.getHours() + ":" + mydate.getMinutes();
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <View style={{ width: "100%" }}>
          <ImageBackground
            style={{ height: height /2 }}
            source={{ uri: temp.photo_url }}
          >
            <View
              style={{
                width: "100%",
                position: "absolute",
                backgroundColor: "#171717",
                opacity: 0.7,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Paragraph style={{ color: "white" }}>{dateToShow}</Paragraph>
                <Paragraph style={{ color: "white" }}>{timeToShow}</Paragraph>
              </View>

              <View>
                <Title style={{ color: "white" }}>
                  {temp.title}
                </Title>
              </View>
            </View>
          </ImageBackground>
          <View style={{ padding: 5 }}>
            <Paragraph style={{ color: "white" }}>
              {temp.reason}
            </Paragraph>
          </View>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  card: {
    margin: 5,
    borderRadius: 10,
    backgroundColor: "#406882",
    flexDirection: "column",
    elevation: 5,
    shadowColor: "black",
    shadowOpacity: 0.26,
  },
});
export default DetailViewofPostNewIdea;
