import React, { useState } from "react";
import { View, Text, FlatList, Button } from "react-native";
import * as FileSystem from "expo-file-system";
ExcelJS;
import ExcelJS from "exceljs";
// Share excel via share dialog
import * as Sharing from "expo-sharing";
import { Buffer as NodeBuffer } from "buffer";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../Components/Header";

export const AllRides = () => {
  const [allRides, setAllRides] = useState([
    {
      date: "11/1/22",
      dsn: "22030",
      cn: "HR39E3371",
      desc: "pkg(8*80)",
      rate: 950,
      amount: 1200,
      remark: "Dezire",
    },
    {
      date: "12/1/22",
      dsn: "2203055",
      cn: "HR51E3371",
      desc: "pkg(4*40)",
      rate: 450,
      amount: 600,
      remark: "Amaze",
    },
  ]);

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
      const worksheet = workbook.addWorksheet("My Sheet", {});
      // Just some columns as used on ExcelJS Readme
      worksheet.columns = [
        { header: "date", key: "date", width: 30 },
        { header: "Duty Slip No.", key: "dsn", width: 32 },
        { header: "Car No", key: "cn", width: 30 },
        { header: "Description", key: "desc", width: 30 },
        { header: "Rate", key: "rate", width: 30 },
        { header: "Amount", key: "amount", width: 30 },
        { header: "Remark", key: "remark", width: 30 },
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
        });
      });
      console.log("worksheet", worksheet);
      worksheet.addRow({
        date: "12/1/22",
        dsn: "2203055",
        cn: "HR51E3371",
        desc: "pkg(4*40)",
        rate: 450,
        amount: 600,
        remark: "Amaze",
      });

      // Test styling

      // Style first row
      worksheet.getRow(1).font = {
        name: "Comic Sans MS",
        family: 4,
        size: 16,
        underline: "double",
        bold: true,
      };
      // Style second column
      worksheet.eachRow((row, rowNumber) => {
        row.font = {
          name: "Arial Black",
          color: { argb: "252625" },
          family: 2,
          size: 14,
          bold: false,
        };
      });

      // Write to file
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
    Sharing.shareAsync(shareableExcelUri, {
      mimeType:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // Android
      dialogTitle: "Your dialog title here", // Android and Web
      UTI: "com.microsoft.excel.xlsx", // iOS
    })
      .catch((error) => {
        console.error("Error", error);
      })
      .then(() => {
        console.log("Return from sharing dialog");
      });
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
      <FlatList data={allRides} renderItem={renderRideCard} />
    </View>
  );
};
