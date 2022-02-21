import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ImageBackground,
  Dimensions,Image
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
} from "react-native-paper";

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

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  return (
    <View style={{ flexDirection: "column" }}>
      <View>
        <Appbar.Header>
          <Appbar.Content title="Residential App" subtitle="Welcome Sanket" />
          <Appbar.Action icon="account-circle" onPress={() => {}} />
        </Appbar.Header>
      </View>
   
        <View style={styles.visitorCardContainer}>
          <Card style={{ width: "80%",borderRadius: 25 }} elevation={20}>
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
                      description={
                        itemData.item.date + " " + itemData.item.time
                      }
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
    paddingTop: height * 0.18,
    flexDirection: "column",
    alignItems: "center",
  },

  cardTitle: {
    backgroundColor: "#8100ff",borderRadius: 15
  },
});
export default Homescreen;
