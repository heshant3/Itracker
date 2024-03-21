import { StyleSheet, Text, View, StatusBar } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";

import { ScaledSheet } from "react-native-size-matters";

export default function No_internet() {
  return (
    <View style={styles.view}>
      <StatusBar style="dark" />
      <LottieView
        source={require("./animation.json")} // Change 'animation.json' to your Lottie animation file
        autoPlay
        loop
        style={{ height: 350 }}
      />

      <Text style={styles.text}>Please turn on your internet</Text>
    </View>
  );
}

const styles = ScaledSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#E8EEF1",
    alignContent: "center",
  },

  text: {
    justifyContent: "center",
    alignSelf: "center",
    fontSize: "20@s",
    fontFamily: "Inter_400Regular",
    color: "#515151",
  },
});
