import React, { useState } from "react";
import { StyleSheet, View, FlatList, Image } from "react-native";
import { List, Card, Button } from "react-native-paper";

const VisitorList = (props) => {
  return (
    <Card style={{ width: "80%", borderRadius: 25 }} elevation={20}>
      <Card.Title
        title="Visitor's List"
        style={styles.cardTitle}
        titleStyle={{
          color: "white",
          alignSelf: "center",
        }}
      />
      <FlatList
        data={props.data}
        renderItem={(itemData) => {
          let date = new Date(itemData.item.acceptedDate);
          return (
            <View>
              <Card.Content>
                <List.Item
                  style={{ height: 80 }}
                  left={(props) => <List.Icon {...props} icon="account" />}
                  title={itemData.item.visitorName}
                  description={
                    itemData.item.visitingReason +
                    " " +
                    date.getDate() +
                    "-" +
                    (date.getMonth() + 1) +
                    "-" +
                    date.getFullYear() +
                    " " +
                    " " +
                    date.getHours() +
                    ":" +
                    date.getMinutes()
                  }
                />
              </Card.Content>
            </View>
          );
        }}
        keyExtractor={(item) => item.key}
      />
      <Card.Actions></Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardTitle: {
    backgroundColor: "#8100ff",
    borderRadius: 15,
  },
});

export default VisitorList;
