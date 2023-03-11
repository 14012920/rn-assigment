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

export const HomeScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();

  useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      <Header title="MOVIES" goBack={() => navigation.goBack()} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
  },
});
