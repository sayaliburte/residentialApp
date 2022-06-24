import * as React from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  FlatList,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Button, Card, Title, Paragraph, List } from "react-native-paper";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
const HomecareMember = [
  {
    id: 1,
    name: "Manthan Bogam",
    role: "Watchman",
    phone: 7743870932,
  },
  {
    id: 2,
    name: "Vandana Pandey",
    role: "Maid",
    phone: 7743870932,
  },
  {
    id: 3,
    name: "Deepali Patil",
    role: "Maid",
    phone: 7743870932,
  },
  {
    id: 4,
    name: "Raksha Dixit",
    role: "Watchman",
    phone: 7743870932,
  },
  {
    id: 5,
    name: "Rahul Mahajan",
    role: "Pulmber",
    phone: 8087309626,
  },
  {
    id: 6,
    name: "Alpesh Kadam",
    role: "Chairman",
    phone: 8087309626,
  },
];
const HomeCareContactList = () => {
  const call = (no) => {
    let phoneNumber = "";
    phoneNumber = `tel:${no}`;
    Linking.openURL(phoneNumber);
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={HomecareMember}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <Card>
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "#CAF0F8",
                borderRadius: 10,
                margin: 10,
                alignItems: "center",
                justifyContent: "space-around",
                padding: 10,
              }}
            >
              <View style={{ flex: 1 }}>
                <List.Icon icon="account" />
              </View>
              <View style={{ flex: 2, padding: 5 }}>
                <Text style={{ fontWeight: "bold" }}>{itemData.item.name}</Text>
              </View>
              <View style={{ flex: 2, padding: 5 }}>
                <Text style={{ fontWeight: "bold" }}>{itemData.item.role}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <FontAwesome5
                  name="phone"
                  size={24}
                  color="#1C6DD0"
                  onPress={call.bind(this, itemData.item.phone)}
                />
              </View>
            </View>
          </Card>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    margin: 10,
  },
});

export default HomeCareContactList;
