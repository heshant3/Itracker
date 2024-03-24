import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { UserLocationContext } from "./Contex/UserLocationContex";

export default function Map() {
  const [mapRegion, setmapRegion] = useState([]);

  const { location, setLocation } = useContext(UserLocationContext);

  useEffect(() => {
    if (location) {
      setmapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  }, []);
  //   const handleMarkerDragEnd = (e) => {
  //     // Update the origin state with the new latitude and longitude
  //     setOrigin({
  //       latitude: e.nativeEvent.coordinate.latitude,
  //       longitude: e.nativeEvent.coordinate.longitude,
  //     });
  //   };
  return (
    <View>
      <MapView
        style={styles.mapp}
        region={mapRegion}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        apiKey={AIzaSyDlTPQhkcbV - anXzV4fpGawJyxhZ7n - wFs}
      >
        {/* Marker with draggable option */}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  mapp: {
    width: "100%",
    height: "100%",
  },
});
