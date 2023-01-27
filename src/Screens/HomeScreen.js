import React, { useEffect } from "react";
import { View, StyleSheet, FlatList, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { getMovies } from "../Redux/Actions/MoviesAction";
import {
  Button,
  Card,
  Text,
  ActivityIndicator,
  Appbar,
  useTheme,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";

import Header from "../Components/Header";
import MovieCard from "../Components/MovieCard";
import { logout } from "../Redux/Actions/AuthAction";

export const HomeScreen = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigation = useNavigation();

  const data = useSelector((state) => state.movies?.allMovies);
  const login = useSelector((state) => state.auth);
  console.log("Login", login);

  useEffect(() => {
    dispatch(getMovies());
  }, []);

  return (
    <View style={styles.container}>
      <Header
        title="MOVIES"
        goBack={() => {
          dispatch(logout());
          navigation.goBack();
        }}
      />
      {data.length ? (
        <FlatList
          data={data}
          extraData={data}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          renderItem={({ item }) => <MovieCard item={item} />}
          contentContainerStyle={{ margin: 7, paddingBottom: 30 }}
          ItemSeparatorComponent={() => (
            <View style={{ height: 10, width: "100%" }} />
          )}
        />
      ) : (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator animating={true} color={"#235743"} />
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
  },
});
