import React, { useEffect } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import {
  Button,
  Card,
  Text,
  ActivityIndicator,
  Appbar,
  useTheme,
} from "react-native-paper";
import { useNavigation, CommonActions } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";

import Header from "../../Components/Header";

export const Profile = () => {
  const theme = useTheme();
  const navigation = useNavigation();

  useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      <Header
        title="Profile"
        rightButtonTitle="Logout"
        onPressButton={() =>
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "Login" }],
            })
          )
        }
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
  },
});
