import React from "react";
import { View, Text, StyleSheet } from "react-native";

const DetailViewOfScreens = ({ route }) => {
  const { date, flatNo, reason, memberName, photo,newPostId } = route.params;
  return (
    <View>
      <Text>{console.log(newPostId)}</Text>
    </View>
  );
};

const style = StyleSheet.create({});

export default DetailViewOfScreens;
