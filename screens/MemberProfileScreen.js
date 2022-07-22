import React, { useState, useReducer, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  Dimensions,
  ActivityIndicator,
  Modal,
  ScrollView,
} from "react-native";

import Input from "../components/UI/Input";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Dialog,
} from "react-native-paper";
const width = Dimensions.get("window").width;
import { useSelector, useDispatch } from "react-redux";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as memberActions from "../store/actions/member";

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
const MemberProfileScreen = () => {
  const memberData = useSelector((state) => state.member.loggedInMember);
  //console.log(memberData);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [visible, setVisible] = useState(false);

  const initialReducerState = {
    inputValues: {
      name: memberData.name,
      flatno: memberData.flatNumber,
      phone: memberData.phone,
    },
    inputValidities: {
      name: false,
      flatno: false,
      phone: false,
    },
    formIsValid: false,
  };

  const [formState, dispatchFormState] = useReducer(
    formReducer,
    initialReducerState
  );
  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

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

  const submitHandler = async () => {
    //  console.log("Inside",memberData.name,formState.inputValues.name);
    if (
      memberData.name === formState.inputValues.name &&
      memberData.flatNumber === formState.inputValues.flatno &&
      memberData.phone === formState.inputValues.phone
    ) {
      return;
    }
    try {
      await dispatch(
        memberActions.update_members(
          {
            name: formState.inputValues.name,
            flatNumber: formState.inputValues.flatno,
            //    email: formState.inputValues.email,
            phone: formState.inputValues.phone,
          },
          memberData.key
        )
      );
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
    hideModal();
  };
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <View
          style={{ position: "absolute", zIndex: 300, top: -65, left: 100 }}
        >
          <FontAwesome
            name="user-circle"
            size={80}
            color="#000"
            onPress={() => {
              console.log("Hii");
            }}
          />
        </View>
        <View>
          <Card.Content style={{ margin: 10, flexDirection: "row" }}>
            <Title style={{ flex: 1, fontSize: 18 }}>Name: </Title>
            <Paragraph style={styles.paragraph}>{memberData.name}</Paragraph>
          </Card.Content>
          <Card.Content
            style={{
              margin: 10,
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Title style={{ flex: 1, fontSize: 18 }}>E-mail: </Title>
            <Paragraph style={styles.paragraph}>{memberData.email}</Paragraph>
          </Card.Content>
          <Card.Content
            style={{
              margin: 10,
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Title style={{ flex: 1, fontSize: 18 }}>Phone: </Title>
            <Paragraph style={styles.paragraph}>{memberData.phone}</Paragraph>
          </Card.Content>
          <Card.Content
            style={{
              margin: 10,
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Title style={{ flex: 1, fontSize: 18 }}>Flat No: </Title>
            <Paragraph style={styles.paragraph}>
              {memberData.flatNumber}
            </Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button
              color="#1C6DD0"
              style={{ width: "100%" }}
              mode="contained"
              onPress={showModal}
            >
              Update
            </Button>
          </Card.Actions>
        </View>
      </Card>
      <View>
        <Modal animationType="slide" transparent={true} visible={visible}>
          <View style={styles.modalContainer}>
            <Card style={styles.authContainer}>
              <ScrollView>
                <View style={{ alignSelf: "center" }}>
                  <Text>UPDATE HERE</Text>
                </View>
                <View>
                  <Input
                    id="name"
                    label="Name"
                    keyboardType="default"
                    name
                    required
                    autoCapitalize="none"
                    errorText="Please enter a valid name"
                    onInputChange={inputChangeHandler}
                    initialValue={formState.inputValues.name}
                  />

                  <Input
                    id="phone"
                    label="Phone Number"
                    keyboardType="number-pad"
                    minLength={10}
                    maxLength={10}
                    required
                    autoCapitalize="none"
                    errorText="Please enter a valid Phone Number"
                    onInputChange={inputChangeHandler}
                    initialValue={formState.inputValues.phone}
                  />
                  <Input
                    id="flatno"
                    label="Flat Number"
                    keyboardType="number-pad"
                    min={300}
                    max={315}
                    required
                    autoCapitalize="none"
                    errorText="Please enter a valid Flat Number"
                    onInputChange={inputChangeHandler}
                    initialValue={formState.inputValues.flatno}
                  />
                  <View
                    style={{
                      marginTop: 25,
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Button
                      style={{ borderRadius: 13 }}
                      icon=""
                      color="#8CC0DE"
                      mode="contained"
                      onPress={submitHandler}
                    >
                      UPDATE
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
    alignItems: "center",
    justifyContent: "center",
  },

  card: {
    margin: 20,
    borderRadius: 15,
    backgroundColor: "#FFF8F3",
    justifyContent: "space-between",
    elevation: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    width: "80%",
  },
  paragraph: {
    alignSelf: "center",
    flex: 2,
    fontSize: 18,
    margin: 7,
  },
  modalContainer: {
    alignSelf: "center",
    justifyContent: "center",
  },
  authContainer: {
    width: width / 1.2,
    maxWidth: 1000,
    maxHeight: 550,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 20,

    marginTop: 100,
    elevation: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    alignSelf: "center",
    justifyContent: "center",
  },
});

export default MemberProfileScreen;
