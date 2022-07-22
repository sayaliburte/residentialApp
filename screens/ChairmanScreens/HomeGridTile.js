import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Platform,
  Image,
  Alert,
  TouchableNativeFeedback,
  Dimensions,
} from "react-native";
import { List, Card, Button, Paragraph, Snackbar } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import * as memberActions from "../../store/actions/member";
import * as authActions from "../../store/actions/auth";
const HomeGridTile = (props) => {
  // console.log(props.count);
  const [error, setError] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const defaultImage = "https://img.icons8.com/fluency/2x/add-user-male.png";

  const addMember = (key) => {
    try {
      dispatch(memberActions.validate_member(key));
    } catch (err) {
      setError(err.message);
    }
  };
  const deleteMember = (key) => {
    try {
      // dispatch(authActions.delete_member(userId));
      dispatch(memberActions.delete_member(key));
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <View style={{ width: "50%" }}>
      <View style={styles.container}>
        <View style={styles.image}>
          <Image
            style={{ width: 90, height: 90 }}
            source={{ uri: defaultImage }}
          />
        </View>
        <View style={{}}>
          <Text style={styles.title} numberOfLines={3}>
            {props.name.toUpperCase()}
          </Text>

          <Text style={styles.title} numberOfLines={3}>
            Flat No:{props.flatNumber}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignSelf: "center",
            marginLeft: 30,
          }}
        >
          <Button
            icon="check-decagram"
            labelStyle={{ fontSize: 37 }}
            onPress={addMember.bind(this, props.id)}
          ></Button>
          <Button
            icon="delete"
            labelStyle={{ fontSize: 39, color: "red" }}
            onPress={deleteMember.bind(this, props.id)}
          ></Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 230,
    backgroundColor: "white",
    borderRadius: 10,
    margin: 5,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    padding: 7,
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
    marginHorizontal: 7,
  },
  title: {
    fontSize: 15,
    textAlign: "center",
    color: "#000",
  },
  image: {
    alignItems: "center",
  },
  gridForLast: {
    flex: 1,
    margin: 8,
    height: 200,

    borderRadius: 10,
    overflow:
      Platform.OS === "android" && Platform.Version >= 21
        ? "hidden"
        : "visible",
    elevation: 5,
    width: 10,
  },
});
export default HomeGridTile;
