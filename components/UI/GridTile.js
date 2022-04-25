import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableNativeFeedback,
  Dimensions,
} from "react-native";

const width1 = Dimensions.get("window").width;
const GridTile = (props) => {
  const classes =
    props.arrayIndex.id == "" ? styles.gridForLast : styles.gridItem;

  return (
    <View style={classes}>
      {props.arrayIndex.id == "" ? (
        <View></View>
      ) : (
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={props.onSelect}
        >
          <View
            style={{
              ...styles.container,
              ...{
                backgroundColor: "#63a4ff",
                backgroundImage: "linear-gradient(315deg, #63a4ff 0%, #83eaf1 74%)"
                
              },
            }}
          >
            <View>
              <View style={styles.image}>{props.icon}</View>
              <Text style={styles.title} numberOfLines={3}>
                {props.title}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 15,
    height: 150,

    borderRadius: 10,
    overflow:
      Platform.OS === "android" && Platform.Version >= 21
        ? "hidden"
        : "visible",
    elevation: 5,
  },
  container: {
    flex: 1,
    borderRadius: 5,

    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
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
    margin: 15,
    height: 150,
  },
});

export default GridTile;
