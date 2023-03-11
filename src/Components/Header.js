import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Appbar, Text, withTheme } from "react-native-paper";

const Header = ({ title, onPressButton }) => {
  return (
    <Appbar.Header
      style={{ height: 35, backgroundColor: "#6750a4", padding: 4 }}
    >
      <Appbar.Content title={title} titleStyle={{ color: "#ffff" }} />
      <View style={{ padding: 2 }}>
        <TouchableOpacity onPress={onPressButton}>
          <Text variant="labelLarge" style={{ color: "#ffff" }}>
            ADD+
          </Text>
        </TouchableOpacity>
      </View>
    </Appbar.Header>
  );
};
export default withTheme(Header);
