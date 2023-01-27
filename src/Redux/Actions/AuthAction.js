import { LOG_IN, LOG_OUT } from "../ActionsType/AuthActionType";
export const loggedIn = (data) => {
  return { type: LOG_IN, payload: data };
};
export const logout = (data) => {
  return { type: LOG_OUT, payload: data };
};
