import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Modal,
  Linking,
} from "react-native";
import React, { useState, useEffect } from "react";
import { ScaledSheet } from "react-native-size-matters";
import {
  Feather,
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome5,
  FontAwesome6,
} from "@expo/vector-icons";
import { ref, onValue, update } from "firebase/database";
import { db } from "./config";
import { useNavigation } from "@react-navigation/native";
// import * as Notifications from "expo-notifications";
import Map from "./Map";
import * as Haptics from "expo-haptics";

export default function VehicleSelect() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [IgnitionStatus, setIgnitionStatus] = useState(null);
  const [Speed, setSpeed] = useState(null);
  const [Temperature, setTemperature] = useState(null);
  const [Seat, setSeat] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    const IgnitionStatusRef = ref(db, "IgnitionStatus");
    const SpeedRef = ref(db, "Speed");
    const AccidentRef = ref(db, "Accident");
    const TemperatureRef = ref(db, "Temperature");
    const SeatRef = ref(db, "Seat01");

    const unsubscribeIgnition = onValue(IgnitionStatusRef, (snapshot) => {
      const ignitionStatus = snapshot.val();
      setIgnitionStatus(ignitionStatus); // Assuming setIgnitionStatus is a state setter function

      if (ignitionStatus === 1 && !modalVisible2) {
        // Check if ignitionStatus is 1 and modalVisible2 is false
        setModalVisible2(true);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      } else if (ignitionStatus !== 1 && modalVisible2) {
        // Check if ignitionStatus is not 1 and modalVisible2 is true
        setModalVisible2(false);
      }
    });

    const unsubscribeSpeed = onValue(SpeedRef, (snapshot) =>
      setSpeed(snapshot.val())
    );
    const unsubscribeTemperature = onValue(TemperatureRef, (snapshot) =>
      setTemperature(snapshot.val())
    );
    const unsubscribeSeat = onValue(SeatRef, (snapshot) =>
      setSeat(snapshot.val())
    );
    const unsubscribeAccident = onValue(AccidentRef, (snapshot) => {
      const accidentValue = snapshot.val();
      if (accidentValue === 1) {
        setModalVisible(true);
        // sendPushNotification();
      } else {
        setModalVisible(false);
      }
    });

    return () => {
      unsubscribeIgnition();
      unsubscribeSpeed();
      unsubscribeAccident();
      unsubscribeTemperature();
      unsubscribeSeat();
    };
  }, []);

  const navigateToHomePage = () => {
    // Navigate to the home page
    navigation.navigate("Profile"); // Replace "HomePage" with the name of the screen you want to navigate to
  };

  const handleSOSCall = () => {
    Linking.openURL("tel:119");
  };

  const updateIgnitionStatus = (status) => {
    update(ref(db), { IgnitionStatus: status });
  };

  // const sendPushNotification = async () => {
  //   // Send push notification using Expo Notifications
  //   await Notifications.scheduleNotificationAsync({
  //     content: {
  //       title: "Ignition Status",
  //       body: "Ignition Status is 1.",
  //     },
  //     trigger: 2,
  //   });
  // };

  const engineColor = IgnitionStatus === 1 ? "#49a8ff" : "#595959";

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
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
        }}
      >
        <View>
          <Map />
        </View>
        <View style={styles.SOSButton}>
          <TouchableOpacity style={styles.SOSIcon} onPress={handleSOSCall}>
            <MaterialCommunityIcons
              name="alarm-light"
              size={30}
              color="#ff5866"
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.Bottom}>
        <View
          style={[
            styles.Box4,
            { backgroundColor: Seat === 1 ? "#49a8ff" : "#fff" },
          ]}
        >
          <MaterialCommunityIcons
            name="seat-passenger"
            size={24}
            color="#595959"
          />
        </View>
        <View style={styles.Box4}>
          <MaterialCommunityIcons
            name="seat-passenger"
            size={24}
            color="#595959"
          />
        </View>
        <View style={styles.Box9}>
          <FontAwesome6 name="temperature-half" size={23} color="#49a8ff" />
          <Text style={styles.SpeedText}>{Temperature}ºC</Text>
        </View>
      </View>
      <View style={styles.Bottom}>
        <TouchableOpacity
          onPress={() => updateIgnitionStatus(IgnitionStatus === 1 ? 0 : 1)}
          style={[
            styles.Box,
            { backgroundColor: IgnitionStatus === 1 ? "#fff" : "#fff" },
          ]}
          disabled={IgnitionStatus == 0}
        >
          <MaterialCommunityIcons
            name={IgnitionStatus === 0 ? "engine-off" : "engine"}
            size={30}
            color={IgnitionStatus === 1 ? "#49a8ff" : engineColor}
          />
        </TouchableOpacity>
        <View style={styles.Box2}>
          <Ionicons name="speedometer" size={30} color="#49a8ff" />
          <Text style={styles.SpeedText}>{Speed} kms</Text>
        </View>
      </View>

      {/* Accident Alert Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={styles.centeredView}
          onTouchEnd={() => setModalVisible(!modalVisible)}
        >
          <View style={styles.modalView}>
            <FontAwesome5 name="car-crash" size={24} color="#ff5866" />
            <Text style={styles.Text}>Accident Detected</Text>
          </View>
        </View>
      </Modal>

      {/* Engine Alert Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible2}
        onRequestClose={() => {
          setModalVisible2(!modalVisible2);
        }}
      >
        <View
          style={styles.centeredView}
          onTouchEnd={() => setModalVisible2(!modalVisible2)}
        >
          <View style={styles.modalView}>
            <MaterialCommunityIcons name="engine" size={30} color="#49a8ff" />
            <Text style={styles.Text}>Engine On</Text>
          </View>
        </View>
      </Modal>
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

  Bottom: {
    flex: 0.16,
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

  Box4: {
    width: "10%",
    height: "40%",
    backgroundColor: "#fff",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: -40,
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

  Box9: {
    flexDirection: "row",
    width: "40%",
    height: "50%",
    backgroundColor: "#fff",
    borderRadius: 10,
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingLeft: 10,
    marginLeft: 30,
  },

  SpeedText: {
    fontSize: "20@mvs",
    fontFamily: "Inter_600SemiBold",
    color: "#595959",
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  modalView: {
    flexDirection: "row",
    height: "10%",
    width: "80%",
    overflow: "hidden",
    borderRadius: 20,
    backgroundColor: "white",
    borderWidth: 1.5,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "space-evenly",
  },

  Text: {
    fontSize: "25@mvs",
    fontFamily: "Inter_600SemiBold",
    color: "#595959",
  },

  SOSIcon: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: "#fff",
    width: 50,
    height: 50,
    margin: 30,
  },
  SOSButton: {
    position: "absolute",
    alignSelf: "flex-end",
  },
});
