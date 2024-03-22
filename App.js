import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import No_internet from "./No_internet";
import NetInfo from "@react-native-community/netinfo";
import Navigation from "./Navigation";
import * as Location from "expo-location";
import { UserLocationContext } from "./Contex/UserLocationContex";

SplashScreen.preventAutoHideAsync();

import {
  useFonts,
  Inter_600SemiBold,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
} from "@expo-google-fonts/inter";

const App = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  let [fontsLoaded] = useFonts({
    Inter_600SemiBold,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
  });

  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    // Subscribe to network state changes
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    // Hide splash screen after 2 seconds
    setTimeout(() => {
      SplashScreen.hideAsync();
    }, 2000);

    // Unsubscribe when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  if (!fontsLoaded) {
    return; // Render nothing until fonts are loaded
  }
  return (
    <UserLocationContext.Provider value={{ location, setLocation }}>
      <Navigation />
    </UserLocationContext.Provider>
  );
};

export default App;
