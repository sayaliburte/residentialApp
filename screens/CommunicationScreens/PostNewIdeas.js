import React, { useState, useEffect, useReducer, useCallback } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Modal,
  Dimensions,
  ScrollView,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Button, Card, Title, Paragraph, Dialog } from "react-native-paper";
import Input from "../../components/UI/Input";
import ImagePicker from "../../components/UI/ImagePicker";
import * as communicationActions from "../../store/actions/communication";
import NewIdeaItem from "../../components/UI/NewIdeaItem";
const width = Dimensions.get("window").width;
const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};
const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";
const PostNewIdeas = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [visible, setVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const memberData = useSelector((state) => state.member.loggedInMember);

  const communicationData = useSelector(
    (state) => state.communication.communications
  );
  const filteredArray = communicationData.filter((data) => {
    return data.communication_type === "postIdea" && data.active === true;
  });
  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);
  const initialReducerState = {
    inputValues: {
      reason: "",
      title: "",
    },
    inputValidities: {
      reason: false,
      title: false,
    },
    formIsValid: false,
  };
  const [formState, dispatchFormState] = useReducer(
    formReducer,
    initialReducerState
  );
  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const imageTakenHandler = (imagePath, isUploading) => {
    setSelectedImage(imagePath);
    setUploading(isUploading);
  };
  const submitHandler = () => {
    try {
      dispatch(
        communicationActions.add_communication({
          date: new Date().toISOString(),
          flatno: memberData.flatNumber,
          userId: memberData.userId,
          memberName: memberData.name,
          communication_type: "postIdea",
          active: true,
          photo_url: selectedImage,
          title: formState.inputValues.title,
          reason: formState.inputValues.reason,
          like: [],
        })
      );
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
    hideModal();
  };

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
      <View style={{ paddingBottom: 60 }}>
        <FlatList
          data={filteredArray.reverse()}
          keyExtractor={(item) => item.key}
          renderItem={(itemData) => {
            return (
              <NewIdeaItem
                mydate={itemData.item.date}
                id={itemData.item.key}
                memberName={itemData.item.memberName}
                title={itemData.item.title}
                memberUserId={memberData.userId}
                communicationUserId={itemData.item.userId}
                onSelect={() => {
                  navigation.navigate("POSTEDIDEADETAIL", {
                    newPostkey: itemData.item.key,
                  });
                }}
              />
            );
          }}
        ></FlatList>
      </View>
      <View>
        <Modal animationType="slide" transparent={true} visible={visible}>
          <View style={styles.modalContainer}>
            <Card style={styles.modalView}>
              <ScrollView>
                <View
                  style={{
                    backgroundColor: "#8CC0DE",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ alignSelf: "center" }}>POST NEW IDEAS</Text>
                </View>
                <View style={{ marginBottom: 10 }}>
                  <Input
                    id="title"
                    label="Title"
                    keyboardType="default"
                    name
                    required
                    maxLength={30}
                    autoCapitalize="none"
                    errorText="Please enter title"
                    onInputChange={inputChangeHandler}
                    initialValue=""
                  />
                </View>
                <View style={{ marginBottom: 10 }}>
                  <Input
                    id="reason"
                    label="Reason"
                    keyboardType="default"
                    reason
                    minLength={20}
                    required
                    autoCapitalize="none"
                    errorText="Please enter reason"
                    onInputChange={inputChangeHandler}
                    initialValue=""
                  />
                </View>
                <View>
                  <ImagePicker onImageTake={imageTakenHandler} />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    margin: 3,
                  }}
                >
                  <View style={{ flex: 1, marginHorizontal: 5 }}>
                    <Button
                      disabled={!formState.formIsValid}
                      color="#8CC0DE"
                      mode="contained"
                      onPress={submitHandler}
                    >
                      Save
                    </Button>
                  </View>
                  <View style={{ flex: 1, marginHorizontal: 5 }}>
                    <Button
                      color="#8CC0DE"
                      mode="contained"
                      onPress={hideModal}
                    >
                      Close
                    </Button>
                  </View>
                </View>
              </ScrollView>
            </Card>
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
    borderRadius: 10,
    backgroundColor: "#F4BFBF",
    justifyContent: "space-between",
    elevation: 5,
    shadowColor: "black",
    shadowOpacity: 0.26,
  },
  modalContainer: {
    alignSelf: "center",
    justifyContent: "center",
  },
  modalView: {
    width: width / 1.2,
    maxWidth: 1000,
    maxHeight: 550,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 20,

    marginTop: 30,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textInput: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    width: 150,
  },
});

export default PostNewIdeas;
