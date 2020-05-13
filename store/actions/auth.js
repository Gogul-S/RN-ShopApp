export const SIGN_UP = "SIGN_UP";
export const SIGN_IN = "SIGN_IN";

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

    dispatch({
      type: SIGN_UP,
      token: resData.idToken,
      userId: resData.localId,
    });
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

    dispatch({
      type: SIGN_IN,
      token: resData.idToken,
      userId: resData.localId,
    });
  };
};
