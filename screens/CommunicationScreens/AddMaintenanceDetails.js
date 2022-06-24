import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  LogBox,
} from "react-native";
import { Button, Card, Paragraph, Title } from "react-native-paper";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Dropdown } from "react-native-material-dropdown-v2-fixed";

const maintenanceDetails = [
  {
    id: 1,
    date: "12/4/2022",
    month: "Apr 2022",
    amount: "1000 Rs",
    transId: 676789809332,
    photo: {
      uri: "https://aws1.discourse-cdn.com/business5/uploads/manager1/original/2X/3/3de4cad4b5c61419a030aadaa83244e7e80ea679.png",
    },
  },
  {
    id: 2,
    date: "16/4/2022",
    month: "Apr 2022",
    amount: "1000 Rs",
    transId: 690789809332,
    photo: {
      uri: "https://aws1.discourse-cdn.com/business5/uploads/manager1/original/2X/3/3de4cad4b5c61419a030aadaa83244e7e80ea679.png",
    },
  },
  {
    id: 3,
    date: "20/3/2022",
    month: "March 2022",
    amount: "1000 Rs",
    transId: 69078999332,
    photo: {
      uri: "https://aws1.discourse-cdn.com/business5/uploads/manager1/original/2X/3/3de4cad4b5c61419a030aadaa83244e7e80ea679.png",
    },
  },
  {
    id: 4,
    date: "20/2/2022",
    month: "March 2022",
    amount: "1000 Rs",
    transId: 69078990332,
    photo: {
      uri: "https://aws1.discourse-cdn.com/business5/uploads/manager1/original/2X/3/3de4cad4b5c61419a030aadaa83244e7e80ea679.png",
    },
  },
];

let data = [
  { value: "Jan" },
  {
    value: "Feb",
  },
  {
    value: "Mar",
  },
  { value: "Apr" },
  {
    value: "May",
  },
  {
    value: "Jun",
  },
  {
    value: "Jul",
  },
  {
    value: "Aug",
  },
  {
    value: "Sept",
  },
  {
    value: "Oct",
  },
  {
    value: "Nov",
  },
  {
    value: "Dec",
  },
];

const AddMaintenanceDetails = ({ navigation }) => {
  useEffect(() => {
    LogBox.ignoreLogs(["Animated: `useNativeDriver`"]);
    LogBox.ignoreLogs([
      "componentWillReceiveProps has been renamed, and is not recommended for use.",
    ]);
  }, []);
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState("");
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  //for month date
  const [date, setDate] = useState(new Date());

  //const showPicker = (value) => setShow(value);

  const onValueChange = (event, newDate) => {
    const selectedDate = newDate || date;
    setDate(selectedDate);
  };
  const change = (value) => {
    setValue(value);
  };
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          style={{ borderRadius: 13 }}
          icon="plus"
          color="#3D2C8D"
          mode="contained"
          onPress={showModal}
        >
          ADD MAINTENANCE DETAILS
        </Button>
      </View>
      <View style={{ paddingBottom: 50, margin: 10 }}>
        <FlatList
          data={maintenanceDetails}
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
                <Card.Content
                  style={{
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <Title>{itemData.item.month}</Title>
                  <Title>{itemData.item.date}</Title>
                </Card.Content>
                <Card.Cover
                  style={{ height: 120, margin: 10 }}
                  source={itemData.item.photo}
                />
              </Card>
            </TouchableOpacity>
          )}
        ></FlatList>
      </View>
      <View>
        <Modal animationType="slide" transparent={true} visible={visible}>
          <View style={styles.modalContainer}>
            <View
              style={{
                backgroundColor: "#3D2C8D",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "white" }}>MAINTENANCE DETAILS</Text>
            </View>
            <View style={{ flexDirection: "row", marginVertical: 15 }}>
              <Text>Flat No:</Text>
              <TextInput style={styles.textInput}></TextInput>
            </View>
            <View style={{ marginVertical: 15, width: 200, height: 40 }}>
              <Dropdown
                icon="chevron-down"
                iconColor="#E1E1E1"
                label="Month"
                useNativeDriver={true}
                data={data}
                value={value}
                onChangeText={change}
              />
            </View>
          
            <View style={{ flexDirection: "row", marginVertical: 30 }}>
              <Text>Amount:</Text>
              <TextInput keyboardType="number-pad" style={styles.textInput}></TextInput>
            </View>
            <View style={{ flexDirection: "row", marginVertical: 5 }}>
              <Text>Transaction Id:</Text>
              <TextInput style={styles.textInput}></TextInput>
            </View>
            <View>
              <TextInput
                style={{ borderWidth: 1, margin: 10, height: 90 }}
              ></TextInput>
              <Button
                style={{ borderRadius: 13 }}
                icon="plus"
                color="#3D2C8D"
                mode="contained"
                onPress={() => {}}
              >
                ADD PHOTO
              </Button>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                margin: 10,
              }}
            >
              <Button
                style={{ borderRadius: 13, margin: 5 }}
                icon=""
                color="#3D2C8D"
                mode="contained"
                onPress={() => {}}
              >
                SAVE
              </Button>
              <Button
                style={{ borderRadius: 13, margin: 5 }}
                icon=""
                color="#3D2C8D"
                mode="contained"
                onPress={hideModal}
              >
                CANCEL
              </Button>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  card: {
    margin: 5,
    backgroundColor: "#BFA2DB",
    elevation: 15,
    shadowColor: "black",
    shadowOpacity: 3,
    borderRadius: 20,
  },
  modalContainer: {
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    marginTop: 40,
    elevation: 100,
    shadowColor: "black",
    shadowOpacity: 40,
    borderRadius: 20,
  },
  textInput: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    width: 150,
  },
});
export default AddMaintenanceDetails;
