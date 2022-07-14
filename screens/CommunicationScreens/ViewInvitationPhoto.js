import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Image,
} from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const ViewInvitationPhoto = ({ navigaton, route }) => {
  const { photo } = route.params;

  let url1 = `${photo}`;

  const arr = [{ url: url1 }];

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <ImageViewer imageUrls={arr} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default ViewInvitationPhoto;
