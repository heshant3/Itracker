import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Home";
import VehicleSelect from "./VehicleSelect";
import Profile from "./Profile";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="VehicleSelect"
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
        }}
      >
        <Stack.Screen name="VehicleSelect" component={VehicleSelect} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
