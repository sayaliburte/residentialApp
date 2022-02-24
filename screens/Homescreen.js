import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ImageBackground,
  Dimensions,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import {
  List,
  Card,
  Button,
  Appbar,
  Paragraph,
  Dialog,
  Portal,
  Provider,
  Title,
  Avatar,
  Banner,
} from "react-native-paper";
import BannerComponent from "../components/BannerComponent";
const { width, height } = Dimensions.get("window");
const visitorRequest = [
  {
    vid: 1,
    visitorName: "Sanket",
  },
  {
    vid: 2,
    visitorName: "Rahul",
  },
  {
    vid: 3,
    visitorName: "Shruti",
  },
  {
    vid: 4,
    visitorName: "Hello",
  },
  {
    vid: 5,
    visitorName: "Sanket",
  },
];
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
  {
    id: "e5",
    memberName: "Sayali",
    date: "11/2/2022",
    time: "1:45 pm",
  },
  {
    id: "e6",
    memberName: "Sayali",
    date: "11/2/2022",
    time: "1:45 pm",
  },
  {
    id: "e7",
    memberName: "Sayali",
    date: "11/2/2022",
    time: "1:45 pm",
  },
  {
    id: "e8",
    memberName: "Sayali",
    date: "11/2/2022",
    time: "1:45 pm",
  },
];

const Homescreen = () => {
  const [visible, setVisible] = useState(true);
  const actions = [
    
      {
        label: "Fix it",
        onPress: () => setVisible(false),
      },
      {
        label: "Learn more",
        onPress: () => setVisible(false),
      },
          
  ];
  const image={
    uri: "https://www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png",
  }
  return (
    <View style={{ flexDirection: "column" }}>
      <View>
        <Appbar.Header>
          <Appbar.Content title="Residential App" subtitle="Welcome Sanket" />
          <Appbar.Action
            icon="account-circle"
            onPress={() => {
              console.log("Hii");
            }}
          />
        </Appbar.Header>
      </View>
      {visitorRequest.length > 0 ? (
        <BannerComponent visible={visible} image={image} actions={actions} visitorArray={visitorRequest} />
      ) : (
        <View></View>
      )}

      <View
        style={
          visitorRequest.length > 0
            ? styles.visitorCardContainer2
            : styles.visitorCardContainer
        }
      >
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
            data={DUMMY_EXPENSES}
            renderItem={(itemData) => (
              <View>
                <Card.Content>
                  <List.Item
                    left={(props) => <List.Icon {...props} icon="account" />}
                    title={itemData.item.memberName}
                    description={itemData.item.date + " " + itemData.item.time}
                  />
                </Card.Content>
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
          <Card.Actions>
            <Button>View More</Button>
          </Card.Actions>
        </Card>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  visitorCardContainer: {
    height: height / 2,
    paddingTop: height * 0.15,
    flexDirection: "column",
    alignItems: "center",
  },

  visitorCardContainer2: {
    height: height / 2,
    paddingTop: height * 0.1,
    flexDirection: "column",
    alignItems: "center",
  },
  cardTitle: {
    backgroundColor: "#8100ff",
    borderRadius: 15,
  },
});
export default Homescreen;
