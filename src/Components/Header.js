import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Appbar, Text, withTheme } from "react-native-paper";

const Header = ({ title, onPressButton, rightButtonTitle }) => {
  return (
    <Appbar.Header
      mode="small"
      elevated
      style={{ backgroundColor: "#6750a4", padding: 1 }}
    >
      <Appbar.Content
        title={title}
        titleStyle={{ color: "#ffff", maxhHight: 35 }}
      />
      <View style={{ padding: 2 }}>
        <TouchableOpacity onPress={onPressButton}>
          <Text
            variant="labelLarge"
            style={{ color: "#ffff", fontWeight: "700" }}
          >
            {rightButtonTitle}
          </Text>
        </TouchableOpacity>
      </View>
    </Appbar.Header>
  );
};
export default withTheme(Header);
