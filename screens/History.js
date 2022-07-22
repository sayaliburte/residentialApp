import React, { useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  Image,
  ScrollView,
} from "react-native";
import { List, Card, Button, Paragraph, IconButton } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import * as visitorInfoActions from "../store/actions/VisitorInfo";

const VisitorList = (props) => {
  const memberData = useSelector((state) => state.member.loggedInMember);
  const allVisitors = useSelector((state) => state.visitors.visitors);
  const filterData = allVisitors.filter(
    (v) => v.memberUserId === memberData.userId
  );
  const defaultPhoto = "https://cdn-icons-png.flaticon.com/512/168/168882.png";

  return (
    <View style={styles.container}>
      <View
        style={{
          width: "100%",
          position: "absolute",
          backgroundColor: "#171717",
          opacity: 0.7,
        }}
      >
        <Text style={{ margin: 10, alignSelf: "center", color: "white" }}>
          Visitor's List
        </Text>
      </View>
      {allVisitors.length !== 0 ? (
        <View style={{ marginTop: 37 }}>
          <FlatList
            data={filterData.reverse()}
            keyExtractor={(item, index) => item.key}
            renderItem={(itemData) => {
              let date = new Date(itemData.item.date);
              let photo = itemData.item.visitorPhoto_url;

              return (
                <Card style={styles.Card}>
                  <View style={{ flexDirection: "row" }}>
                    <Card
                      style={{
                        backgroundColor: "#F2D7D9",
                        flexDirection: "column",
                      }}
                    >
                      <View style={{ margin: 7 }}>
                        <Image
                          style={{
                            width: 120,
                            height: 120,
                            borderRadius: 10,
                          }}
                          source={{ uri: photo ? photo : defaultPhoto }}
                        />

                        <Paragraph style={{ alignSelf: "center" }}>
                          {itemData.item.visitorName.toUpperCase()}
                        </Paragraph>
                        <Paragraph style={{ alignSelf: "center" }}>
                          {itemData.item.visitingReason}
                        </Paragraph>
                      </View>
                    </Card>
                    <ScrollView style={{ margin: 9, marginTop: 30 }}>
                      <Paragraph style={{ flex: 1, color: "white" }}>
                        {date.toLocaleString()}
                      </Paragraph>

                      <Paragraph style={{ flex: 1, color: "white" }}>
                        Member:{itemData.item.memberName.toUpperCase()}
                      </Paragraph>

                      <Paragraph style={{ flex: 1, color: "white" }}>
                        Flat no.: {itemData.item.flatno}
                      </Paragraph>

                      <Paragraph style={{ flex: 3, color: "white" }}>
                        Request Status:{itemData.item.status}
                      </Paragraph>
                    </ScrollView>
                  </View>
                </Card>
              );
            }}
          />
        </View>
      ) : (
        <Card
          style={{
            margin: 5,
            padding: 12,
            borderRadius: 8,
            backgroundColor: "#827397",
            elevation: 5,
            shadowColor: "black",
            shadowOpacity: 0.26,
          }}
        >
          <Paragraph style={{ color: "white", alignSelf: "center" }}>
            No Visitors Added
          </Paragraph>
        </Card>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Card: {
    margin: 5,
    padding: 12,
    borderRadius: 14,
    backgroundColor: "#513252",
    elevation: 5,
    shadowColor: "black",
    shadowOpacity: 0.26,
  },
});

export default VisitorList;
