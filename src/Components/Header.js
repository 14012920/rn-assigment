import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Appbar, Text, withTheme } from "react-native-paper";

const Header = ({ title, goBack }) => {
  return (
    <Appbar.Header>
      <Appbar.Content title={title} />
      <View style={{ padding: 4 }}>
        <TouchableOpacity onPress={goBack}>
          <Text variant="labelLarge">Logout</Text>
        </TouchableOpacity>
      </View>
    </Appbar.Header>
  );
};
export default withTheme(Header);
