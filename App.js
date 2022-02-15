import React from "react";
import { StyleSheet, Text, View, SafeAreaView, FlatList } from "react-native";
import { List } from "react-native-paper";
import Item from "./components/UI/Item";
import Card from "./components/UI/Card";
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
];

export default function App() {
  const renderItem = (itemData) => {
    return (
      <Item
        id={itemData.item.id}
        memberName={itemData.item.memberName}
        date={itemData.item.date}
        time={itemData.item.time}
      ></Item>
    );
  };
  return (
    <View style={styles.container}>
      <Card>
        <SafeAreaView style={styles.container}>
          <FlatList
            data={DUMMY_EXPENSES}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            style={{ width: "100%" }}
          />
        </SafeAreaView>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
