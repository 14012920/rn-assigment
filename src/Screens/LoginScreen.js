import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, KeyboardAvoidingView } from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { loggedIn } from "../Redux/Actions/AuthAction";
import { Button, Text, TextInput, HelperText } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isActive, setIsActive] = useState(true);

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const login = useSelector((state) => state.auth);
  const validateEmail = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      setIsActive(true);
      setEmailError(true);
      return false;
    } else {
      setEmail(text);
      setEmailError(false);
    }
  };
  const validatePassword = (text) => {
    let reg = /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/;
    if (reg.test(text) === false) {
      setPasswordError(true);
      setIsActive(true);
      return false;
    } else {
      setPassword(text);
      setPasswordError(false);
    }
  };
  useEffect(() => {
    if (
      email.length > 0 &&
      password.length > 0 &&
      !emailError &&
      !passwordError
    ) {
      setIsActive(false);
    }
  }, [email, password]);

  const onPressLogin = () => {
    dispatch(loggedIn({ email: email, password: password }));
    navigation.navigate("Home");
  };
  useEffect(() => {
    if (login?.email) {
      navigation.navigate("Home");
    }
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.loginContainer}>
        <KeyboardAvoidingView>
          <Text
            style={{ alignSelf: "center", fontSize: 20, fontWeight: "bold" }}
          >
            LOGIN
          </Text>
          <TextInput
            style={{ marginVertical: 20 }}
            label="Email"
            keyboardType="email-address"
            onChangeText={(text) => validateEmail(text)}
          />
          <HelperText type="error" visible={emailError} fontSize={10}>
            Please enter valid email
          </HelperText>
          <TextInput
            style={{ marginBottom: 20 }}
            secureTextEntry
            label="Password"
            onChangeText={(text) => validatePassword(text)}
          />
          <HelperText type="error" visible={passwordError} fontSize={10}>
            Valid password should be 8 - 15 length and minimum one Alpha Number
            one Capital Letter and 1 Special Character
          </HelperText>
          <Button
            mode="contained"
            onPress={() => onPressLogin()}
            disabled={isActive}
          >
            Login
          </Button>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    margin: "2%",

    backgroundColor: "#f2f1ed",
  },
  loginContainer: {
    padding: 10,
    borderRadius: 10,
    justifyContent: "space-around",
  },
});
