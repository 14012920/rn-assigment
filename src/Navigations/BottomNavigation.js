import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AddPkg } from "../Screens/Admin/AddPkg";
import { AddTaxi } from "../Screens/Admin/AddTaxi";
import { AllRides } from "../Screens/Admin/AllRides";
import MyTabBar from "./MytabBar";
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Rides"
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <MyTabBar {...props} />}
    >
      <Tab.Screen name="Rides" component={AllRides} />
      <Tab.Screen name="Taxi" component={AddTaxi} />
      <Tab.Screen name="Package" component={AddPkg} />
    </Tab.Navigator>
  );
}
export default MyTabs;
