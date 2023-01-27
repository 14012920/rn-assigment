import { LOG_IN, LOG_OUT } from "../ActionsType/AuthActionType";

export const defaultState = {
  email: "",
  password: "",
};

const AuthReducer = (state = defaultState, action) => {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        email: action.payload.email,
        password: action.payload.password,
      };
    case LOG_OUT:
      return defaultState;
    default:
      return state;
  }
};

export default AuthReducer;
