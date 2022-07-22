import React, { useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  Image,
  ScrollView,
  ImageBackground,
} from "react-native";
import { List, Card, Button, Paragraph,Caption } from "react-native-paper";
import { useDispatch } from "react-redux";
import * as authActions from "../store/actions/auth";
const ValidateMemberScreen = () => {
  const dispatch = useDispatch();
  return (
    <ImageBackground
      source={{
        uri: "https://img.freepik.com/free-vector/university-college-building-education-student-flat-campus-design-graduation-university_1284-41481.jpg?size=626&ext=jpg&ga=GA1.2.1839775851.1657889163",
      }}
      resizeMode="cover"
      style={{ flex: 1,alignSelf:"center",justifyContent:"center" }}
    >
      <View
        style={{
          backgroundColor: "white",
          margin: 10,
          borderRadius: 10,
          padding: 6,alignSelf:"center",justifyContent:"center"
        }}
      >
       
        <View>
          <Caption style={{ color: "black",fontSize:15 }}>
            Successfully Registered..Wait for Chairperson to add you in society
          </Caption>
        </View>
        <View>
          <Button
            icon="logout"
            mode="outlined" 
            style={{width:'50%',alignSelf:"center",margin:5}}
            labelStyle={{ fontSize:15 }}
            onPress={() => {
              dispatch(authActions.logout());
            }}
            title=""
            color=""
          >Logout</Button>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {},
});

export default ValidateMemberScreen;
