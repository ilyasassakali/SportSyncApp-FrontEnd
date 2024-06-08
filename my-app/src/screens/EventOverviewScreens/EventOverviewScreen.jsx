import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Share,
  Linking,
  BackHandler,
  Platform,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import { customMapStyle } from "../../components/MapStyles";
import * as Clipboard from "expo-clipboard";
import { useAuth } from "../../components/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";

function EventOverviewScreen({ route, navigation }) {
  const { userData } = useAuth();
  const { event, isPast } = route.params;
  const [hostDetails, setHostDetails] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [teamColor, setTeamColor] = useState(
    event && event.teamColors ? event.teamColors.teamOneColor : "#FFFFFF"
  );
  const shirtBackgroundColor =
    teamColor === "#ffffff" ? "#4CAF50" : "transparent";
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const isHost = userData && userData.id === event.hostId;
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const eventResponse = await fetch(
          `https://sportsyncapp-backend.onrender.com/events/event/${event.id}`
        );
        const eventData = await eventResponse.json();
        setParticipants(eventData.participants);

        const hostResponse = await fetch(
          `https://sportsyncapp-backend.onrender.com/events/user/${event.hostId}`
        );
        const hostData = await hostResponse.json();
        setHostDetails(hostData);
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };

    fetchEventDetails();

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        navigation.navigate("Events");
        return true;
      }
    );

    return () => backHandler.remove();
  }, [event.id]);

  useEffect(() => {
    if (participants.length === event.numberOfPlayers) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [participants.length, event.numberOfPlayers]);

  const eventLocation = {
    latitude: parseFloat(event.latitude),
    longitude: parseFloat(event.longitude),
    latitudeDelta: 0.003,
    longitudeDelta: 0.003,
  };

  const cancelEvent = async () => {
    Alert.alert("Cancel Event", "Are you sure you want to cancel this event?", [
      {
        text: "No",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: async () => {
          try {
            const response = await fetch(
              `https://sportsyncapp-backend.onrender.com/events/cancel-event/${event.id}`,
              {
                method: "PUT",
              }
            );

            if (!response.ok) {
              throw new Error("Failed to cancel event");
            }

            const result = await response.json();
            Alert.alert(result.message);
            navigation.navigate("Events");
          } catch (error) {
            console.error("Error cancelling event:", error);
            Alert.alert("Error", "Failed to cancel event");
          }
        },
      },
    ]);
  };

  const leaveEvent = async () => {
    try {
      Alert.alert("Leave Event", "Are you sure you want to leave this event?", [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes",
          onPress: async () => {
            const response = await fetch(
              `https://sportsyncapp-backend.onrender.com/events/leave-event`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  eventId: event.id,
                  userId: userData.id,
                }),
              }
            );

            if (!response.ok) {
              throw new Error("Failed to leave event");
            }

            const result = await response.json();
            Alert.alert(result.message);
            navigation.navigate("Events");
          },
        },
      ]);
    } catch (error) {
      console.error("Error leaving event:", error);
      Alert.alert("Error", "Failed to leave event");
    }
  };

  const generateEventMessage = () => {
    const downloadLink = `https://sportsync/download`;
    const inviteCode = event.inviteCode;
    return `Join me at ${event.title}\n
Hosted by: ${
      hostDetails
        ? `${hostDetails.firstName} ${hostDetails.lastName}`
        : "Loading..."
    }\n
Date: ${formatDate(event.date)}\n
Time: ${event.time}\n
Location: ${event.location}\n
To join use this code: ${inviteCode}\n
Download SportSync: ${downloadLink}`;
  };

  const shareEvent = async () => {
    const message = generateEventMessage();
    try {
      const result = await Share.share({ message });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log("Shared with activity type of", result.activityType);
        } else {
          console.log("Shared");
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("Dismissed");
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const copyToClipboard = () => {
    const message = generateEventMessage();
    Clipboard.setString(message);
    Alert.alert("Copied", "Event link copied to clipboard.");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: "long", day: "numeric", month: "long" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
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

  const changeParticipantShirtColor = (participantId) => {
    if (!isHost) {
      Alert.alert(
        "Permission Denied",
        "Only the host can change participant shirt colors."
      );
      return;
    }

    if (selectedParticipant) {
      const participantIndex = participants.findIndex(
        (p) => p.id === participantId
      );
      const selectedParticipantIndex = participants.findIndex(
        (p) => p.id === selectedParticipant.id
      );

      if (participantIndex !== -1 && selectedParticipantIndex !== -1) {
        const updatedParticipants = [...participants];
        const tempColor = updatedParticipants[participantIndex].shirtColor;
        updatedParticipants[participantIndex].shirtColor =
          updatedParticipants[selectedParticipantIndex].shirtColor;
        updatedParticipants[selectedParticipantIndex].shirtColor = tempColor;

        setParticipants(updatedParticipants);
        setSelectedParticipant(null);

        updateParticipantColors(
          event.id,
          updatedParticipants[participantIndex].id,
          updatedParticipants[selectedParticipantIndex].id
        );
      }
    } else {
      const participant = participants.find((p) => p.id === participantId);
      setSelectedParticipant(participant);
    }
  };

  const updateParticipantColors = async (
    eventId,
    participant1Id,
    participant2Id
  ) => {
    try {
      const response = await fetch(
        `https://sportsyncapp-backend.onrender.com/events/update-participant-color`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            eventId,
            participant1Id,
            participant2Id,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update participant colors");
      }

      const result = await response.json();
      console.log(result.message);
    } catch (error) {
      console.error("Error updating participant colors:", error);
    }
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
              onPress={() => navigation.navigate("Events")}
              style={styles.backButton}
            >
              <Ionicons name="chevron-back" size={30} color="#000" />
            </TouchableOpacity>
            {!isPast && isHost && event.status !== "cancelled" && (
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  onPress={cancelEvent}
                  style={[styles.checkButton, { marginRight: 20 }]}
                >
                  <Ionicons name="trash-outline" size={27} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={copyToClipboard}
                  style={styles.checkButton}
                >
                  <Ionicons name="copy-outline" size={28} color="#000" />
                </TouchableOpacity>
              </View>
            )}
          </View>

          {isPast && (
            <View style={styles.cancelledContainer}>
              <Text style={styles.cancelledText}>This event has passed.</Text>
            </View>
          )}

          {event.status === "cancelled" && (
            <View style={styles.cancelledContainer}>
              <Text style={styles.cancelledText}>
                This plan has been cancelled!
              </Text>
            </View>
          )}

          {event.status !== "cancelled" ? (
            <>
              <Text style={styles.eventName}>{event.title}</Text>
              <Text style={styles.hostedBy}>
                Hosted by{" "}
                <Text style={styles.hostName}>
                  {hostDetails
                    ? `${hostDetails.firstName} ${hostDetails.lastName}`
                    : "Loading..."}
                </Text>
              </Text>
            </>
          ) : (
            <>
              <Text style={[styles.eventName, styles.cancelledTitle]}>
                {event.title}
              </Text>
              <Text style={styles.hostedBy}>
                Hosted by{" "}
                <Text style={styles.hostName}>
                  {hostDetails
                    ? `${hostDetails.firstName} ${hostDetails.lastName}`
                    : "Loading..."}
                </Text>
              </Text>
            </>
          )}

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
              <Text style={styles.guestsNumber}>
                {participants.length} Going
              </Text>
              {participants.length === event.numberOfPlayers && (
                <Animated.Text style={[styles.fullText, { opacity: fadeAnim }]}>
                  , It's full!
                </Animated.Text>
              )}
            </View>
            {participants.map((participant, index) => (
              <View key={index} style={styles.profileHeader}>
                <View style={styles.profileContent}>
                  <View style={styles.initialsContainer}>
                    <Text style={styles.initialsText}>
                      {participant.firstName.charAt(0)}
                      {participant.lastName.charAt(0)}
                    </Text>
                  </View>
                  <View style={styles.profileInfo}>
                    <Text
                      style={styles.nameText}
                    >{`${participant.firstName} ${participant.lastName}`}</Text>
                    <View style={styles.payStatusContainer}>
                      {participant.paid ? (
                        <Ionicons
                          name="checkmark-done-circle-outline"
                          size={20}
                          color="#4CAF50"
                          style={styles.iconStyle}
                        />
                      ) : (
                        <Ionicons
                          name="checkmark-circle-outline"
                          size={20}
                          color="#039BE5"
                          style={styles.iconStyle}
                        />
                      )}
                      <Text style={styles.payText}>
                        {participant.paid ? "Paid" : "Pay Cash"}
                      </Text>
                    </View>
                  </View>
                </View>
                {event.isTeamDistributionEnabled && participant.shirtColor && (
                  <View>
                    <Ionicons
                      name="shirt"
                      size={
                        selectedParticipant &&
                        selectedParticipant.id === participant.id
                          ? 24
                          : 32
                      }
                      color={participant.shirtColor}
                      style={[
                        styles.shirtIcon,
                        {
                          backgroundColor:
                            participant.shirtColor === "#ffffff"
                              ? "#4CAF50"
                              : "transparent",
                          borderRadius: 10,
                        },
                      ]}
                      onPress={() =>
                        changeParticipantShirtColor(participant.id)
                      }
                    />
                    {selectedParticipant &&
                      selectedParticipant.id === participant.id && (
                        <Text style={styles.swapText}>Swap</Text>
                      )}
                  </View>
                )}
              </View>
            ))}
          </View>
        </ScrollView>

        {isHost && event.status === "active" && !isPast ? (
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.7}
            onPress={shareEvent}
          >
            <Ionicons
              name="link"
              size={25}
              color="#fff"
              style={styles.linkIcon}
            />
            <Text style={styles.buttonText}>Share Invite Link</Text>
          </TouchableOpacity>
        ) : null}

        {!isHost && event.status === "active" && !isPast ? (
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#F44336" }]}
            activeOpacity={0.7}
            onPress={leaveEvent}
          >
            <Ionicons
              name="exit-outline"
              size={25}
              color="#fff"
              style={styles.linkIcon}
            />
            <Text style={styles.buttonText}>Leave Event</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </SafeAreaView>
  );
}

export default EventOverviewScreen;

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
  distributionContainer: {
    position: "absolute",
    top: 8,
    left: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  distributionText: {
    fontFamily: "Poppins_Regular",
    fontSize: 16,
    color: "#666",
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
    overflow: "hidden",
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
  swapText: {
    fontFamily: "Poppins_Regular",
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    marginTop: 2,
  },
  cancelledText: {
    fontFamily: "Poppins_Bold",
    fontSize: 14,
    color: "#F44336",
  },
  cancelledTitle: {
    textDecorationLine: "line-through",
  },
  fullText: {
    color: "#4CAF50",
    fontSize: 18,
    fontFamily: "Poppins_SemiBold",
  },
  backButton: {
    marginLeft: -6,
  },
});
