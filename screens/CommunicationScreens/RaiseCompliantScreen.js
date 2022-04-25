import * as React from "react";
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { Button, Card, Title, Paragraph } from "react-native-paper";

const Complaints = [
  {
    id: 1,
    memberName: "Rahul Deshpande",
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
    reason: "Water Problem",
    description: "Water Problem",
    date: "12/5/2022",
    time: "9 PM",
    photo: {
      uri: "https://images.unsplash.com/photo-1620766165457-a8025baa82e0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bmF0dXJlJTIwb2YlMjBpbmRpYXxlbnwwfHwwfHw%3D&w=1000&q=80",
    },
  },
  {
    id: 3,
    memberName: "Ram Deshpande",
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
    reason: "Light Problem",
    description: "Light Problem",
    date: "6/5/2022",
    time: "2 PM",
    photo: {
      uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS20jPhg9mwaTRRauwiJUSHaTK0GYVgJY0qoQ&usqp=CAU",
    },
  },
];
const RaiseComplaintScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          icon="plus"
          color="#FF85B3"
          mode="contained"
          onPress={() => console.log("Pressed")}
        >
          Raise Complaint
        </Button>
      </View>

      <View style={{ flex: 1, padding: 10 }}>
        <FlatList
          data={Complaints}
          renderItem={(itemData) => (
            <TouchableOpacity>
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
                    
                  </View>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  buttonContainer: {
    alignSelf: "center",
    color: "#FF85B3",
    width: 200,
  },
  Card: {
    margin: 5,
    borderRadius: 10,
    backgroundColor: "#EADEDE",
    justifyContent: "space-between",
    elevation: 5,
    shadowColor: "black",
    shadowOpacity: 0.26,
  },
});
export default RaiseComplaintScreen;
