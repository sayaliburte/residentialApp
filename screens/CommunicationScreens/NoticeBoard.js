import * as React from "react";
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { Button, Card, Paragraph } from "react-native-paper";
import AntDesign from "react-native-vector-icons/AntDesign";
const Notices = [
  {
    id: 1,
    date: "12/3/2022",
    description: "Meeting between 8pm to 9 pm",
    photo: {
      uri: "https://hi-static.z-dn.net/files/dce/77eccbb9c5928e34f7f48189da32afcf.jpg",
    },
  },
  {
    id: 2,
    date: "12/5/2022",
    description: "Maintenance Remainder",
    photo: {
      uri: "https://hi-static.z-dn.net/files/d82/fd7820ac067bf2cc65407df59e6e97e4.jpg",
    },
  },
  {
    id: 3,
    date: "2/10/2020",
    description: "Fund Donation",
    photo: {
      uri: "https://wb-qb-sg-oss.bytededu.com/1601700578878419977-7d09e076-3ffc-426f-bbdf-c7d4c7367fe5",
    },
  },
  {
    id: 4,
    date: "26/10/2018",
    description: "Diwali Celebration Meeting",
    photo: {
      uri: "https://hi-static.z-dn.net/files/da8/e14a5313e15a68257f2066753800dd19.jpg",
    },
  },
  {
    id: 5,
    date: "26/10/2018",
    description: "Society Meeting",
    photo: {
      uri: "https://hi-static.z-dn.net/files/d45/8064b52112ec651f239d30aa764fdd57.jpg",
    },
  },
];
const NoticeBoard = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={{ paddingBottom: 10,margin: 10 }}>
        <FlatList
          data={Notices}
          keyExtractor={(item) => item.id}
          renderItem={(itemData) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("InvitationPhoto", {
                  photo: itemData.item.photo.uri,
                });
              }}
            >
                 <Card style={styles.card}>
                <Card.Cover
                  style={{ height: 120 }}
                  source={itemData.item.photo}
                />

                <Card.Content
                  style={{
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <Paragraph style={{color:"white"}}>{itemData.item.description}</Paragraph>
                 <Paragraph style={{color:"white"}}>{itemData.item.date}</Paragraph>
                  
                </Card.Content>
              </Card>
            </TouchableOpacity>
          )}
        ></FlatList>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    margin: 10,
    backgroundColor: "#827397",
    elevation: 5,
    shadowColor: "black",
    shadowOpacity: 0.3,
  },
  modalContainer: {
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 30,
    padding: 35,
    marginTop: 90,
  },
  textInput: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    width: 150,
  },
});
export default NoticeBoard;
