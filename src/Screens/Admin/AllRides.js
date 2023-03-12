import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Button } from "react-native";
import * as FileSystem from "expo-file-system";
ExcelJS;
import ExcelJS from "exceljs";
// Share excel via share dialog
import * as Sharing from "expo-sharing";
// import * as Permissions from "expo-permissions";
import { Buffer as NodeBuffer } from "buffer";
import { SafeAreaView } from "react-native-safe-area-context";
import { StorageAccessFramework } from "expo-file-system";
import Header from "../../Components/Header";
import { useAdmin } from "../../CustomHooks/useAdmin";
import {
  addDoc,
  collection,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import Db from "../../Config/Db";

export const AllRides = () => {
  const { getAllRides } = useAdmin();
  const [allRides, setAllRides] = useState([]);

  const getRides = async () => {
    const data = await getAllRides();
    setAllRides(data);
  };
  useEffect(() => {
    getRides();
  }, []);

  const addRide = async () => {
    try {
      await addDoc(collection(Db, "rides"), {
        date: "10/03/23",
        dsn: "220305566",
        cn: "HR51H4433",
        desc: "airport drop",
        rate: 1220,
        amount: 600,
        remark: "dZire",
      });
      getRides();
    } catch (error) {
      console.log("error", error);
    }
  };

  const generateShareableExcel = async () => {
    const now = new Date();
    const fileName = "YourFilename.xlsx";
    const fileUri = FileSystem.cacheDirectory + fileName;
    return new Promise((resolve, reject) => {
      const workbook = new ExcelJS.Workbook();
      workbook.creator = "Me";
      workbook.created = now;
      workbook.modified = now;
      // Add a sheet to work on
      const worksheet = workbook.addWorksheet("My Sheet", {
        useStyles: true,
        horizontalCentered: true,
        verticalCentered: true,
      });
      // Just some columns as used on ExcelJS Readme
      worksheet.columns = [
        { header: "DATE", key: "date", width: 20 },
        { header: "DUTY SLIP NO.", key: "dsn", width: 20 },
        { header: "CAR NO.", key: "cn", width: 20 },
        { header: "DESCRIPTION", key: "desc", width: 30 },
        { header: "RATE", key: "rate", width: 10 },
        { header: "AMOUNT", key: "amount", width: 10 },
        { header: "REMARKS", key: "remark", width: 12 },
        { header: "Vendor", key: "vendor", width: 12 },
      ];
      // Add some test data
      allRides.forEach((item) => {
        worksheet.addRow({
          date: item?.date,
          dsn: item?.dsn,
          cn: item?.cn,
          desc: item?.desc,
          rate: item?.rate,
          amount: item?.amount,
          remark: item?.remark,
          vendow: item?.vendor,
        });
      });
      worksheet.getRow(1).font = {
        name: "Comic Sans MS",
        family: 4,
        size: 16,
        bold: true,
      };
      workbook.xlsx.writeBuffer().then((buffer) => {
        // Do this to use base64 encoding
        const nodeBuffer = NodeBuffer.from(buffer);
        const bufferStr = nodeBuffer.toString("base64");
        FileSystem.writeAsStringAsync(fileUri, bufferStr, {
          encoding: FileSystem.EncodingType.Base64,
        })
          .then(() => {
            resolve(fileUri);
          })
          .catch((error) => {
            reject("errrooor", error);
          });
      });
    });
  };

  const shareExcel = async () => {
    const shareableExcelUri = await generateShareableExcel();
    const permissions =
      await StorageAccessFramework.requestDirectoryPermissionsAsync();
    if (!permissions.granted) {
      return;
    } else {
      const fileName = "newFIle3.xlsx";
      const fileString = await FileSystem.readAsStringAsync(shareableExcelUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      try {
        await StorageAccessFramework.createFileAsync(
          permissions.directoryUri,
          fileName,
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        )
          .then(async (uri) => {
            await FileSystem.writeAsStringAsync(uri, fileString, {
              encoding: FileSystem.EncodingType.Base64,
            });
          })
          .catch((e) => {
            console.log("EROOORRR", e);
          });
      } catch (e) {
        throw new Error("EEEEE", e);
      }
    }
  };
  const renderRideCard = ({ item }) => (
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
        <Text style={{ color: "#240536", fontSize: 15, fontWeight: "600" }}>
          Date
        </Text>
        <Text style={{ color: "#240536", fontSize: 15, fontWeight: "600" }}>
          Duty Slip No.
        </Text>
        <Text style={{ color: "#240536", fontSize: 15, fontWeight: "600" }}>
          Car Number
        </Text>
        <Text style={{ color: "#240536", fontSize: 15, fontWeight: "600" }}>
          Description
        </Text>
        <Text style={{ color: "#240536", fontSize: 15, fontWeight: "600" }}>
          Rate
        </Text>
        <Text style={{ color: "#240536", fontSize: 15, fontWeight: "600" }}>
          Amount
        </Text>
        <Text style={{ color: "#240536", fontSize: 15, fontWeight: "600" }}>
          Remark
        </Text>
      </View>
      <View style={{ flexDirection: "column" }}>
        <Text style={{ color: "#212121", fontSize: 15, fontWeight: "400" }}>
          {item?.date}
        </Text>
        <Text style={{ color: "#212121", fontSize: 15, fontWeight: "400" }}>
          {item?.dsn}
        </Text>
        <Text style={{ color: "#212121", fontSize: 15, fontWeight: "400" }}>
          {item?.cn}
        </Text>
        <Text style={{ color: "#212121", fontSize: 15, fontWeight: "400" }}>
          {item?.desc}
        </Text>
        <Text style={{ color: "#212121", fontSize: 15, fontWeight: "400" }}>
          {item?.rate}
        </Text>
        <Text style={{ color: "#212121", fontSize: 15, fontWeight: "400" }}>
          {item?.amount}
        </Text>
        <Text style={{ color: "#212121", fontSize: 15, fontWeight: "400" }}>
          {item?.remark}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#f2f1ed" }}>
      <Header
        title="Rides"
        rightButtonTitle="Generate Excel"
        onPressButton={() => shareExcel()}
      />
      {/* <Button title="Add" onPress={addRide} /> */}
      <FlatList data={allRides} renderItem={renderRideCard} />
    </View>
  );
};
