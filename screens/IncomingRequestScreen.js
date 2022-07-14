import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Modal,
  Image,
  Text,
  Alert,
  ScrollView,
} from "react-native";
import {
  List,
  Card,
  Button,
  TextInput,
  Paragraph,
  IconButton,
} from "react-native-paper";
import * as visitorInfoActions from "../store/actions/VisitorInfo";
import { useSelector, useDispatch } from "react-redux";
const IncomingRequestScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const [error, setError] = useState();
  const [visible, setVisible] = useState(false);
  const memberData = useSelector((state) => state.member.loggedInMember);
  const allVisitors = useSelector((state) => state.visitors.visitors);
  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);
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
      visitor.active === true &&
      visitor.status === "Pending" &&
      visitor.memberUserId === memberData.userId
    );
  });
  const reversedArray = filterData.reverse();
  const acceptHandler = (key) => {
    try {
      dispatch(visitorInfoActions.accept_Visitor(key));
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };
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
          Incoming Visitor's Requests
        </Text>
      </View>
      {filterData.length !== 0 ? (
        <View style={{ marginTop: 37 }}>
          <FlatList
            data={reversedArray}
            keyExtractor={(item, index) => item.key}
            renderItem={(itemData) => {
              let date = new Date(itemData.item.date);
              let photo = itemData.item.visitorPhoto_url;

              return (
                <Card style={styles.Card}>
                  <View style={{ flexDirection: "row" }}>
                    <Card
                      style={{
                        backgroundColor: "#F3E9DD",
                        flexDirection: "column",
                        borderRadius: 15,
                      }}
                    >
                      <View style={{ margin: 7 }}>
                        <Image
                          style={{
                            width: 120,
                            height: 125,
                            borderRadius: 10,
                          }}
                          source={{ uri: photo }}
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
                      <Paragraph style={{ color: "white" }}>
                        {date.getHours() + ":" + date.getMinutes()}
                      </Paragraph>

                      <Paragraph style={{ color: "white" }}>
                        Member:{itemData.item.memberName.toUpperCase()}
                      </Paragraph>

                      <Paragraph style={{ color: "white" }}>
                        Flat no.: {itemData.item.flatno}
                      </Paragraph>

                      <Paragraph style={{ color: "white" }}>
                        Request Status:{itemData.item.status}
                      </Paragraph>
                      {itemData.item.status === "Pending" ? (
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "flex-end",
                          }}
                        >
                          <IconButton
                            icon="account-check-outline"
                            color="white"
                            size={35}
                            onPress={acceptHandler.bind(
                              this,
                              itemData.item.key
                            )}
                          />
                          <IconButton
                            icon="delete-outline"
                            color="white"
                            size={32}
                            onPress={() => {
                              deleteHandler.bind(this, itemData.item.key);
                            }}
                          />
                        </View>
                      ) : null}
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
    borderRadius: 12,
    backgroundColor: "#363062",
    elevation: 5,
    shadowColor: "black",
    shadowOpacity: 0.28,
  },
});

export default IncomingRequestScreen;
