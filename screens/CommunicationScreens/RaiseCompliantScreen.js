import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Button, Card, Title, Paragraph } from "react-native-paper";

const Complaints = [
  {
    id: 1,
    memberName: "Rahul Deshpande",
    flatNo:301,
    reason: "Water Problem",
    description: "Water Problem at Flat No:343",
    date: "11/5/2022",
    time: "9 PM",
    photo: {
      uri: "https://images.alphacoders.com/695/thumb-350-695222.jpg",
    },
  },
  {
    id: 2,
    memberName: "Ram Deshpande",
    flatNo:304,
    reason: "Electricity Problem",
    description: "Electricity Problem",
    date: "12/5/2022",
    time: "9 PM",
    photo: {
      uri: "https://images.unsplash.com/photo-1620766165457-a8025baa82e0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bmF0dXJlJTIwb2YlMjBpbmRpYXxlbnwwfHwwfHw%3D&w=1000&q=80",
    },
  },
  {
    id: 3,
    memberName: "Ram Deshpande",
    flatNo:309,
    reason: "Water Problem",
    description: "Water Problem",
    date: "12/5/2022",
    time: "9 PM",
    photo: {
      uri: "https://images.unsplash.com/photo-1620766165457-a8025baa82e0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bmF0dXJlJTIwb2YlMjBpbmRpYXxlbnwwfHwwfHw%3D&w=1000&q=80",
    },
  },
  {
    id: 4,
    memberName: "Chanakya Lahiri",
    flatNo:201,
    reason: "Garbage Problem",
    description: "Garbage Problem",
    date: "20/5/2022",
    time: "10 PM",
    photo: {
      uri: "https://media.istockphoto.com/photos/green-leaf-with-dew-on-dark-nature-background-picture-id1050634172?b=1&k=20&m=1050634172&s=612x612&w=0&h=sh2TOgvqIAKds3eIDvIKW9nTLTRb3hA5BuSYsrHLkJ0=",
    },
  },
  {
    id: 5,
    memberName: "Snehal Salunke",
    flatNo:204,
    reason: "Water Problem",
    description: "Water Problem",
    date: "10/5/2022",
    time: "3 PM",
    photo: {
      uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS20jPhg9mwaTRRauwiJUSHaTK0GYVgJY0qoQ&usqp=CAU",
    },
  },
  {
    id: 6,
    memberName: "Pradip Baviskar",
    flatNo:203,
    reason: "Light Problem",
    description: "Light Problem",
    date: "6/5/2022",
    time: "2 PM",
    photo: {
      uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS20jPhg9mwaTRRauwiJUSHaTK0GYVgJY0qoQ&usqp=CAU",
    },
  },
];

const RaiseComplaintScreen = ({ navigation }) => {
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          style={{ borderRadius: 13 }}
          icon="plus"
          color="#FF85B3"
          mode="contained"
          onPress={showModal}
        >
          Raise Complaint
        </Button>
      </View>

      <View style={{ flex: 1, padding: 10 }}>
        <FlatList
          data={Complaints}
          keyExtractor={(item, index) => item.id}
          renderItem={(itemData) => (
            <TouchableOpacity 
              onPress={() => {
                navigation.navigate("DetailView", {
                  date: itemData.item.date,
                  flatNo: itemData.item.flatNo,
                  reason: itemData.item.memberName,
                  memberName:itemData.item.reason,
                  photo:itemData.item.photo
                });
              }}
            >
              <Card style={styles.Card}>
                <Card.Content>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View>
                      <Paragraph>{itemData.item.date}</Paragraph>
                    </View>
                    <View>
                      <Paragraph>{itemData.item.time}</Paragraph>
                    </View>
                  </View>
                  <View>
                    <Title>{itemData.item.reason}</Title>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View>
                      <Paragraph>{itemData.item.description}</Paragraph>
                    </View>
                    <View>
                      <AntDesign
                        name="delete"
                        size={30}
                        color="#000"
                        onPress={() => {
                          console.log("Hii");
                        }}
                      />
                    </View>
                  </View>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          )}
        />
      </View>
      <Modal animationType="slide" transparent={true} visible={visible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <View
              style={{ backgroundColor: "#FF85B3", justifyContent: "center" }}
            >
              <Text>Raise Complaints Here</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.modalText}>Name:</Text>
              <TextInput style={styles.textInput} />
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.modalText}>Flat No:</Text>
              <TextInput style={styles.textInput} />
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.modalText}>Reason:</Text>
              <TextInput style={styles.textInput} />
            </View>
            <View style={{ margin: 5 }}>
              <TextInput
                style={{
                  borderBottomColor: "black",
                  borderWidth: 1,
                  height: 90,
                }}
              ></TextInput>
            </View>
            <View style={{ margin: 10 }}>
              <Button
                icon="plus"
                color="#FF85B3"
                mode="contained"
                onPress={() => {}}
              >
                Add Photo
              </Button>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Button color="#FF85B3" mode="contained" onPress={() => {}}>
                Save
              </Button>
              <Button color="#FF85B3" mode="contained" onPress={hideModal}>
                close
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    margin: 10,
    alignSelf: "center",
    color: "#FF85B3",
    width: 200,
  },
  Card: {
    margin: 5,
    borderRadius: 8,
    backgroundColor: "#EADEDE",
    justifyContent: "space-between",
    elevation: 5,
    shadowColor: "black",
    shadowOpacity: 0.26,
  },
  modalContainer: {
    alignItems: "center",
  },
  modalView: {
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    margin: 90,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  textInput: {
    marginBottom: 20,
    //paddingHorizontal: 2,
    //paddingVertical: 5,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    width: 150,
  },
});
export default RaiseComplaintScreen;
