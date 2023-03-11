import React, { useEffect } from "react";
import { View, Text } from "react-native";
import Header from "../../Components/Header";
import { useAdmin } from "../../CustomHooks/useAdmin";
export const AddPkg = () => {
  const { getPackage } = useAdmin();

  const getAllPkg = async () => {
    const data = await getPackage();
    console.log("packge", data);
  };
  useEffect(() => {
    getAllPkg();
  }, []);
  return (
    <View>
      <Header
        title="All Package"
        rightButtonTitle="Generate Excel"
        onPressButton={() => shareExcel()}
      />
    </View>
  );
};
