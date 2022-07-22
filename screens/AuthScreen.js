import React, { useReducer, useEffect, useCallback, useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Button,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Avatar, Card, Title, Paragraph } from "react-native-paper";
import Input from "../components/UI/Input";
import { useDispatch } from "react-redux";
import * as authActions from "../store/actions/auth";
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

const AuthScreen = () => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState();

  const initialReducerState = isSignup
    ? {
        inputValues: {
          email: "",
          password: "",
          name: "",
          flatno: "",
          phone: "",
        },
        inputValidities: {
          email: false,
          password: false,
          name: false,
          flatno: false,
          phone: false,
        },
        formIsValid: false,
      }
    : {
        inputValues: {
          email: "",
          password: "",
        },
        inputValidities: {
          email: false,
          password: false,
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
  const authHandler = async () => {
    let action;
    if (isSignup) {
      action = authActions.signup(
        formState.inputValues.email,
        formState.inputValues.password
      );
    } else {
      action = authActions.login(
        formState.inputValues.email,
        formState.inputValues.password
      );
    }
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
      //props.navigation.navigate('Shop');
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
    if (isSignup) {
      dispatch(
        memberActions.add_members({
          name: formState.inputValues.name,
          flatNumber: formState.inputValues.flatno,
          memberType: "member",
          phone: formState.inputValues.phone,
          email: formState.inputValues.email,
          availabilityStatus: true,
          memberValidity: "Pending",
          pushNotificationToken: "",
        })
      );
    }
  };
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
  return (
    <View style={styles.screen}>
      <View style={styles.gredient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              id="email"
              label="E-Mail"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorText="Please enter a valid email address!"
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <Input
              id="password"
              label="Password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={5}
              autoCapitalize="none"
              errorText="Please enter a valid password"
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            {isSignup ? (
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
                  initialValue=""
                />

                <Input
                  id="flatno"
                  label="Flat Number"
                  keyboardType="number-pad"
                  min={101}
                  max={110}
                  required
                  autoCapitalize="none"
                  errorText="Please enter a valid Flat Number"
                  onInputChange={inputChangeHandler}
                  initialValue=""
                />

                <Input
                  id="phone"
                  label="Phone Number"
                  keyboardType="number-pad"
                  minLength={1}
                  maxLength={10}
                  required
                  autoCapitalize="none"
                  errorText="Please enter a valid Phone Number"
                  onInputChange={inputChangeHandler}
                  initialValue=""
                />
              </View>
            ) : null}
            <View style={styles.buttonContainer}>
              {isLoading ? (
                <ActivityIndicator size="small" />
              ) : (
                <Button
                  disabled={!formState.formIsValid}
                  title={isSignup ? "Signup" : "Login"}
                  onPress={authHandler}
                />
              )}
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title={`Switch to ${isSignup ? "Login" : "Sign Up"}`}
                onPress={() => {
                  setIsSignup((prevState) => !prevState);
                }}
              />
            </View>
          </ScrollView>
        </Card>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  gredient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  authContainer: {
    width: "90%",
    maxWidth: 450,
    maxHeight: 550,
    padding: 20,
  },
  buttonContainer: {
    marginTop: 10,
  },
});
export default AuthScreen;
