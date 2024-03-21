import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Modal,
  Button,
} from "react-native";
import React, { useState, useEffect } from "react";
import { ScaledSheet } from "react-native-size-matters";
import {
  Feather,
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome5,
} from "@expo/vector-icons";

import { ref, onValue } from "firebase/database";
import { db } from "./config";

export default function Test() {
  const [modalVisible, setModalVisible] = useState(false);
  const [IgnitionStatus, setIgnitionStatus] = useState(null);

  useEffect(() => {
    const IgnitionStatusRef = ref(db, "IgnitionStatus");

    onValue(IgnitionStatusRef, (snapshot) => {
      const data = snapshot.val();
      if (data && typeof data === "object" && "Level" in data) {
        setIgnitionStatus(data.Level);
      }
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#E8EEF1" }}>
      <StatusBar barStyle="dark-content" backgroundColor="#E8EEF1" />
      <View style={styles.Head}>
        <Text style={styles.HeadText}>Track your Vehicle</Text>
        <Feather name="info" size={20} color="#595959" />
      </View>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <View style={styles.SOSIcon}></View>
      </View>
      <View style={styles.Bottom}>
        <TouchableOpacity style={styles.Box}>
          <MaterialCommunityIcons
            name="engine"
            size={40}
            color="#49a8ff"
            onPress={() => setModalVisible(true)}
          />
        </TouchableOpacity>
        <View style={styles.Box2}>
          <Ionicons name="speedometer" size={30} color="#49a8ff" />
          <Text style={styles.SpeedText}>{IgnitionStatus} kms</Text>
        </View>
      </View>

      {/* Modal */}
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
            <FontAwesome5 name="car-crash" size={30} color="#ff5866" />
            <Text style={styles.Text}>Accident Detected</Text>
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
    alignSelf: "flex-end",
    position: "absolute",
    backgroundColor: "red",
    width: 50,
    height: 50,
  },
});
