import React, { useState, useEffect, useReducer, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  ScrollView,
  FlatList,
  Linking,
  Dimensions,
  TouchableOpacity,
  Modal,
} from "react-native";
import { List, Card, Button, Paragraph, Snackbar } from "react-native-paper";
import * as authActions from "../../store/actions/auth";
import * as memberActions from "../../store/actions/member";
import { useSelector, useDispatch } from "react-redux";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Input from "../../components/UI/Input";
import ImagePicker from "../../components/UI/ImagePicker";
import * as visitorInfoActions from "../../store/actions/VisitorInfo";
const height = Dimensions.get("window").height;
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
const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [selectedImage, setSelectedImage] = useState();
  const [uploading, setUploading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selectedMemberData, setSelectedMemberData] = useState({});
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);
  const initialReducerState = {
    inputValues: {
      name: "",
      reason: "",
    },
    inputValidities: {
      name: false,
      reason: false,
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
    try {
      dispatch(
        visitorInfoActions.add_visitor({
          date: new Date(),
          visitorName: formState.inputValues.name,
          visitorPhoto_url: selectedImage,
          visitingReason: formState.inputValues.reason,
          status: "Pending",
          flatno: selectedMemberData.flatNumber,
          memberUserId: selectedMemberData.userId,
          memberName: selectedMemberData.name,
          active: true,
        })
      );
    } catch (err) {
      console.log(err);
      setError(err.message);
      setIsLoading(false);
    }
    setSuccess(true);
    hideModal();
  };
  const allMemberData = useSelector((state) => state.member.members);
  const filteredMembers = allMemberData.filter(
    (member) =>
      member.memberType === "member" && member.availabilityStatus === true
  );
  useEffect(() => {
    try {
      dispatch(visitorInfoActions.fetch_visitors());
    } catch (err) {
      console.log(err.message);
    }
  }, [dispatch]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: "row" }}>
          <Button
            icon="logout"
            labelStyle={{ fontSize: 27 }}
            onPress={() => {
              dispatch(memberActions.clearLoggedInUser());
              dispatch(authActions.logout());
            }}
            title=""
            color="white"
          />
        </View>
      ),
    });
  }, [navigation]);
  const showModal = (item) => {
    setSelectedMemberData(item);
    setVisible(true);
  };
  const hideModal = () => setVisible(false);

  const call = (no) => {
    let phoneNumber = "";
    phoneNumber = `tel:${no}`;
    Linking.openURL(phoneNumber);
  };

  return (
    <View style={styles.container}>
      <View>
        <FlatList
          data={filteredMembers}
          keyExtractor={(item, index) => item.key}
          renderItem={(itemData) => {
            return (
              <Card
                style={itemData.index % 2 === 0 ? styles.Card : styles.Card1}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Paragraph style={{ color: "white" }}>
                    {itemData.item.name.toUpperCase()}
                  </Paragraph>
                  <FontAwesome5
                    name="phone"
                    size={27}
                    color="white"
                    onPress={call.bind(this, itemData.item.phone)}
                  />
                </View>
                <View
                  style={{
                    alignContent: "center",
                    justifyContent: "center",
                    marginBottom: 10,
                  }}
                >
                  <Paragraph style={{ color: "white" }}>
                    Flat No.:{itemData.item.flatNumber}
                  </Paragraph>
                </View>
                <View style={{ margin: 5, borderColor: "white" }}>
                  <Button
                    style={{
                      borderwidth: 80,
                      borderRadius: 20,
                    }}
                    labelStyle={{ color: "white" }}
                    color="transparent"
                    mode="contained"
                    onPress={showModal.bind(this, itemData.item)}
                  >
                    Add Visitor
                  </Button>
                </View>
              </Card>
            );
          }}
        />
      </View>
      <View>
        <Modal animationType="slide" transparent={true} visible={visible}>
          <View style={styles.modalContainer}>
            <Card style={styles.modalView}>
              <ScrollView>
                <View
                  style={{
                    backgroundColor: "#5D54A4",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ alignSelf: "center", color: "white" }}>
                    FILL VISITOR DATA
                  </Text>
                </View>
                <View style={{ marginBottom: 10 }}>
                  <Input
                    id="name"
                    label="Visitor Name"
                    keyboardType="default"
                    name
                    required
                    autoCapitalize="none"
                    errorText="Please enter Visitor Name"
                    onInputChange={inputChangeHandler}
                    initialValue=""
                  />
                </View>
                <View style={{ marginBottom: 10 }}>
                  <Input
                    id="reason"
                    label="Visiting reason"
                    keyboardType="default"
                    required
                    autoCapitalize="none"
                    errorText="Please enter Visiting Reason"
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
                      color="#5D54A4"
                      mode="contained"
                      onPress={submitHandler}
                    >
                      Save
                    </Button>
                  </View>
                  <View style={{ flex: 1, marginHorizontal: 5 }}>
                    <Button
                      color="#5D54A4"
                      mode="contained"
                      onPress={hideModal}
                    >
                      close
                    </Button>
                  </View>
                </View>
              </ScrollView>
            </Card>
          </View>
        </Modal>
      </View>
      <Snackbar
        visible={success}
        onDismiss={() => {
          setSuccess(false);
        }}
        duration={2000}
        wrapperStyle={{ top: height - 400 }}
      >
        Visitor Added Successfully.
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },

   Card: {
    margin: 5,
    padding: 15,
    marginHorizontal: 10,
    borderRadius: 8,
    backgroundColor: "#5D54A4",

    elevation: 5,
    shadowColor: "black",
    shadowOpacity: 0.26,
  },
  Card1: {
    margin: 5,
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 8,
    backgroundColor: "#407088",

    elevation: 20,
    shadowColor: "black",
    shadowOpacity: 0.3,
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
});
export default HomeScreen;
