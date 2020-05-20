import { AsyncStorage } from "react-native";

export const AUTHENTICATE = "AUTHENTICATE";
export const LOG_OUT = "LOGOUT";
export const LOGIN_TRIED = "LOGIN TRIED";

let timer;

export const authenticate = (userId, token, expiryTime) => {
  return (dispatch) => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch({
      type: AUTHENTICATE,
      userId,
      token,
    });
  };
};

export const signUp = (emailId, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDhxENvhzcTpJ0QWrwG0-9mh6fVykm4Kos",
      {
        method: "POST",
        headers: {
          Content_Type: "application/json",
        },
        body: JSON.stringify({
          email: emailId,
          password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errData = await response.json();
      const errorMessage = errData.error.message;
      let message = "Something went wrong!";
      if (errorMessage === "EMAIL_EXISTS") {
        message = "This Email already exists";
      }
      throw new Error(message);
    }

    const resData = await response.json();

    dispatch(
      authenticate(
        resData.localId,
        resData.idToken,
        parseInt(resData.expiresIn) * 1000
      )
    );

    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );
    saveAuthDataToStorage(resData.localId, resData.idToken, expirationDate);
  };
};

export const signIn = (emailId, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDhxENvhzcTpJ0QWrwG0-9mh6fVykm4Kos",
      {
        method: "POST",
        headers: {
          Content_Type: "application/json",
        },
        body: JSON.stringify({
          email: emailId,
          password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errData = await response.json();
      const errorMessage = errData.error.message;
      let message = "Something went wrong!";
      if (errorMessage === "EMAIL_NOT_FOUND") {
        message = "This User could not be found";
      } else if (errorMessage === "INVALID_PASSWORD") {
        message = "Incorrect Password";
      }
      throw new Error(message);
    }

    const resData = await response.json();

    dispatch(
      authenticate(
        resData.localId,
        resData.idToken,
        parseInt(resData.expiresIn) * 1000
      )
    );

    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );
    saveAuthDataToStorage(resData.localId, resData.idToken, expirationDate);
  };
};

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem("userData"); //fire and forget
  return {
    type: LOG_OUT,
  };
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = (logoutMillis) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, logoutMillis);
  };
};

const saveAuthDataToStorage = (userId, token, expirationDate) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      userId,
      token,
      expirationDate: expirationDate.toISOString(),
    })
  );
};

export const setLoginTried = () => {
  return {
    type: LOGIN_TRIED,
  };
};
