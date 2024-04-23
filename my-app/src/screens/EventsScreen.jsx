import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Simulated event data
const events = [
  {
    id: 1,
    day: "16",
    month: "Dec",
    title: "Indoor Soccer 5v5",
    time: "18:00 - 19:30",
    location: "Leuzesteenweg 241, 9600 Ronse"
  },
  {
    id: 2,
    day: "20",
    month: "Dec",
    title: "Street Basketball",
    time: "10:00 - 12:00",
    location: "Ruslandstraat 2, 1000 Brussel"
  },
  {
    id: 3,
    day: "26",
    month: "Dec",
    title: "Indoor Soccer 5v5",
    time: "18:00 - 19:30",
    location: "Leuzesteenweg 241, 9600 Ronse"
  },
  {
    id: 4,
    day: "1",
    month: "Jan",
    title: "Street Basketball",
    time: "10:00 - 12:00",
    location: "Ruslandstraat 2, 1000 Brussel"
  },
  {
    id: 5,
    day: "12",
    month: "Jan",
    title: "Indoor Soccer 5v5",
    time: "18:00 - 19:30",
    location: "Leuzesteenweg 241, 9600 Ronse"
  },
  {
    id: 6,
    day: "3",
    month: "Feb",
    title: "Street Basketball",
    time: "10:00 - 12:00",
    location: "Ruslandstraat 2, 1000 Brussel"
  },
  {
    id: 7,
    day: "30",
    month: "Feb",
    title: "Indoor Soccer 5v5",
    time: "18:00 - 19:30",
    location: "Leuzesteenweg 241, 9600 Ronse"
  },
];

const EventCard = ({ event }) => (
  <View style={styles.cardContainer}>
    <View style={styles.dateContainer}>
      <Text style={styles.dateDay}>{event.day}</Text>
      <Text style={styles.dateMonth}>{event.month}</Text>
    </View>
    <View style={styles.detailContainer}>
      <Text style={styles.eventTitle}>{event.title}</Text>
      <View style={styles.eventDetailItem}>
        <Ionicons name="time-outline" size={16} color="#333" style={styles.eventDetailsIcon} />
        <Text style={styles.eventDetailsText}>{event.time}</Text>
      </View>
      <View style={styles.eventDetailItem}>
        <Ionicons name="location-outline" size={16} color="#333" style={styles.eventDetailsIcon} />
        <Text style={styles.eventDetailsText}>{event.location}</Text>
      </View>
    </View>
  </View>
);


const EventsScreen = () => {
  const [fabColor, setFabColor] = useState("#4CAF50");

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Upcoming Events</Text>
      <ScrollView style={styles.scrollView}>
        {events.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </ScrollView>
      {/* Floating Action Button */}
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: fabColor }]}
        onPressIn={() => setFabColor("#449D48")}
        onPressOut={() => setFabColor("#4CAF50")}
        activeOpacity={1}
      >
        <Ionicons name="create-outline" size={30} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 20,
    paddingTop: 50
  },
  scrollView: {
    width: '100%',
  },
  header: {
    fontFamily: 'Poppins_Bold',
    fontSize: 24,
    marginBottom: 10,
  },
  cardContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderColor: "#E0E0E0", 
    borderWidth: 1,
  },
  dateContainer: {
    marginRight: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  dateDay: {
    fontFamily: 'Poppins_SemiBold',
    fontSize: 32,
    color: "#333",
    marginBottom: -15,
  },
  dateMonth: {
    fontFamily: 'Poppins_Regular',
    fontSize: 18,
    color: "#333",
    marginBottom: 0,
  },
  detailContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  eventTitle: {
    fontFamily: 'Poppins_SemiBold',
    fontSize: 20,
    color: "#333",
    marginBottom: 4
  },
  eventDetails: {
    fontFamily: 'Poppins_Regular',
    fontSize: 14,
    color: "#666",
  },
  eventDetailItem: {
    flexDirection: 'row', 
    alignItems: 'center',  
    
  },
  eventDetailsIcon: {
    marginRight: 5,  
    marginBottom: 5
  },
  eventDetailsText: {
    fontFamily: 'Poppins_Regular',
    fontSize: 14,
    color: "#666",
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  }
});

export default EventsScreen;
