import { View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { DefaultTheme, Modal, Portal } from "react-native-paper";

function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View
      style={{
        flexDirection: "row",
        height: 60,
        width: "100%",
        backgroundColor: "#6750a4",
        alignItems: "center",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        justifyContent: "space-evenly",
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <View key={index}>
            <TouchableOpacity
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ alignItems: "center" }}
            >
              <MaterialCommunityIcons
                name={
                  label === "Package"
                    ? "package"
                    : label === "Taxi"
                    ? "car"
                    : label === "Profile"
                    ? "account"
                    : "road"
                }
                size={24}
                color={isFocused ? "#292b2b" : "#FFF"}
              />
              <Text style={{ color: isFocused ? "#292b2b" : "#FFF" }}>
                {label}
              </Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
}
export default MyTabBar;
