import { StyleSheet, Text, View } from "react-native";
import React from "react";

import Navigation from "./Navigation";
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

  if (!fontsLoaded) {
    return null; // Render nothing until fonts are loaded
  }
  return <Navigation />;
};

export default App;
