import React from "react";
import { View, Text, FlatList } from "react-native";

export const AllRides = () => {
  const renderRideCard = () => (
    <View
      style={{
        flex: 1,
        height: "20%",

        margin: 10,
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        flexDirection: "row",
      }}
    >
      <View style={{ flexDirection: "column" }}>
        <Text>Package: 4/60</Text>
        <Text>DZire</Text>
      </View>
      <View>
        <Text> Rate: 600rs</Text>
        <Text>Extra : 2okm</Text>
      </View>
    </View>
  );

  return (
    <View>
      <FlatList data={[{}, {}]} renderItem={renderRideCard} />
    </View>
  );
};
