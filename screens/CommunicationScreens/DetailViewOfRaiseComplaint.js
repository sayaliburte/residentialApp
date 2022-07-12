import React, { useState, useEffect, useReducer, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  Alert,
  FlatList,
} from "react-native";

import {
  Avatar,
  Button,
  Card,
  List,
  Title,
  Paragraph,
} from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import * as communicationActions from "../../store/actions/communication";
import Input from "../../components/UI/Input";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
//const CLEAR_FORM = "CLEAR_FORM";
/*const formReducer = (state, action) => {
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
  if (action.type === CLEAR_FORM) {
    return {
      formIsValid: false,
      inputValidities: { comment: false },
      inputValues: { comment: "" },
    };
  }
  return state;
};

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";*/
const DetailViewOfScreens = ({ route }) => {
  const dispatch = useDispatch();
  const {
    date,
    year,
    month,
    hour,
    minutes,
    title,
    reason,
    photo,
    key,

    memberName,
  } = route.params;
  const communicationData = useSelector(
    (state) => state.communication.communications
  );
  const filterCommunication = communicationData.filter(
    (comm) => comm.key === key
  );
  const complaint = filterCommunication.pop();
  const loadedCommentsData = complaint.comments;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [commentsData, setCommentsData] = useState({
    isValid: false,
    value: "",
  });
  /*const loggedInMember = useSelector((state) => state.member.loggedInMember);
  const communicationData = useSelector(
    (state) => state.communication.communications
  );*/

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  /*  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      comment: "",
    },
    inputValidities: {
      comment: false,
    },
    formIsValid: false,
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
  );*/
  //console.log("Form Data " + JSON.stringify(formState));

  const changeComment = (text) => {
    if (text.trim().length === 0) {
      setCommentsData({ isValid: false, value: text });
    } else {
      setCommentsData({ isValid: true, value: text });
    }
  };
  const add_comment = () => {
    let tempCommentsArray = [];
    tempCommentsArray = [...loadedCommentsData];
    tempCommentsArray.push({
      memberName: memberName,
      message: commentsData.value,
      date: new Date().toISOString(),
    });

    try {
      dispatch(communicationActions.add_comments(tempCommentsArray, key));
      setCommentsData({ isValid: false, value: "" });
      // dispatchFormState({ type: CLEAR_FORM });
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };
  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={40}
      style={styles.container}
    >
      <Card style={styles.card}>
        <View style={{ width: "100%" }}>
          <ImageBackground
            style={{ height: height / 3.5 }}
            source={{ uri: photo }}
          >
            <View
              style={{
                width: "100%",
                position: "absolute",
                backgroundColor: "#171717",
                opacity: 0.7,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Paragraph style={{ color: "white" }}>
                  {date + "-" + month + "-" + year}
                </Paragraph>
                <Paragraph style={{ color: "white" }}>
                  {hour + ":" + minutes}
                </Paragraph>
              </View>

              <View>
                <Title style={{ color: "white" }}>{title}</Title>
              </View>
            </View>
          </ImageBackground>
          <View style={{ padding: 5 }}>
            <Paragraph style={{ color: "white" }}>{reason}</Paragraph>
          </View>
        </View>
      </Card>
      <FlatList
        data={loadedCommentsData}
        renderItem={(itemData) => {
          let mydate = new Date(itemData.item.date);
          let dateToShow =
            mydate.getDate() +
            "-" +
            (mydate.getMonth() + 1) +
            "-" +
            mydate.getFullYear();
          let timeToShow = mydate.getHours() + ":" + mydate.getMinutes();
          return (
            <View>
              <Card
                style={{
                  backgroundColor: "#B1D0E0",
                  margin: 5,
                  justifyContent: "center",
                }}
              >
                <Text style={{ margin: 10 }}>{itemData.item.message}</Text>
              </Card>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginHorizontal: 10,
                }}
              >
                <Text>{itemData.item.memberName}</Text>
                <Text>{dateToShow}</Text>
                <Text>{timeToShow}</Text>
              </View>
            </View>
          );
        }}
        keyExtractor={(item) => item.date}
      />
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 7, marginBottom: 5 }}>
          <Text style={styles.label}>Comment</Text>

          <TextInput
            style={styles.input}
            value={commentsData.value}
            onChangeText={changeComment}
            keyboardAppearance="dark"
          />
        </View>
        <View
          style={{ flex: 1, alignSelf: "center", justifyContent: "center" }}
        >
          <Button
            disabled={!commentsData.isValid}
            labelStyle={{ fontSize: 33 }}
            icon="send-outline"
            onPress={add_comment}
          ></Button>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    margin: 5,
    borderRadius: 10,
    backgroundColor: "#406882",
    flexDirection: "column",
    elevation: 5,
    shadowColor: "black",
    shadowOpacity: 0.26,
  },
  label: {
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 3,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
});

export default DetailViewOfScreens;
