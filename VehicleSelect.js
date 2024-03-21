import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React from "react";
import { ScaledSheet } from "react-native-size-matters";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const navigation = useNavigation();

  const navigateToHomePage = () => {
    // Navigate to the home page
    navigation.navigate("Home"); // Replace "HomePage" with the name of the screen you want to navigate to
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#E8EEF1" }}>
      <StatusBar barStyle="dark-content" backgroundColor="#E8EEF1" />
      <View
        style={{ height: "10%", paddingLeft: 20, justifyContent: "center" }}
      >
        <Text style={styles.HeadText}>Select your Vehicle</Text>
      </View>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <TouchableOpacity style={styles.Box} onPress={navigateToHomePage}>
          <View style={styles.Vehicle}>
            <Text style={styles.VehicleText}>Car</Text>
          </View>
          <View style={styles.ImageView}>
            <Image
              source={require("./assets/Car.png")}
              style={[styles.image, StyleSheet.absoluteFillObject]}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Box1}>
          <Text style={styles.AddVehicleText}>Add Your vehicle</Text>
          <AntDesign name="pluscircle" size={24} color="#49a8ff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = ScaledSheet.create({
  HeadText: {
    fontSize: "25@mvs",
    fontFamily: "Inter_600SemiBold",
    color: "#595959",
  },

  Box: {
    flexDirection: "row",
    marginBottom: 90,
    width: "85%",
    height: "15%",
    backgroundColor: "#fff",
    borderRadius: 20,
    elevation: 5,
    overflow: "hidden",
  },

  Box1: {
    flexDirection: "column",
    marginBottom: 90,
    width: "85%",
    height: "15%",
    backgroundColor: "#fff",
    borderRadius: 20,
    elevation: 5,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },

  Vehicle: {
    flex: 0.6,
    justifyContent: "center",
    alignItems: "center",
  },

  VehicleText: {
    fontSize: "35@mvs",
    fontFamily: "Inter_600SemiBold",
    color: "#595959",
  },
  ImageView: {
    flex: 1,
  },

  image: {
    resizeMode: "contain",
    width: "100%",
    height: "80%",
    marginTop: 10,
  },

  AddVehicleText: {
    fontSize: "19@mvs",
    fontFamily: "Inter_600SemiBold",
    color: "#595959",
    marginBottom: 20,
  },
});
