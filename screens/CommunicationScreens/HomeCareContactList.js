import * as React from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from "react-native";
import { FlatList } from "react-native-web";

const HomecareMember = [
  {
    id: 1,
    name: "Manthan Bogam",
    role: "Watchman",
    phone: 9403328590,
    id: 2,
    name: "Vandana Pandey",
    role: "Maid",
    phone: 9403320009,
    id: 3,
    name: "Deepali Patil",
    role: "Maid",
    phone: 9003328590,
    id: 4,
    name: "Raksha Dixit",
    role: "Watchman",
    phone: 9403328589,
    id: 5,
    name: "Rahul Mahajan",
    role: "Pulmber",
    phone: 8903328590,
    id: 6,
    name: "Alpesh Kadam",
    role: "Chairman",
    phone: 8903328780,
  },
];
const HomeCareContactList = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={HomecareMember}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <TouchableOpacity onPress={() => {}}></TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeCareContactList;
