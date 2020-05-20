import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";

import { RootAppNavigator, AuthNavigator } from "./ShopNavigator";
import { NavigationContainer } from "@react-navigation/native";
import LauncherScreen from "./../screens/LauncherScreen";

const AppNavigator = (props) => {
  const isAuth = useSelector((state) => !!state.auth.token);
  const loginTried = useSelector((state) => state.auth.loginTried);
  return (
    <NavigationContainer>
      {isAuth && <RootAppNavigator />}
      {!isAuth && loginTried && <AuthNavigator />}
      {!isAuth && !loginTried && <LauncherScreen />}
    </NavigationContainer>
  );
};

export default AppNavigator;
