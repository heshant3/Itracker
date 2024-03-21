import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Modal,
} from "react-native";
import React, { useState, useEffect } from "react";
import { ScaledSheet } from "react-native-size-matters";
import { Feather, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import { ref, onValue } from "firebase/database";
import { db } from "./config";
import { useNavigation } from "@react-navigation/native";

export default function VehicleSelect() {
  const [modalVisible, setModalVisible] = useState(false);
  const [IgnitionStatus, setIgnitionStatus] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const IgnitionStatusRef = ref(db, "IgnitionStatus");

    onValue(IgnitionStatusRef, (snapshot) => {
      const data = snapshot.val();
      if (data && typeof data === "object" && "Level" in data) {
        setIgnitionStatus(data.Level);
      }
    });
  }, []);

  const [origin, setOrigin] = useState({
    latitude: 6.82153,
    longitude: 80.04161,
  });

  const handleMarkerDragEnd = (e) => {
    // Update the origin state with the new latitude and longitude
    setOrigin({
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude,
    });
  };

  const navigateToHomePage = () => {
    // Navigate to the home page
    navigation.navigate("Profile"); // Replace "HomePage" with the name of the screen you want to navigate to
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#E8EEF1" }}>
      <StatusBar barStyle="dark-content" backgroundColor="#E8EEF1" />
      <View style={styles.Head}>
        <Text style={styles.HeadText}>Track your Vehicle</Text>
        <Feather
          name="info"
          size={20}
          color="#595959"
          onPress={navigateToHomePage}
        />
      </View>
      <View style={{ flex: 1 }}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: origin.latitude,
            longitude: origin.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {/* Marker with draggable option */}
          <Marker
            draggable
            coordinate={origin}
            onDragEnd={handleMarkerDragEnd} // Function to handle marker drag end
          />
        </MapView>
      </View>
      <View style={styles.Bottom}>
        <TouchableOpacity style={styles.Box}>
          <MaterialCommunityIcons name="engine" size={40} color="#49a8ff" />
        </TouchableOpacity>
        <View style={styles.Box2}>
          <Ionicons name="speedometer" size={30} color="#49a8ff" />
          <Text style={styles.SpeedText}>{IgnitionStatus} kms</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = ScaledSheet.create({
  Head: {
    height: "10%",
    paddingHorizontal: 20,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },

  HeadText: {
    fontSize: "25@mvs",
    fontFamily: "Inter_600SemiBold",
    color: "#595959",
  },

  map: {
    width: "100%",
    height: "100%",
  },

  Bottom: {
    flex: 0.2,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  Box: {
    width: "20%",
    height: "50%",
    backgroundColor: "#fff",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  Box2: {
    flexDirection: "row",
    width: "40%",
    height: "50%",
    backgroundColor: "#fff",
    borderRadius: 10,
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingLeft: 10,
  },

  SpeedText: {
    fontSize: "20@mvs",
    fontFamily: "Inter_600SemiBold",
    color: "#595959",
  },
});
