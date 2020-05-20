import {
  SIGN_IN,
  SIGN_UP,
  AUTHENTICATE,
  LOG_OUT,
  LOGIN_TRIED,
} from "../actions/auth";

const initialState = {
  token: null,
  userId: null,
  loginTried: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
        loginTried: true,
      };
    case LOG_OUT:
      return {
        ...initialState,
        loginTried: true,
      };
    case LOGIN_TRIED:
      return {
        ...state,
        loginTried: true,
      };
    // case SIGN_UP:
    //   return {
    //     ...state,
    //     token: action.token,
    //     userId: action.userId,
    //   };
  }
  return state;
};
