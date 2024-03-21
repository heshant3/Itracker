import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { ScaledSheet } from "react-native-size-matters";

import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Profile() {
  const navigation = useNavigation();

  const handleLogout = () => {
    // Perform logout actions here, such as clearing user data from AsyncStorage or logging out from your authentication provider

    // Navigate back to the Login screen
    navigation.navigate("VehicleSelect");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#E8EEF1" />
      <View style={styles.Header}>
        <Text style={styles.HeadText}>Additional Info</Text>
      </View>
      <View style={styles.Body}>
        <View style={styles.Circle}>
          <FontAwesome name="user-circle-o" size={100} color="#49a8ff" />
        </View>
        <View style={styles.Box}>
          <View style={styles.BodyBox}>
            <View style={styles.BodyBoxContain}>
              <Text style={styles.Text}>Name: </Text>
              <Text style={styles.Text2} paddingLeft={78}>
                Jony Amex
              </Text>
            </View>

            <View style={styles.BodyBoxContain}>
              <Text style={styles.Text}>Vehicle Type: </Text>
              <Text style={styles.Text2} paddingLeft={20}>
                6595876038V
              </Text>
            </View>
            <View style={styles.BodyBoxContain}>
              <Text style={styles.Text}>Reg Number:</Text>
              <Text style={styles.Text2} paddingLeft={28}>
                3467754
              </Text>
            </View>
          </View>
        </View>
        <Text style={styles.RoutineText}>Routine Analyse </Text>
        <View style={styles.Box1}>
          <Image source={require("./assets/route.png")} style={styles.image} />
        </View>
        {/* <View style={styles.SubmitbtnView}>
          <TouchableOpacity style={styles.Submitbtn} onPress={handleLogout}>
            <Text style={styles.SubmitText}>Log out</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </SafeAreaView>
  );
}

const styles = ScaledSheet.create({
  container: {
    backgroundColor: "#E8EEF1",
    flex: 1,
  },

  Header: {
    flex: 0.13,
    justifyContent: "center",
  },

  HeadText: {
    fontSize: "25@mvs",
    color: "#5B5B5B",
    alignSelf: "center",
    fontFamily: "Inter_500Medium",
  },

  Body: {
    flex: 1,
    justifyContent: "flex-start",
  },

  Circle: {
    width: 120,
    height: 120,
    borderRadius: 100,
    alignSelf: "center",
    marginBottom: 40,
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFF",
    elevation: 10,
    shadowColor: "#49A8FF",
  },

  Box: {
    alignSelf: "center",
    width: "90%",
    height: 200,
    elevation: 10,
    borderRadius: 30,
    backgroundColor: "#FFFF",
    shadowColor: "#49A8FF",
    justifyContent: "center",
    overflow: "hidden",
  },

  BodyBox: {
    flex: 1,
    alignSelf: "center",
    width: "80%",
    height: 250,
    justifyContent: "center",
  },

  BodyBoxContain: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },

  Text: {
    marginVertical: 10,
    fontSize: "20@mvs",
    color: "#5B5B5B",
    fontFamily: "Inter_400Regular",
  },

  Text2: {
    marginVertical: 10,
    fontSize: "20@mvs",
    color: "#000000",
    fontFamily: "Inter_400Regular",
  },

  RoutineText: {
    marginTop: 50,
    marginBottom: 20,
    fontSize: "25@mvs",
    color: "#5B5B5B",
    fontFamily: "Inter_400Regular",
    marginLeft: 30,
  },

  Box1: {
    alignSelf: "center",
    width: "90%",
    height: 200,
    elevation: 10,
    borderRadius: 30,
    backgroundColor: "#FFFF",
    shadowColor: "#49A8FF",
    justifyContent: "center",
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "#49A8FF",
  },

  image: {
    resizeMode: "contain",
    width: "110%",
    height: "130%",
  },

  SubmitbtnView: {
    flex: 1,
    alignSelf: "center",
    width: "80%",

    justifyContent: "center",
  },

  Submitbtn: {
    backgroundColor: "#49a8ff",
    alignSelf: "center",
    justifyContent: "center",
    width: "80%",
    height: 60,
    borderColor: "transparent",
    borderRadius: 10,
    fontSize: 42,
    marginTop: 20,
    marginBottom: 20,
  },

  SubmitText: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
  },
});
