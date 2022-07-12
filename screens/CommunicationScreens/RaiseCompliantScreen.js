import React, { useState, useCallback, useReducer, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
  Alert,
  ScrollView,
} from "react-native";
import ImagePicker from "../../components/UI/ImagePicker";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Button, Card, Title, Paragraph } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import * as communicationActions from "../../store/actions/communication";
import Input from "../../components/UI/Input";

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

const RaiseComplaintScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  /* const loggedInUserId = useSelector(
    (state) => state.member.loggedInMember.userId
  );*/
  //const filterData= useSelector((state) => state.communication.communications);
  //console.log(filterData);

  const memberData = useSelector((state) => state.member.loggedInMember);
  const communicationData = useSelector(
    (state) => state.communication.communications
  );
  const filteredArray = communicationData.filter((data) => {
    return (
      data.userId === memberData.userId &&
      data.communication_type === "complaint" &&
      data.active === true
    );
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [visible, setVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
  const [uploading, setUploading] = useState(false);
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
  const imageTakenHandler = (imagePath, isUploading) => {
    setSelectedImage(imagePath);
    setUploading(isUploading);
  };

  const submitHandler = () => {
    //  console.log(formState.inputValues.reason, selectedImage);
    try {
      dispatch(
        communicationActions.add_communication({
          date: new Date().toISOString(),
          memberName: memberData.name,
          flatno: memberData.flatNumber,
          active: true,
          userId: memberData.userId,
          communication_type: "complaint",
          photo_url: selectedImage,
          title: formState.inputValues.title,
          reason: formState.inputValues.reason,
          comments: [],
        })
      );
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
    hideModal();
  };

  const deleteHandler = (key) => {
    try {
      dispatch(communicationActions.delete_communication(key));
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };
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
          data={filteredArray}
          keyExtractor={(item, index) => item.key}
          renderItem={(itemData) => {
            let mydate = new Date(itemData.item.date);
            let date = mydate.getDate();
            let month = mydate.getMonth() + 1;
            let year = mydate.getFullYear();
            let hour = mydate.getHours();
            let minutes = mydate.getMinutes();
            // console.log(mydate);
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("DetailViewOfRaiseComplaint", {
                    date: date,
                    month: month,
                    year: year,
                    hour: hour,
                    minutes: minutes,
                    title: itemData.item.title,
                    reason: itemData.item.reason,
                    photo: itemData.item.photo_url,
                    key: itemData.item.key,
                    comments: itemData.item.comments
                      ? itemData.item.comments
                      : [],
                    memberName: itemData.item.memberName,
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
                        <Paragraph>{date + "-" + month + "-" + year}</Paragraph>
                      </View>
                      <View>
                        <Paragraph>
                          {mydate.getHours() + ":" + mydate.getMinutes()}
                        </Paragraph>
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 20,
                      }}
                    >
                      <View style={{ flex: 1 }}>
                        <Paragraph style={{ fontSize: 20 }}>
                          {itemData.item.title}
                        </Paragraph>
                      </View>
                      <View>
                        <AntDesign
                          name="delete"
                          size={30}
                          color="#000"
                          onPress={deleteHandler.bind(this, itemData.item.key)}
                        />
                      </View>
                    </View>
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <Modal animationType="slide" transparent={true} visible={visible}>
        <View style={styles.modalContainer}>
          <Card style={styles.modalView}>
            <ScrollView>
              <View
                style={{ backgroundColor: "#FF85B3", justifyContent: "center" }}
              >
                <Text style={{ alignSelf: "center" }}>
                  Raise Complaints Here
                </Text>
              </View>

              <View style={{ marginBottom: 10 }}>
                <Input
                  id="title"
                  label="Title"
                  keyboardType="default"
                  title
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
                    disabled={uploading || !formState.formIsValid}
                    color="#FF85B3"
                    mode="contained"
                    onPress={submitHandler}
                  >
                    Save
                  </Button>
                </View>
                <View style={{ flex: 1, marginHorizontal: 5 }}>
                  <Button color="#FF85B3" mode="contained" onPress={hideModal}>
                    close
                  </Button>
                </View>
              </View>
            </ScrollView>
          </Card>
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
    margin: 3,
    borderRadius: 8,
    backgroundColor: "#EADEDE",
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
