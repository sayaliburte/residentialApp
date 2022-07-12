import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, ActivityIndicator, View } from "react-native";
import { List, Card, Button } from "react-native-paper";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import GridTile from "../components/UI/GridTile";
import { useDispatch } from "react-redux";
import * as communicationActions from "../store/actions/communication";
const communicationContent = [
  {
    id: 1,
    screenName: "Raise Complaints",
    icon: <AntDesign name="form" size={40} color="#000" />,
    screen: "RaiseComplaintScreen",
  },
  {
    id: 2,
    screenName: "Post New Ideas/Vote",
    icon: <Ionicons name="ios-people-circle-outline" size={40} color="#000" />,
    screen: "PostNewIdeas",
  },
  {
    id: 3,
    screenName: "Search HomeCare Members",
    icon: <MaterialIcons name="contact-phone" size={40} color="#000" />,
    screen: "HomeCareContactList",
  },
  
  {
    id: 4,
    screenName: "View Notices",
    icon: <MaterialIcons name="notifications-active" size={40} color="#000" />,
    screen: "NoticeBoard",
  },
  {
    id: 5,
    screenName: "Add Maintenance Details",
    icon: <MaterialCommunityIcons name="billboard" size={40} color="#000" />,
    screen: "AddMaintenanceDetails",
  },
  {
    id:""
  }
];
const Communication = ({ navigation }) => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const loadMembers = async () => {
      try {
        await dispatch(communicationActions.fetch_communications());
      } catch (err) {
        console.log(err.message);
      }
      setIsLoading(false);
    };
    loadMembers();
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  const renderGridItem = (itemData) => {
    return (
      <GridTile
        title={itemData.item.screenName}
        icon={itemData.item.icon}
        arrayIndex={itemData.item}
        color="pink"
        onSelect={() => {
          navigation.navigate(itemData.item.screen);
        }}
      />
    );
  };
  return (
    <FlatList
      keyExtractor={(item, index) => item.screenName}
      data={communicationContent}
      renderItem={renderGridItem}
      numColumns={2}
    />
  );
};

const styles = StyleSheet.create({
  cardTitle: {
    backgroundColor: "#8100ff",
    borderRadius: 15,
  },
});

export default Communication;
