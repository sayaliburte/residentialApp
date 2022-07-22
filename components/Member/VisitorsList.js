import React, { useState } from "react";
import { StyleSheet, View, FlatList, Image } from "react-native";
import { List, Card, Button } from "react-native-paper";

const VisitorList = (props) => {
  return (
    <Card style={{ width: "80%", borderRadius: 25 }} elevation={20}>
      <Card.Title
        title="Accepted Visitor's List"
        style={styles.cardTitle}
        titleStyle={{
          color: "white",
          alignSelf: "center",
        }}
      />
      <FlatList
        data={props.data.reverse()}
        renderItem={(itemData) => {
          let mydate = new Date(itemData.item.acceptedDate);
          let mdate = mydate.toLocaleString();

          return (
            <View>
              <Card.Content>
                <List.Item
                  style={{ height: 80 }}
                  left={(props) => <List.Icon {...props} icon="account" />}
                  title={itemData.item.visitorName}
                  description={itemData.item.visitingReason + " " + mdate}
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
