import { SIGN_IN, SIGN_UP } from "../actions/auth";

const initialState = {
  token: null,
  userId: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        token: action.token,
        userId: action.userId,
      };
    case SIGN_UP:
      return {
        ...state,
        token: action.token,
        userId: action.userId,
      };
  }
  return state;
};
