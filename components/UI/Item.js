import { StyleSheet, Text, View } from "react-native";

const Card = (props) => {
  return <View style={styles.container}>
      <View>
          <Text>{props.memberName}</Text>
      </View>
      <View>
          <Text>{props.date}</Text>
      </View>
      <View>
          <Text>{props.time}</Text>
      </View>
  </View>;
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: "100%",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    overflow: "hidden",
    marginVertical: 10,
  },
});
export default Card;
