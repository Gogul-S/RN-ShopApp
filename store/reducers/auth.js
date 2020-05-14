import { SIGN_IN, SIGN_UP, AUTHENTICATE, LOG_OUT } from "../actions/auth";

const initialState = {
  token: null,
  userId: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        ...state,
        token: action.token,
        userId: action.userId,
      };
    case LOG_OUT:
      return {
        initialState,
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
