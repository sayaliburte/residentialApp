import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, Modal, Image } from "react-native";
import { List, Card, Button, TextInput } from "react-native-paper";

const IncomingRequestScreen = ({ route, navigation }) => {
  // const { data, finalVisitorArray } = route.params;
  //const [modifiedData, setModifiedData] = useState(data);
  const [rejectReason, setRejectReason] = useState(false);
  const [text, setText] = useState("");
  const [idToReject, setIdToReject] = useState(0);
  const [refresh, setRefresh] = useState(false);
  /*useEffect(() => {
    setRefresh(!refresh)
  }, [setModifiedData,setRefresh]);
  const handleDeleteVisitor = () => {
    const tempdata = modifiedData.filter(
      (filterData) => filterData.vid === idToReject
    );
    const t = tempdata.pop();

    const addedData = { ...t, rejectedReason: text };

    finalVisitorArray.push(addedData);

    const deleteData = modifiedData.filter(
      (filterData) => filterData.vid !== idToReject
    );
    console.log(deleteData);
    setModifiedData(deleteData);

    setText("");
    setRejectReason(false);
  };

  const handleAddVisitor = (id) => {
    const tempdata = modifiedData.filter((filterData) => filterData.vid === id);
    const t = tempdata.pop();

    finalVisitorArray.push(t);background-color: #fad0c4;
      background-image: linear-gradient(315deg, #fad0c4 0%, #f1a7f1 74%);
  };*/

  const visitorRequest = [
    {
      vid: 1,
      photo: {
        uri: "https://images.alphacoders.com/695/thumb-350-695222.jpg",
      },
      role: "Guest",
      reason: "Guest",
      visitorName: "Sayali Burte",
      dateTime: "5/6/2022 06:33",
    },
    {
      vid: 2,
      photo: "",
      role: "Guest",
      reason: "Guest",
      visitorName: "Sanket Khardekar",
      dateTime: "5/6/2022 06:33",
    },
    {
      vid: 3,

      role: "Maid",
      reason: "Household",
      visitorName: "Shital Bhosale",
      dateTime: "5/6/2022 06:33",
    },
    {
      vid: 4,
      photo: "",
      role: "Courier Boy",
      reason: "Courier Boy",
      visitorName: "Chanakya Lahiri",
      dateTime: "5/6/2022 06:33",
    },
    {
      vid: 5,
      photo: "",
      role: "Guest",
      reason: "Guest",
      visitorName: "Shivani Shevale",
      dateTime: "5/6/2022 06:33",
    },
  ];

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <FlatList
        data={visitorRequest}
        renderItem={(itemData) => (
          <Card
            style={{ margin: 8, borderRadius: 15, backgroundColor: "#F6E7D8" }}
          >
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                {itemData.item.photo ? (
                  <Image
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 60,
                      margin: 6,
                    }}
                    source={itemData.item.photo}
                  />
                ) : (
                  <Image
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 60,
                      margin: 3,
                    }}
                    source={{
                      uri: "https://spng.subpng.com/20190305/opf/kisspng-computer-icons-portable-network-graphics-clip-art-conference-background-selec-icons-5c7f139f2e4071.9721598415518319671895.jpg",
                    }}
                  />
                )}
              </View>
              <View style={{ flex: 4, marginLeft: 40 }}>
                <List.Item
                  title={itemData.item.visitorName}
                  titleNumberOfLines={2}
                  description={`${itemData.item.role}\n${itemData.item.reason}`}
                />
              </View>
              <View
                style={{
                  flex: 3,
                  justifyContent: "space-around",
                  alignItems: "baseline",
                  flexDirection: "row",
                }}
              >
                <Button
                  title=""
                  color="#748DA6"
                  icon="check-circle"
                  labelStyle={{ fontSize: 46 }}
                  //  onPress={/*handleAddVisitor.bind(this, itemData.item.vid)*/}
                />
                <Button
                  title=""
                  color="#F24C4C"
                  icon="delete-forever"
                  labelStyle={{ fontSize: 50 }}
                  onPress={() => {
                    //   setIdToReject(itemData.item.vid);
                    // setRejectReason(true);
                  }}
                />
              </View>
            </View>
          </Card>
        )}
        keyExtractor={(item) => item.vid}
        // extraData={refresh}
      />

      <View style={styles.centeredView}>
        <Modal animationType="slide" transparent={true} visible={rejectReason}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TextInput
                label="Reason"
                value={text}
                style={{ width: "100%", marginBottom: 10 }}
                onChangeText={(t) => setText(t)}
              />
              <View>
                <Button mode="contained" /*onPress={handleDeleteVisitor}*/>
                  Submit
                </Button>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardTitle: {
    backgroundColor: "#8100ff",
    borderRadius: 15,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,

    width: "70%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default IncomingRequestScreen;
