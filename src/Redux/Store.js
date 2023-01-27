import {
  applyMiddleware,
  legacy_createStore as createStore,
  compose,
} from "redux";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import logger from "redux-logger";
import { RootReducer } from "./Reducers/RootReducer";
import thunk from "redux-thunk";
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};
const middleWare = [thunk, logger];
const persistedReducer = persistReducer(persistConfig, RootReducer);
export const Store = createStore(
  persistedReducer,
  compose(applyMiddleware(...middleWare))
);
export const persistor = persistStore(Store);
