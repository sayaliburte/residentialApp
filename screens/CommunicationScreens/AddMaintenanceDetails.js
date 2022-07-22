import React, { useState, useEffect, useReducer, useCallback } from "react";
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
  Dimensions,
  ScrollView,
  Alert,
} from "react-native";
import ImagePicker from "../../components/UI/ImagePicker";

import { Button, Card, Paragraph, Title } from "react-native-paper";
import { Dropdown } from "react-native-material-dropdown-v2-fixed";
import { useSelector, useDispatch } from "react-redux";
import * as communicationActions from "../../store/actions/communication";
import Input from "../../components/UI/Input";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
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

let transactionType = [
  {
    value: "Cash",
  },
  {
    value: "UPI",
  },
];
let monthData = [
  { value: "January" },
  {
    value: "February",
  },
  {
    value: "March",
  },
  { value: "April" },
  {
    value: "May",
  },
  {
    value: "June",
  },
  {
    value: "July",
  },
  {
    value: "August",
  },
  {
    value: "September",
  },
  {
    value: "October",
  },
  {
    value: "November",
  },
  {
    value: "December",
  },
];

const AddMaintenanceDetails = ({ navigation }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    LogBox.ignoreLogs(["Animated: `useNativeDriver`"]);
    LogBox.ignoreLogs([
      "componentWillReceiveProps has been renamed, and is not recommended for use.",
    ]);
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [selectedImage, setSelectedImage] = useState();
  const [uploading, setUploading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visibleAlert, setVisibleAlert] = useState(false);
  const [transactionTypeValue, setTransactionTypeValue] = useState("Cash");
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentDate = new Date();
  let currentMonth = monthNames[currentDate.getMonth()];

  const [value, setValue] = useState(currentMonth);
  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
    }
    if (visibleAlert) {
      Alert.alert("Opps!", "Detail Not Available!", [
        {
          text: "Okay",
          onPress: () => {
            setVisibleAlert(false);
          },
        },
      ]);
    }
  }, [error, visibleAlert]);

  const initialReducerState = {
    inputValues: {
      amount: "",
      transactionId: "",
    },
    inputValidities: {
      amount: false,
      transactionId: false,
    },
    formIsValid: false,
  };
  const [formState, dispatchFormState] = useReducer(
    formReducer,
    initialReducerState
  );

  const memberData = useSelector((state) => state.member.loggedInMember);
  const communicationData = useSelector(
    (state) => state.communication.communications
  );
  const filteredArray = communicationData.filter((data) => {
    return (
      data.userId === memberData.userId &&
      data.communication_type === "maintenance" &&
      data.active === true
    );
  });
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

  const change = (value) => {
    setValue(value);
  };

  const changeTransactionType = (value) => {
    setTransactionTypeValue(value);
  };
  const submitHandler = () => {
    try {
      if (transactionTypeValue === "Cash") {
        dispatch(
          communicationActions.add_communication({
            date: new Date().toISOString(),
            memberName: memberData.name,
            flatno: memberData.flatNumber,
            active: true,
            userId: memberData.userId,
            communication_type: "maintenance",
            photo_url: selectedImage,
            amount: formState.inputValues.amount,
            transactionType: transactionTypeValue,
            maintenanceMonth: value,
          })
        );
      } else {
        dispatch(
          communicationActions.add_communication({
            date: new Date().toISOString(),
            memberName: memberData.name,
            flatno: memberData.flatNumber,
            active: true,
            userId: memberData.userId,
            communication_type: "maintenance",
            photo_url: selectedImage,
            amount: formState.inputValues.amount,
            transactionType: transactionTypeValue,
            transactionId: formState.inputValues.transactionId,
            maintenanceMonth: value,
          })
        );
      }
    } catch (err) {
      setError(err.message);
    }
    hideModal();
  };

  let isDisabled = true;
  if (transactionTypeValue === "Cash") {
    isDisabled = !formState.inputValidities.amount; //if only amount is needed
  } else {
    isDisabled = !formState.formIsValid || uploading; //if whole form and uploading image
  }
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
          data={filteredArray.reverse()}
          keyExtractor={(item) => item.key}
          renderItem={(itemData) => {
            let mydate = new Date(itemData.item.date);
            let date =
              mydate.getDate() +
              "-" +
              (mydate.getMonth() + 1) +
              "-" +
              mydate.getFullYear();

            let hour = mydate.getHours() + ":" + mydate.getMinutes();

            return (
              <TouchableOpacity
                onPress={() => {
                  itemData.item.photo_url
                    ? navigation.navigate("InvitationPhoto", {
                        photo: itemData.item.photo_url,
                      })
                    : setVisibleAlert(true);
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
                      <View>
                        <Paragraph>{date}</Paragraph>
                      </View>
                      <View>
                        <Paragraph>{hour}</Paragraph>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Title>Amount:{itemData.item.amount}</Title>
                      <Title>{itemData.item.maintenanceMonth}</Title>
                    </View>
                    <View>
                      <Paragraph>{itemData.item.transactionType}</Paragraph>
                      <Paragraph>
                        {itemData.item.transactionId
                          ? "Transaction Id:" + itemData.item.transactionId
                          : null}
                      </Paragraph>
                    </View>
                  </Card.Content>
                </Card>
              </TouchableOpacity>
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
                    backgroundColor: "#3D2C8D",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ alignSelf: "center", color: "white" }}>
                    MAINTENANCE DETAILS
                  </Text>
                </View>
                <View
                  style={{
                    marginBottom: 10,
                    marginVertical: 15,
                    width: "100%",
                    height: 40,
                  }}
                >
                  <Dropdown
                    icon="chevron-down"
                    iconColor="#E1E1E1"
                    label="Month"
                    useNativeDriver={true}
                    data={monthData}
                    value={value}
                    onChangeText={change}
                  />
                </View>
                <View style={{ marginBottom: 5, marginVertical: 12 }}>
                  <Input
                    id="amount"
                    label="Amount"
                    required
                    keyboardType="number-pad"
                    autoCapitalize="none"
                    errorText="Please enter Amount"
                    onInputChange={inputChangeHandler}
                    initialValue=""
                  />
                </View>
                <View
                  style={{
                    marginBottom: 10,
                    marginVertical: 15,
                    width: "100%",
                    height: 40,
                  }}
                >
                  <Dropdown
                    icon="chevron-down"
                    iconColor="#E1E1E1"
                    label="Transaction Type"
                    useNativeDriver={true}
                    data={transactionType}
                    value={transactionTypeValue}
                    onChangeText={changeTransactionType}
                  />
                </View>
                {transactionTypeValue === "UPI" ? (
                  <View>
                    <View style={{ marginBottom: 10, marginVertical: 15 }}>
                      <Input
                        id="transactionId"
                        label="Transaction Id"
                        keyboardType="default"
                        required
                        autoCapitalize="none"
                        errorText="Please enter Transaction Id"
                        onInputChange={inputChangeHandler}
                        initialValue=""
                      />
                    </View>
                    <View>
                      <ImagePicker onImageTake={imageTakenHandler} />
                    </View>
                  </View>
                ) : null}

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    margin: 3,
                  }}
                >
                  <View
                    style={{ flex: 1, marginBottom: 15, marginVertical: 23 }}
                  >
                    <Button
                      disabled={isDisabled}
                      color="#3D2C8D"
                      mode="contained"
                      onPress={submitHandler}
                    >
                      Save
                    </Button>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      marginHorizontal: 5,
                      marginBottom: 13,
                      marginVertical: 23,
                    }}
                  >
                    <Button
                      color="#3D2C8D"
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
  },
  modalView: {
    width: width / 1.2,
    maxWidth: 1000,
    maxHeight: 550,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 20,

    marginTop: height * 0.1,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 20,
  },
  textInput: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    width: 150,
  },
});
export default AddMaintenanceDetails;
