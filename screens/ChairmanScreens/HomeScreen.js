import React, { useState, useEffect, Fragment } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Platform,
  Text,
  Image,
  ScrollView,
} from "react-native";

import AntDesign from "react-native-vector-icons/AntDesign";
import { useSelector, useDispatch } from "react-redux";
import { List, Card, Button, Paragraph } from "react-native-paper";
import * as authActions from "../../store/actions/auth";
import * as visitorInfoActions from "../../store/actions/VisitorInfo";
import HomeGridTile from "./HomeGridTile";
import * as communicationActions from "../../store/actions/communication";
const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      dispatch(visitorInfoActions.fetch_visitors());
    } catch (err) {
      console.log(err.message);
    }
  }, [dispatch]);
  useEffect(() => {
    const loadMembers = async () => {
      try {
        await dispatch(communicationActions.fetch_communications());
      } catch (err) {
        console.log(err.message);
      }
   
    };
    loadMembers();
  }, [dispatch]);
  const allMemberData = useSelector((state) => state.member.members);
  const filterData = allMemberData.filter(
    (member) =>
      member.memberType === "member" && member.memberValidity === "Pending"
  );
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: "row" }}>
          <Button
            icon="bell"
            labelStyle={{ fontSize: 27 }}
            onPress={() => {}}
            title=""
            color="white"
          ></Button>
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

  const renderGridItem = (itemData) => {
    return (
      <HomeGridTile
        id={itemData.item.key}
        userId={itemData.item.userId}
        flatNumber={itemData.item.flatNumber}
        name={itemData.item.name}
        phone={itemData.item.phone}
      />
    );
  };

  return (
    <View>
      <View
        style={{
          width: "100%",
          position: "absolute",
          backgroundColor: "#171717",
          opacity: 0.7,
        }}
      >
        <Text style={{ margin: 10, alignSelf: "center", color: "white" }}>
          Pending Member's List
        </Text>
      </View>
      <View style={{ marginTop: 40 }}>
        <FlatList
          keyExtractor={(item, index) => item.key}
          data={filterData}
          renderItem={renderGridItem}
          numColumns={2}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;
