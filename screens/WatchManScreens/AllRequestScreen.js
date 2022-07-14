import React, { useState, useEffect, Fragment } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  Image,
  ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  List,
  Card,
  Button,
  Paragraph,
  Snackbar,
  IconButton,
} from "react-native-paper";
import AntDesign from "react-native-vector-icons/AntDesign";
import * as visitorInfoActions from "../../store/actions/VisitorInfo";
const AllRequestScreen = () => {
  const dispatch = useDispatch();
  const allVisitors = useSelector((state) => state.visitors.visitors);

  const todayFullDate = new Date();
  const todayDate = todayFullDate.getDate();
  const todayMonth = todayFullDate.getMonth() + 1;
  const todayYear = todayFullDate.getFullYear();
  const filterData = allVisitors.filter((visitor) => {
    let date = new Date(visitor.date);
    let dateDay = date.getDate();
    let dateMonth = date.getMonth() + 1;
    let dateYear = date.getFullYear();
    return (
      dateDay === todayDate &&
      todayMonth === dateMonth &&
      dateYear === todayYear &&
      visitor.active === true
    );
  });
  const deleteHandler = (key) => {
    try {
      dispatch(visitorInfoActions.delete_visitor(key));
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <View>
        <FlatList
          data={filterData}
          keyExtractor={(item, index) => item.key}
          renderItem={(itemData) => {
            let date = new Date(itemData.item.date);
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
                        style={{ width: 120, height: 120, borderRadius: 10 }}
                        source={{ uri: itemData.item.visitorPhoto_url }}
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
                      {date.getHours() + ":" + date.getMinutes()}
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
                    {itemData.item.status==="Pending"?
                      <IconButton
                      style={{
                        justifyContent: "flex-end",
                        alignSelf: "flex-end",
                      }}
                      icon="delete-outline"
                      color="white"
                      size={35}
                      onPress={deleteHandler.bind(this, itemData.item.key)}
                    />:null}
                  </ScrollView>
                </View>
              </Card>
            );
          }}
        />
      </View>
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
    borderRadius: 8,
    backgroundColor: "#827397",
    elevation: 5,
    shadowColor: "black",
    shadowOpacity: 0.26,
  },
});
export default AllRequestScreen;
