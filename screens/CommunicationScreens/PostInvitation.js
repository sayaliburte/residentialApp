import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Image,
  TextInput,
  Modal,
} from "react-native";
import { Button, Card, Paragraph } from "react-native-paper";
import AntDesign from "react-native-vector-icons/AntDesign";

const newInvitation = [
  {
    id: 1,
    description: "Marriage on 6/1/2022",
    photo: {
      uri: "https://images.greetingsisland.com/images/invitations/wedding/previews/floral-swirls_4.png?auto=format,compress&w=280",
    },
  },
  {
    id: 2,
    description: "Birthday on 6/8/2022",
    photo: {
      uri: "https://images.greetingsisland.com/images/invitations/birthday/previews/rose-gold-glitter_2.png?auto=format,compress&w=280",
    },
  },
  {
    id: 3,
    description: "Birthday on 2/7/2021",
    photo: {
      uri: "https://images.greetingsisland.com/images/invitations/birthday/previews/floral-sakura_1.png?auto=format,compress&w=280",
    },
  },
  {
    id: 4,
    description: "Marriage Anniversary on 8/3/2021",
    photo: {
      uri: "https://images.greetingsisland.com/images/invitations/wedding/previews/white-romantic-29300.png?auto=format,compress&w=280",
    },
  },
  {
    id: 5,
    description: "Birthday on 6/1/2022",
    photo: {
      uri: "https://images.greetingsisland.com/images/invitations/birthday/previews/art-deco-frame.png?auto=format,compress&w=280",
    },
  },
];

const PostInvitation = ({ navigation }) => {
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          style={{ borderRadius: 13 }}
          icon="plus"
          color="#243A73"
          mode="contained"
          onPress={showModal}
        >
          POST INVITATIONS
        </Button>
      </View>
      <View style={{ paddingBottom: 50, margin: 10 }}>
        <FlatList
          data={newInvitation}
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
                  <Paragraph>{itemData.item.description}</Paragraph>
                  <AntDesign
                    name="delete"
                    size={30}
                    color="#000"
                    onPress={() => {
                      console.log("Hii");
                    }}
                  />
                </Card.Content>
              </Card>
            </TouchableOpacity>
          )}
        ></FlatList>
      </View>
      <View style={{}}>
        <Modal animationType="slide" transparent={true} visible={visible}>
          <View style={styles.modalContainer}>
            <View
              style={{
                backgroundColor: "#243A73",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "white" }}>POST NEW IDEAS</Text>
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
                color="#243A73"
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
                color="#243A73"
                mode="contained"
                onPress={() => {}}
              >
                SAVE
              </Button>
              <Button
                style={{ borderRadius: 13 }}
                icon=""
                color="#243A73"
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
    backgroundColor: "#E9D5CA",
    elevation: 5,
    shadowColor: "black",
    shadowOpacity: 0.3,
  },
  modalContainer: {
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    marginTop: 90,
    elevation: 15,
    shadowColor: "black",
    shadowOpacity: 3,
    borderRadius: 20,
  },
  textInput: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    width: 150,
  },
});
export default PostInvitation;
