import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Pressable,
} from "react-native";
import { Button, Text, TextInput, HelperText } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useAdmin } from "../../CustomHooks/useAdmin";
import { DefaultTheme, Modal, Portal } from "react-native-paper";
import {
  addDoc,
  collection,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import Header from "../../Components/Header";
import Db from "../../Config/Db";
export const AddTaxi = () => {
  const { getTaxi } = useAdmin();
  const [taxiName, setTaxiName] = useState("");
  const [taxiNumber, setTaxiNumber] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  const [isActive, setIsActive] = useState(false);
  const [visible, setVisible] = useState(false);
  const [allTaxi, setAllTaxi] = useState([]);

  const [nameError, setNameError] = useState(false);
  const [numberError, setNumberError] = useState(false);

  const navigation = useNavigation();

  const validateTaxiName = (text) => {
    if (taxiName.length < 6) {
      setIsActive(true);
      setNameError(true);
      return false;
    } else {
      setTaxiName(text);
      setNameError(false);
    }
  };
  const validateTaxiNumber = (text) => {
    if (taxiNumber.length < 6) {
      setNumberError(true);
      setIsActive(true);
      return false;
    } else {
      setTaxiNumber(text);
      setNumberError(false);
    }
  };
  // useEffect(() => {
  //   if (
  //     email.length > 0 &&
  //     password.length > 0 &&
  //     !emailError &&
  //     !passwordError
  //   ) {
  //     setIsActive(false);
  //   }
  // }, [email, password]);

  const onPressAdd = async () => {
    try {
      if (selectedItem != null) {
        const docRef = doc(Db, "taxi", selectedItem?.id);
        updateDoc(
          docRef,
          { taxiName: taxiName, taxiNumber: taxiNumber },
          { merge: true }
        );
        getAllTaxi();
        setSelectedItem(null);
        setTaxiName("");
        setTaxiNumber("");
        setVisible(false);
      } else {
        await addDoc(collection(Db, "taxi"), {
          taxiName: taxiName,
          taxiNumber: taxiNumber,
        });
        getAllTaxi();
        setVisible(false);
      }
    } catch (error) {
      console.log("ERrror", error);
    }

    // const data = await checkLoggedIn("bharat@gmail.com");
    // if (data) {
    //   navigation.navigate("Home");
    // } else {
    //   alert("check your email and password");
    // }
    //
  };

  const onPressDelete = async (id) => {
    try {
      await deleteDoc(doc(Db, "taxi", id));

      getAllTaxi();
    } catch (error) {
      console.log("ERrror", error);
    }

    // const data = await checkLoggedIn("bharat@gmail.com");
    // if (data) {
    //   navigation.navigate("Home");
    // } else {
    //   alert("check your email and password");
    // }
    //
  };

  const getAllTaxi = async () => {
    const data = await getTaxi();
    console.log("Taxi", data);
    setAllTaxi(data);
  };
  useEffect(() => {
    getAllTaxi();
  }, []);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {
    backgroundColor: "white",
    padding: 10,
    width: "92%",
    alignSelf: "center",
    borderRadius: 10,
  };
  const onPressEdit = (item) => {
    setSelectedItem(item);
    setTaxiName(item?.taxiName);
    setTaxiNumber(item?.taxiNumber);
    showModal(true);
  };
  const renderTaxiCard = ({ item }) => (
    <View
      style={{
        flex: 1,
        height: "20%",

        margin: 10,
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <View style={{ flexDirection: "column" }}>
        <Text>Taxi-Number: {item?.taxiNumber}</Text>
        <Text>{item?.taxiName}</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <MaterialIcons
          name="delete"
          size={24}
          color="black"
          onPress={() => onPressDelete(item.id)}
        />
        <Entypo
          name="edit"
          size={24}
          color="black"
          onPress={() => onPressEdit(item)}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header
        title="TAXI"
        rightButtonTitle="Add Taxi"
        onPressButton={() => showModal(true)}
      />
      <FlatList data={allTaxi} renderItem={renderTaxiCard} />
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={containerStyle}
      >
        <KeyboardAvoidingView>
          <View
            style={{
              flexDirection: "row",
              margin: 4,
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{ alignSelf: "center", fontSize: 20, fontWeight: "bold" }}
            >
              {selectedItem ? "Update Taxi" : "Add New Taxi"}
            </Text>
            <Pressable onPress={hideModal}>
              <Entypo name="cross" size={24} color="black" />
            </Pressable>
          </View>
          <TextInput
            value={taxiName}
            style={{ marginVertical: 20 }}
            label="Add Taxi Name"
            keyboardType="email-address"
            onChangeText={(text) => setTaxiName(text)}
          />

          <HelperText type="error" visible={nameError} fontSize={10}>
            Please enter valid name/modal
          </HelperText>
          <TextInput
            value={taxiNumber}
            style={{ marginBottom: 20 }}
            label="Taxi Number"
            onChangeText={(text) => setTaxiNumber(text)}
          />
          <HelperText type="error" visible={numberError} fontSize={10}>
            Please Enter correct Taxi number
          </HelperText>
          <Button
            mode="contained"
            onPress={() => onPressAdd()}
            disabled={false}
          >
            Add
          </Button>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f1ed",
    color: "#ffff",
  },
  loginContainer: {
    padding: 10,
    borderRadius: 10,
    justifyContent: "space-around",
  },
});
