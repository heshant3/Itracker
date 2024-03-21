import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import No_internet from "./No_internet";
import NetInfo from "@react-native-community/netinfo";
import Navigation from "./Navigation";

SplashScreen.preventAutoHideAsync();

import {
  useFonts,
  Inter_600SemiBold,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
} from "@expo-google-fonts/inter";

const App = () => {
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

  if (!fontsLoaded) {
    return; // Render nothing until fonts are loaded
  }
  return isConnected ? <Navigation /> : <No_internet />;
};

export default App;
