import React, { useEffect } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  AsyncStorage,
} from "react-native";
import { useDispatch } from "react-redux";

import Colors from "./../constants/Colors";
import * as AuthActions from "./../store/actions/auth";

const LauncherScreen = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      const userData = await AsyncStorage.getItem("userData");
      if (!userData) {
        props.navigation.navigate("Auth");
        return;
      }

      const userDataVariable = JSON.parse(userData);
      const { token, userId, expirationDate } = userDataVariable;
      const expiryDate = new Date(expirationDate);

      if (expiryDate <= new Date() || !token || !userId) {
        props.navigation.navigate("Auth");
        return;
      }

      props.navigation.navigate("App");

      const expirationTime = expiryDate.getTime() - new Date().getTime;

      dispatch(AuthActions.authenticate(userId, token, expirationTime));
    };
    checkUserLoggedIn();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LauncherScreen;
