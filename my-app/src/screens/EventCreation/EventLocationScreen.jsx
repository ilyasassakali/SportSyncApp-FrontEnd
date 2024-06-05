import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { customMapStyle } from "../../components/MapStyles";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const EventLocationScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [eventData, setEventData] = useState({});
  const [location, setLocation] = useState("");
  const [region, setRegion] = useState({
    latitude: 50.8503,
    longitude: 4.3517,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [marker, setMarker] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (route.params?.event) {
      setEventData(route.params.event);
      console.log(route.params.event);
    } else {
      console.error("No event data found in route params");
    }
  }, [route.params]);

  const handleLocationSearch = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${location}&addressdetails=1&accept-language=en`
      );
      const data = await response.json();
      if (data && data.length > 0) {
        const item = data[0];
        if (item.address) {
          const formattedAddress = formatAddress(item.address);
          setLocation(formattedAddress);
          const newRegion = {
            latitude: parseFloat(item.lat),
            longitude: parseFloat(item.lon),
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          };
          setRegion(newRegion);
          setMarker(newRegion);
        } else {
          alert("Address details are not available for this location.");
        }
      } else {
        alert("No results found");
      }
    } catch (error) {
      alert("Error fetching location data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    })();
  }, []);

  const formatAddress = (address) => {
    if (!address) return "";

    const parts = [];
    if (address.road) parts.push(address.road);
    if (address.house_number) parts.push(address.house_number);
    if (address.city || address.town) parts.push(address.city || address.town);
    if (address.postcode) parts.push(address.postcode);
    if (address.country) parts.push(address.country);
    return parts.join(", ");
  };

  return (
    <SafeAreaView  style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="chevron-back" size={30} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Where?</Text>
        </View>
        <View style={styles.searchArea}>
          <TextInput
            placeholder="Enter Event Location"
            style={styles.input}
            value={location}
            onChangeText={setLocation}
          />
          <TouchableOpacity
            onPress={handleLocationSearch}
            style={styles.searchButton}
          >
            <Ionicons name="search-outline" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        <MapView
          style={styles.map}
          region={region}
          showsMyLocationButton={true}
          showsUserLocation={true}
          customMapStyle={customMapStyle}
        >
          {marker && <Marker coordinate={marker} pinColor="#4caf50" />}
        </MapView>

        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#4CAF50" />
          </View>
        )}

        <TouchableOpacity
          onPress={() => {
            if (location && marker) {
              navigation.navigate("EventSetup", {
                event: {
                  ...eventData,
                  location: location,
                  latitude: region.latitude,
                  longitude: region.longitude,
                },
              });
            }
          }}
          style={location && marker ? styles.button : styles.buttonDisabled}
          activeOpacity={0.9}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    zIndex: 1,
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: "Poppins_Bold",
    flexGrow: 1,
    textAlign: "center",
    marginTop: 5,
  },
  backButton: {
    marginLeft: -10,
  },
  searchArea: {
    position: "absolute",
    top: 120,
    left: 20,
    right: 20,
    flexDirection: "row",
    zIndex: 1,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
    backgroundColor: "#fff",
  },
  searchButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -25 }, { translateY: -25 }],
    zIndex: 1,
  },
  button: {
    position: "absolute",
    backgroundColor: "#4CAF50",
    padding: 12,
    alignItems: "center",
    borderRadius: 10,
    bottom: 0,
    left: 0,
    right: 0,
    margin: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Poppins_SemiBold",
  },
  buttonDisabled: {
    position: "absolute",
    backgroundColor: "#cccccc",
    padding: 12,
    alignItems: "center",
    borderRadius: 10,
    bottom: 0,
    left: 0,
    right: 0,
    margin: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default EventLocationScreen;
