import React, { useState, useEffect, useCallback, useReducer } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Modal,
  Image,
  Text,
  Alert,
  ScrollView,
  Dimensions,
} from "react-native";
import { Card, Paragraph, IconButton, Button } from "react-native-paper";
import * as visitorInfoActions from "../store/actions/VisitorInfo";
import { useSelector, useDispatch } from "react-redux";
import Input from "../components/UI/Input";

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
const IncomingRequestScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [keyToDecline, setkeyToDecline] = useState();
  const [error, setError] = useState();
  const [visible, setVisible] = useState(false);
  const memberData = useSelector((state) => state.member.loggedInMember);
  const allVisitors = useSelector((state) => state.visitors.visitors);
  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const initialReducerState = {
    inputValues: {
      reason: "",
    },
    inputValidities: {
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
  const todayFullDate = new Date();
  const todayDate = todayFullDate.getDate();
  const todayMonth = todayFullDate.getMonth() + 1;
  const todayYear = todayFullDate.getFullYear();
  const filterData = allVisitors.filter((visitor) => {
    let date = new Date(visitor.date);
    let dateDay = date.getDate();
    let dateMonth = date.getMonth() + 1;
    let dateYear = date.getFullYear();
    return (
      dateDay === todayDate &&
      todayMonth === dateMonth &&
      dateYear === todayYear &&
      visitor.active === true &&
      visitor.status === "Pending" &&
      visitor.memberUserId === memberData.userId
    );
  });
  const reversedArray = filterData.reverse();
  const acceptHandler = (key) => {
    try {
      dispatch(visitorInfoActions.accept_Visitor(key));
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };
  const declineHandler = () => {
    try {
      dispatch(
        visitorInfoActions.decline_Visitor(keyToDecline, {
          declineReason: formState.inputValues.reason,
          status:"Decline",
          acceptedDate:new Date()
        })
      );
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
    hideModal();
  };
  const showModal = (key) => {
    setkeyToDecline(key);
    setVisible(true);
  };
  const hideModal = () => setVisible(false);
  return (
    <View style={styles.container}>
      <View
        style={{
          width: "100%",
          position: "absolute",
          backgroundColor: "#171717",
          opacity: 0.7,
        }}
      >
        <Text style={{ margin: 10, alignSelf: "center", color: "white" }}>
          Incoming Visitor's Requests
        </Text>
      </View>
      {filterData.length !== 0 ? (
        <View style={{ marginTop: 37 }}>
          <FlatList
            data={reversedArray}
            keyExtractor={(item, index) => item.key}
            renderItem={(itemData) => {
              let date = new Date(itemData.item.date);
              let photo = itemData.item.visitorPhoto_url;

              return (
                <Card style={styles.Card}>
                  <View style={{ flexDirection: "row" }}>
                    <Card
                      style={{
                        backgroundColor: "#F3E9DD",
                        flexDirection: "column",
                        borderRadius: 15,
                      }}
                    >
                      <View style={{ margin: 7 }}>
                        <Image
                          style={{
                            width: 120,
                            height: 125,
                            borderRadius: 10,
                          }}
                          source={{ uri: photo }}
                        />

                        <Paragraph style={{ alignSelf: "center" }}>
                          {itemData.item.visitorName.toUpperCase()}
                        </Paragraph>
                        <Paragraph style={{ alignSelf: "center" }}>
                          {itemData.item.visitingReason}
                        </Paragraph>
                      </View>
                    </Card>
                    <ScrollView style={{ margin: 9, marginTop: 30 }}>
                      <Paragraph style={{ color: "white" }}>
                        {date.getHours() + ":" + date.getMinutes()}
                      </Paragraph>

                      <Paragraph style={{ color: "white" }}>
                        Member:{itemData.item.memberName.toUpperCase()}
                      </Paragraph>

                      <Paragraph style={{ color: "white" }}>
                        Flat no.: {itemData.item.flatno}
                      </Paragraph>

                      <Paragraph style={{ color: "white" }}>
                        Request Status:{itemData.item.status}
                      </Paragraph>
                      {itemData.item.status === "Pending" ? (
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "flex-end",
                          }}
                        >
                          <IconButton
                            icon="account-check-outline"
                            color="white"
                            size={35}
                            onPress={acceptHandler.bind(
                              this,
                              itemData.item.key
                            )}
                          />
                          <IconButton
                            icon="delete-outline"
                            color="white"
                            size={32}
                            onPress={showModal.bind(this, itemData.item.key)}
                          />
                        </View>
                      ) : null}
                    </ScrollView>
                  </View>
                </Card>
              );
            }}
          />
        </View>
      ) : (
        <Card
          style={{
            margin: 5,
            padding: 12,
            borderRadius: 8,
            backgroundColor: "#827397",
            elevation: 5,
            shadowColor: "black",
            shadowOpacity: 0.26,
          }}
        >
          <Paragraph style={{ color: "white", alignSelf: "center" }}>
            No Visitors Added
          </Paragraph>
        </Card>
      )}
      <Modal animationType="slide" transparent={true} visible={visible}>
        <View style={styles.modalContainer}>
          <Card style={styles.modalView}>
            <View style={{ marginBottom: 10 }}>
              <Input
                id="reason"
                label="Enter Reason for decline:"
                keyboardType="default"
                required
                autoCapitalize="none"
                errorText="Please enter reason"
                onInputChange={inputChangeHandler}
                initialValue=""
              />
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
                  onPress={declineHandler}
                >
                  Save
                </Button>
              </View>
              <View style={{ flex: 1, marginHorizontal: 5 }}>
                <Button color="#8CC0DE" mode="contained" onPress={hideModal}>
                  Close
                </Button>
              </View>
            </View>
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
  Card: {
    margin: 5,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#363062",
    elevation: 5,
    shadowColor: "black",
    shadowOpacity: 0.28,
  },
  modalContainer: {
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 20,
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

export default IncomingRequestScreen;
