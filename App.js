import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "./src/Screens/HomeScreen";
import { LoginScreen } from "./src/Screens/LoginScreen";

import { Provider as PaperProvider } from "react-native-paper";
import Apptheme from "./src/Theme/ThemeConfig";
import MyTabs from "./src/Navigations/BottomNavigation";
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    // <Provider store={Store}>
    //   <PersistGate loading={null} persistor={persistor}>
    <PaperProvider theme={Apptheme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={"Login"}>
          <Stack.Screen
            name="Home"
            component={MyTabs}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
    //   </PersistGate>
    // </Provider>
  );
}
