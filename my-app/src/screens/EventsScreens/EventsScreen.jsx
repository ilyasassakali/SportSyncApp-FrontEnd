import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import * as SecureStore from "expo-secure-store";
import { useEvents } from "../../components/EventsContext";
import FabButton from "../../components/FabButton";
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Platform } from "react-native";

const Tab = createMaterialTopTabNavigator();

const EventCard = ({ event, onPress }) => (
  <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
    <View style={styles.dateContainer}>
      <Text style={styles.dateDay}>{new Date(event.date).getDate()}</Text>
      <Text style={styles.dateMonth}>
        {new Date(event.date).toLocaleString("en-US", { month: "short" })}
      </Text>
    </View>
    <View style={styles.detailContainer}>
      <Text style={styles.eventTitle} numberOfLines={1} ellipsizeMode="tail">
        {event.title}
      </Text>
      <View style={styles.eventDetailItem}>
        <Text style={styles.eventDetailsText}>{event.time}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const parseEventDateTime = (event) => {
  const [startHour, startMinute] = event.time.split(" - ")[0].split(":");
  const eventDate = new Date(event.date);
  eventDate.setHours(startHour);
  eventDate.setMinutes(startMinute);
  return eventDate;
};

function UpNextEventsScreen({ navigation }) {
  const { events } = useEvents();
  const now = new Date();
  const upNextEvents = events
    .filter(
      (event) => parseEventDateTime(event) >= now && event.status === "active"
    )
    .sort((a, b) => parseEventDateTime(a) - parseEventDateTime(b));

  return (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      {upNextEvents.length === 0 ? (
        <View style={styles.noEventsContainer}>
          <Text style={styles.noEventsText}>No events here</Text>
        </View>
      ) : (
        upNextEvents.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onPress={() => navigation.navigate("EventOverview", { event })}
          />
        ))
      )}
    </ScrollView>
  );
}

function PastEventsScreen({ navigation }) {
  const { events } = useEvents();
  const now = new Date();
  const pastEvents = events
    .filter(
      (event) => parseEventDateTime(event) < now && event.status === "active"
    )
    .sort((a, b) => parseEventDateTime(b) - parseEventDateTime(a));

  return (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      {pastEvents.length === 0 ? (
        <View style={styles.noEventsContainer}>
          <Text style={styles.noEventsText}>No events here</Text>
        </View>
      ) : (
        pastEvents.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onPress={() =>
              navigation.navigate("EventOverview", { event, isPast: true })
            }
          />
        ))
      )}
    </ScrollView>
  );
}

function CancelledEventsScreen({ navigation }) {
  const { events } = useEvents();
  const cancelledEvents = events.filter(
    (event) => event.status === "cancelled"
  );

  return (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      {cancelledEvents.length === 0 ? (
        <View style={styles.noEventsContainer}>
          <Text style={styles.noEventsText}>No events here</Text>
        </View>
      ) : (
        cancelledEvents.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onPress={() => navigation.navigate("EventOverview", { event })}
          />
        ))
      )}
    </ScrollView>
  );
}

const EventsScreen = ({ navigation }) => {
  const { setEvents } = useEvents();

  useFocusEffect(
    useCallback(() => {
      const fetchEvents = async () => {
        try {
          const userDataString = await SecureStore.getItemAsync("userData");
          const userData = JSON.parse(userDataString);

          if (userData && userData.id) {
            const userId = userData.id;
            const response = await fetch(
              `https://sportsyncapp-backend.onrender.com/events/user-events/${userId}`
            );
            const events = await response.json();
            setEvents(events);
          } else {
            console.error("No user ID found");
          }
        } catch (error) {
          console.error("Error fetching events:", error);
        }
      };

      fetchEvents();
    }, [setEvents])
  );

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.container}>
        <Text style={styles.header}>Events</Text>

        <Tab.Navigator
          screenOptions={{
            tabBarStyle: { backgroundColor: "white" },
            tabBarIndicatorStyle: { backgroundColor: "#4CAF50" },
            tabBarActiveTintColor: "#4CAF50",
            tabBarInactiveTintColor: "gray",
          }}
        >
          <Tab.Screen name="Up Next">
            {() => <UpNextEventsScreen navigation={navigation} />}
          </Tab.Screen>
          <Tab.Screen name="Past">
            {() => <PastEventsScreen navigation={navigation} />}
          </Tab.Screen>
          <Tab.Screen name="Cancelled">
            {() => <CancelledEventsScreen navigation={navigation} />}
          </Tab.Screen>
        </Tab.Navigator>

        <FabButton />
      </View>
    </SafeAreaView>
  );
};

export default EventsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "flex-start",
    paddingTop: 20,
  },
  scrollView: {
    width: "100%",
    backgroundColor: "#FFFFFF",
  },
  header: {
    paddingLeft: 20,
    fontFamily: "Poppins_Bold",
    fontSize: 28,
  },
  cardContainer: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
  },
  dateContainer: {
    marginRight: 30,
    marginLeft: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  dateDay: {
    fontFamily: "Poppins_SemiBold",
    fontSize: 22,
    color: "#333",
    color: "#4CAF50",
    marginBottom: Platform.OS === "ios" ? -7 : -11,
  },
  dateMonth: {
    fontFamily: "Poppins_Regular",
    fontSize: 18,
    color: "#4CAF50",
    marginBottom: 0,
  },
  detailContainer: {
    flex: 1,
    justifyContent: "center",
  },
  eventTitle: {
    fontFamily: "Poppins_SemiBold",
    fontSize: 18,
    color: "#333",
    marginBottom: -1,
  },
  eventDetails: {
    fontFamily: "Poppins_Regular",
    fontSize: 14,
    color: "#666",
  },
  eventDetailItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  eventDetailsText: {
    fontFamily: "Poppins_Regular",
    fontSize: 14,
    color: "#4CAF50",
    color: "#333",
  },
  noEventsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 250,
  },
  noEventsText: {
    fontFamily: "Poppins_Regular",
    fontSize: 18,
    color: "#666",
  },
});
