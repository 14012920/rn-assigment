import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import MoviesReducer from "./MoviesReducer";

export const RootReducer = combineReducers({
  auth: AuthReducer,
  movies: MoviesReducer,
});
