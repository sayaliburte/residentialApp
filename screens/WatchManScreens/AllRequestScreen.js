import React, { useState, useEffect, Fragment } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useSelector } from "react-redux";
const AllRequestScreen = () => {
  return (
    <View style={styles.container}>
      <Text>AllRequestScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default AllRequestScreen;
