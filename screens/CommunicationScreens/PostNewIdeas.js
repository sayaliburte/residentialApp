import React, { useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  Dimensions,
  TextInput,
} from "react-native";
import { Button, Card, Title, Paragraph, Dialog } from "react-native-paper";
import AntDesign from "react-native-vector-icons/AntDesign";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const newPost = [
  {
    id: 1,
    memberName: "Rahul Joshi",
    flatNo: 302,
    title: "Painting in C Wing",
    description: "Painting C Wing",
    photo: {
      uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS20jPhg9mwaTRRauwiJUSHaTK0GYVgJY0qoQ&usqp=CAU",
    },
    date: "19/2/2021",
  },
  {
    id: 2,
    memberName: "Sujata Joshi",
    flatNo: 302,
    title: "ClubHouse Renowate",
    description: "ClubHouse Renowate",
    photo: {
      uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS20jPhg9mwaTRRauwiJUSHaTK0GYVgJY0qoQ&usqp=CAU",
    },
    date: "20/2/2021",
  },
  {
    id: 3,
    memberName: "Ram Pasalkar",
    flatNo: 302,
    title: "Benches in Garden",
    description: "Benches in Garden",
    photo: {
      uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS20jPhg9mwaTRRauwiJUSHaTK0GYVgJY0qoQ&usqp=CAU",
    },
    date: "20/3/2021",
  },
  {
    id: 4,
    memberName: "Samruddhi Pandit",
    flatNo: 302,
    title: "Benches in Garden",
    description: "Benches in Garden",
    photo: {
      uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS20jPhg9mwaTRRauwiJUSHaTK0GYVgJY0qoQ&usqp=CAU",
    },
    date: "20/3/2021",
  },
];
const PostNewIdeas = ({ navigation }) => {
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          style={{ borderRadius: 13 }}
          icon="plus"
          color="#8CC0DE"
          mode="contained"
          onPress={showModal}
        >
          POST NEW IDEAS
        </Button>
      </View>
      <View style={{ paddingBottom: 55 }}>
        <FlatList
          data={newPost}
          keyExtractor={(item) => item.id}
          renderItem={(itemData) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("DetailView", {
                  newPostId: itemData.item.id,
                });
              }}
            >
              <Card style={styles.card}>
                <Card.Content>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Title numberOfLines={2}>{itemData.item.title}</Title>
                    <Title>{itemData.item.date}</Title>
                  </View>

                  <Paragraph>{itemData.item.description}</Paragraph>
                </Card.Content>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginHorizontal: 20,
                    marginVertical: 20,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <AntDesign
                      name="like2"
                      size={30}
                      color="#000"
                      onPress={() => {
                        console.log("Hii1");
                      }}
                    />
                    <Text>{newPost.length}</Text>
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
                backgroundColor: "#8CC0DE",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text>POST NEW IDEAS</Text>
            </View>
            <View style={{ flexDirection: "row", marginVertical: 15 }}>
              <Text>Idea Title:</Text>
              <TextInput style={styles.textInput}></TextInput>
            </View>
            <View style={{ flexDirection: "row", marginVertical: 15 }}>
              <Text>Description:</Text>
              <TextInput style={styles.textInput}></TextInput>
            </View>
            <View>
              <TextInput
                style={{ borderWidth: 1, margin: 10, height: 90 }}
              ></TextInput>
              <Button
                style={{ borderRadius: 13 }}
                icon="plus"
                color="#8CC0DE"
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
                style={{ borderRadius: 13 }}
                icon=""
                color="#8CC0DE"
                mode="contained"
                onPress={() => {}}
              >
                SAVE
              </Button>
              <Button
                style={{ borderRadius: 13 }}
                icon=""
                color="#8CC0DE"
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
    margin: 10,
    borderRadius: 15,
    backgroundColor: "#F4BFBF",
    justifyContent: "space-between",
    elevation: 5,
    shadowColor: "black",
    shadowOpacity: 0.26,
  },
  modalContainer: {
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    marginTop: 90,
  },
  textInput: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    width: 150,
  },
});

export default PostNewIdeas;
