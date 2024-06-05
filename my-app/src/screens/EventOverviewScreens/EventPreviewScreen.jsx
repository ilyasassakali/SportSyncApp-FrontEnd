import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Linking,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import { customMapStyle } from "../../components/MapStyles";
import { useAuth } from "../../components/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";

function EventPreviewScreen({ route, navigation }) {
  const { event } = route.params;
  const { userData } = useAuth();
  const [teamColor, setTeamColor] = useState(event.teamColors.teamOneColor);
  const shirtBackgroundColor =
    teamColor === "#ffffff" ? "#4CAF50" : "transparent";

  const createEvent = async () => {
    try {
      const response = await fetch(
        "http://192.168.129.29:3000/events/create-event",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: event.title,
            location: event.location,
            date: event.date,
            time: event.time,
            numberOfPlayers: event.numberOfPlayers,
            isTeamDistributionEnabled: event.isTeamDistributionEnabled,
            teamDistribution: event.teamDistribution,
            teamColors: event.teamColors,
            price: event.price,
            hostId: userData.id,
            latitude: event.latitude,
            longitude: event.longitude,
          }),
        }
      );

      const result = await response.json();
      if (response.ok) {
        Alert.alert("Success", "Event created successfully!", [
          {
            text: "OK",
            onPress: () =>
              navigation.navigate("EventOverview", { event: result.event }),
          },
        ]);
      } else {
        Alert.alert("Error", result.message || "Failed to create event");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "An error occurred while creating the event");
    }
  };

  const eventLocation = {
    latitude: event.latitude,
    longitude: event.longitude,
    latitudeDelta: 0.003,
    longitudeDelta: 0.003,
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: "long", day: "numeric", month: "long" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const getInitials = () => {
    if (!userData) return "";
    const initials = `${userData.firstName.charAt(0)}${userData.lastName.charAt(
      0
    )}`;
    return initials.toUpperCase();
  };

  const openMap = () => {
    const encodedAddress = encodeURIComponent(event.location);
    const url = `http://maps.google.com/maps?daddr=${encodedAddress}`;
    const urlWaze = `https://waze.com/ul?q=${encodedAddress}&navigate=yes`;

    Alert.alert(
      "Open in Maps",
      "Choose an app to open the map",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Open in Google Maps", onPress: () => Linking.openURL(url) },
        { text: "Open in Waze", onPress: () => Linking.openURL(urlWaze) },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.outerContainer}>
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.checkButton}
            >
              <Ionicons name="chevron-back" size={30} color="#000" />
            </TouchableOpacity>
          </View>

          <Text style={styles.eventName}>{event.title}</Text>
          <Text style={styles.hostedBy}>
            Hosted by{" "}
            <Text
              style={styles.hostName}
            >{`${userData.firstName} ${userData.lastName}`}</Text>
          </Text>

          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              initialRegion={eventLocation}
              customMapStyle={customMapStyle}
              onPress={openMap}
            >
              <Marker
                coordinate={eventLocation}
                title={event.title}
                description={event.location}
                pinColor="#4caf50"
              />
            </MapView>
          </View>
          <View style={styles.detailsContainer}>
            <View style={styles.detailItem}>
              <Ionicons name="location-outline" size={20} color="#4CAF50" />
              <Text style={styles.detailText}>{event.location}</Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name="calendar-outline" size={20} color="#4CAF50" />
              <Text style={styles.detailText}>{formatDate(event.date)}</Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name="time-outline" size={20} color="#4CAF50" />
              <Text style={styles.detailText}>{event.time}</Text>
            </View>
          </View>
          <View style={styles.statisticsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{event.numberOfPlayers}</Text>
              <Text style={styles.statLabel}>Players</Text>
            </View>
            <View style={styles.statItem}>
              {event.isTeamDistributionEnabled ? (
                <Text style={styles.statNumber}>
                  {event.teamDistribution.teamOne}
                  <Text style={styles.smallUnit}>vs</Text>
                  {event.teamDistribution.teamTwo}
                </Text>
              ) : (
                <Text style={styles.statNumber}>no</Text>
              )}
              <Text style={styles.statLabel}>Distribution</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                <Text style={styles.smallUnit}>€</Text>
                {event.price}
              </Text>
              <Text style={styles.statLabel}>Price</Text>
            </View>
          </View>
          <View style={styles.guestsContainer}>
            <View style={styles.goingHeader}>
              <Ionicons
                name="radio-outline"
                size={20}
                color="#4CAF50"
                style={styles.iconStyle}
              />
              <Text style={styles.guestsNumber}>1 going</Text>
            </View>
            <View style={styles.profileHeader}>
              <View style={styles.profileContent}>
                <View style={styles.initialsContainer}>
                  <Text style={styles.initialsText}>{getInitials()}</Text>
                </View>
                <View style={styles.profileInfo}>
                  <Text
                    style={styles.nameText}
                  >{`${userData.firstName} ${userData.lastName}`}</Text>
                  <View style={styles.payStatusContainer}>
                    <Ionicons
                      name="checkmark-done-circle-outline"
                      size={20}
                      color="#4CAF50"
                      style={styles.iconStyle}
                    />
                    <Text style={styles.payText}>Paid</Text>
                  </View>
                </View>
              </View>
              {event.isTeamDistributionEnabled && (
                <Ionicons
                  name="shirt"
                  size={32}
                  color={teamColor}
                  style={[
                    styles.shirtIcon,
                    { backgroundColor: shirtBackgroundColor, borderRadius: 10 },
                  ]}
                />
              )}
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.7}
          onPress={createEvent}
        >
          <Text style={styles.buttonText}>Create Plan</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default EventPreviewScreen;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  checkButton: {
    marginLeft: -10,
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: "Poppins_Bold",
    flexGrow: 1,
    textAlign: "center",
    marginTop: 5,
  },
  eventName: {
    fontFamily: "Poppins_Bold",
    fontSize: 24,
    color: "#333",
  },
  hostedBy: {
    fontFamily: "Poppins_Regular",
    fontSize: 17,
    color: "#666",
    marginBottom: 15,
    marginTop: -5,
  },
  hostName: {
    color: "#4CAF50",
    fontFamily: "Poppins_Regular",
    fontSize: 17,
  },
  detailsContainer: {},
  detailItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  detailText: {
    fontFamily: "Poppins_Regular",
    fontSize: 16,
    color: "#666",
    marginLeft: 10,
    paddingRight: 20,
  },
  map: {
    height: 150,
  },
  mapContainer: {
    height: 150,
    width: "100%",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
  },
  statisticsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingHorizontal: 5,
    paddingBottom: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
  },
  statItem: {
    alignItems: "center",
    position: "relative",
  },
  statNumber: {
    fontFamily: "Poppins_Regular",
    fontSize: 40,
    color: "#666",
    marginBottom: Platform.OS === "ios" ? 10 : 0,
  },
  statLabel: {
    fontFamily: "Poppins_Regular",
    fontSize: 14,
    color: "#4CAF50",
    marginTop: -20,
  },

  smallUnit: {
    fontFamily: "Poppins_Regular",
    fontSize: 18,
  },
  smallerUnit: {
    fontFamily: "Poppins_Regular",
    fontSize: 24,
  },
  guestsContainer: {
    paddingBottom: 60,
  },
  goingHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    justifyContent: "space-between",
  },
  profileContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  initialsContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#D7F5D8",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  initialsText: {
    color: "#4CAF50",
    fontSize: 20,
    fontFamily: "Poppins_SemiBold",
  },
  profileInfo: {
    flexDirection: "column",
    justifyContent: "center",
  },
  guestsNumber: {
    fontFamily: "Poppins_SemiBold",
    fontSize: 18,
    color: "#666",
    marginLeft: 10,
  },
  payStatusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  payText: {
    fontFamily: "Poppins_Regular",
    fontSize: 16,
    marginLeft: 5,
    color: "#666",
  },
  iconStyle: {
    marginTop: -2,
  },
  shirtIcon: {
    alignSelf: "center",
  },
  cancelButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 10,
    backgroundColor: "#F44336",
  },
  cancelButtonText: {
    color: "white",
    fontSize: 18,
    fontFamily: "Poppins_SemiBold",
  },
  button: {
    position: "absolute",
    backgroundColor: "#4CAF50",
    padding: 12,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
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
  linkIcon: {
    marginRight: 5,
    transform: [{ rotate: "45deg" }],
    marginBottom: 3,
  },
  linkIcon2: {
    marginRight: 5,
    marginBottom: 5,
  },
});
