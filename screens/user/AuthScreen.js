import React, { useReducer, useCallback, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Button,
  ActivityIndicator,
  Alert,
} from "react-native";

import { useDispatch } from "react-redux";

import Input from "./../../components/UI/Input";
import Colors from "../../constants/Colors";
import * as AuthActions from "./../../store/actions/auth";

import { LinearGradient } from "expo-linear-gradient";

const UPDATE_FORM = "UPDATE";

const formReducer = (state, action) => {
  if (action.type === UPDATE_FORM) {
    const updatedValues = {
      ...state.inputValues,
      [action.inputType]: action.value,
    };
    const updatedValidities = {
      ...state.inputsValidity,
      [action.inputType]: action.isValid,
    };
    let isFormValid = true;
    for (const key in updatedValidities) {
      isFormValid = isFormValid && updatedValidities[key];
    }
    return {
      ...state,
      inputValues: updatedValues,
      inputsValidity: updatedValidities,
      formValidity: isFormValid,
    };
  }
  return state;
};

const AuthScreen = (props) => {
  const dispatch = useDispatch();

  const [signUpMode, setSignUpMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const authHandler = async () => {
    if (formState.formValidity) {
      let authAction;
      if (signUpMode) {
        authAction = AuthActions.signUp(
          formState.inputValues.email,
          formState.inputValues.password
        );
      } else {
        authAction = AuthActions.signIn(
          formState.inputValues.email,
          formState.inputValues.password
        );
      }
      setLoading(true);
      setError(null);
      try {
        await dispatch(authAction);
        // props.navigation.navigate("App");
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    } else {
      Alert.alert(
        "Invalid Credentials",
        `Please enter a valid credentials to ${
          signUpMode ? `Sign Up` : `Login`
        }`,
        [{ title: "Okay" }]
      );
    }
  };

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
    },
    inputsValidity: {
      email: false,
      password: false,
    },
    formValidity: false,
  });

  const inputChangeHandler = useCallback(
    (inputType, text, inputValidity) => {
      dispatchFormState({
        type: UPDATE_FORM,
        value: text,
        isValid: inputValidity,
        inputType: inputType,
      });
    },
    [dispatchFormState]
  );

  useEffect(() => {
    if (error) {
      Alert.alert("An error occured", error, [{ title: "Okay" }]);
    }
  }, [error]);

  return (
    <KeyboardAvoidingView style={styles.screen}>
      <LinearGradient colors={["#ff4800", "#4254fc"]} style={styles.gradient}>
        <View style={styles.authContainer}>
          <ScrollView>
            <Input
              label="EMAIL"
              id="email"
              keyboardType="email-address"
              required
              email
              onInputChange={inputChangeHandler}
            />
            <Input
              label="PASSWORD"
              id="password"
              secureTextEntry
              keyboardType="default"
              minLength={5}
              required
              onInputChange={inputChangeHandler}
            />
            {loading ? (
              <ActivityIndicator
                size="small"
                color={Colors.primary}
                style={{ marginTop: 20 }}
              />
            ) : (
              <View style={styles.buttons}>
                <Button
                  title={signUpMode ? "Sign Up" : "Login"}
                  color={Colors.primary}
                  onPress={authHandler}
                />
                <Button
                  title={signUpMode ? "Already have Account" : "Create Account"}
                  color={Colors.primary}
                  onPress={() => {
                    setSignUpMode((state) => !state);
                  }}
                />
              </View>
            )}
          </ScrollView>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export const authScreenOptions = {
  headerTitle: "Login",
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  authContainer: {
    maxHeight: 400,
    maxWidth: 400,
    width: "80%",
    padding: 20,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
    borderRadius: 10,
    backgroundColor: "white",
  },
  gradient: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttons: {
    marginVertical: 10,
    justifyContent: "space-between",
    height: 80,
  },
});

export default AuthScreen;
