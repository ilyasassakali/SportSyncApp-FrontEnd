import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import * as SecureStore from 'expo-secure-store';


const Tab = createMaterialTopTabNavigator();

const EventCard = ({ event, onPress }) => (
  <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
    <View style={styles.dateContainer}>
      <Text style={styles.dateDay}>{new Date(event.date).getDate()}</Text>
      <Text style={styles.dateMonth}>{new Date(event.date).toLocaleString('default', { month: 'short' })}</Text>
    </View>
    <View style={styles.detailContainer}>
      <Text style={styles.eventTitle} numberOfLines={1} ellipsizeMode="tail">{event.title}</Text>
      <View style={styles.eventDetailItem}>
        <Text style={styles.eventDetailsText}>{event.time}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

function UpNextEventsScreen({navigation, events}) {
  return (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {events.map(event => (
          <EventCard key={event.id} event={event} onPress={() => navigation.navigate('EventOverview', { event })}/>
        ))}
    </ScrollView>
  );
}

function PastEventsScreen({navigation, events}) {
  return (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {events.map(event => (
          <EventCard key={event.id} event={event} onPress={() => navigation.navigate('EventOverview', { event })}/>
        ))}
    </ScrollView>
  );
}

const EventsScreen = ({ navigation }) => {
  const [upNextEvents, setUpNextEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [fabColor, setFabColor] = useState("#4CAF50");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const userDataString = await SecureStore.getItemAsync('userData');
        const userData = JSON.parse(userDataString);

        if (userData && userData.id) {
          const userId = userData.id;
          const response = await fetch(`http://192.168.129.29:3000/events/user-events/${userId}`);
          const events = await response.json();

          const now = new Date();
          setUpNextEvents(events.filter(event => new Date(event.date) >= now));
          setPastEvents(events.filter(event => new Date(event.date) < now));
        } else {
          console.error("No user ID found");
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Events</Text>

        <Tab.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: 'white' },
          tabBarIndicatorStyle: { backgroundColor: '#4CAF50' },
          tabBarActiveTintColor: '#4CAF50',
          tabBarInactiveTintColor: 'gray',
        }}
        
        >
          <Tab.Screen name="Up Next">
          {() => <UpNextEventsScreen navigation={navigation} events={upNextEvents} />}
        </Tab.Screen>
        <Tab.Screen name="Past">
          {() => <PastEventsScreen navigation={navigation} events={pastEvents} />}
        </Tab.Screen>

        </Tab.Navigator>


      <TouchableOpacity
        style={[styles.fab, { backgroundColor: fabColor }]}
        onPressIn={() => setFabColor("#449D48")}
        onPressOut={() => setFabColor("#4CAF50")}
        onPress={() => navigation.navigate('EventName')}
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
    justifyContent: 'flex-start',
    paddingTop: 50
  },
  scrollView: {
    width: '100%',
    backgroundColor: "#FFFFFF",

  },
  header: {
    paddingLeft: 20,
    fontFamily: 'Poppins_Bold',
    fontSize: 28,
  },
  cardContainer: {
    flexDirection: 'row',
    padding: 10,  
    borderBottomWidth: 0.5, 
    borderBottomColor: '#ccc',   
  },
  dateContainer: {
    marginRight: 30,
    marginLeft:15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateDay: {
    fontFamily: 'Poppins_SemiBold',
    fontSize: 22,
    color: "#333",
    marginBottom: -11,
    color: "#4CAF50"
  },
  dateMonth: {
    fontFamily: 'Poppins_Regular',
    fontSize: 18,
    color: "#4CAF50",
    marginBottom: 0,
  },
  detailContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  eventTitle: {
    fontFamily: 'Poppins_SemiBold',
    fontSize: 18,
    color: "#333",
    marginBottom: -1,
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
  eventDetailsText: {
    fontFamily: 'Poppins_Regular',
    fontSize: 14,
    color: "#4CAF50",
    color:"#333"
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


/*
const events = [
  {
    id: 1,
    day: "16",
    month: "Dec",
    title: "Indoor Soccer 5v5 ⚽",
    time: "18:00 - 19:30",
    location: "Leuzesteenweg 241, 9600 Ronse",
    hoste: "Abdeslam Boutaarrourt",
    date: "Wednesday 16 Decembre"
  },
  {
    id: 2,
    day: "20",
    month: "Dec",
    title: "Street Basketball 🏀",
    time: "10:00 - 12:00",
    location: "Ruslandstraat 2, 1000 Brussel",
    hoste: "Mohammed El Amritesafd",
    date: "Wednesday 16 Decembre"
  },
  {
    id: 3,
    day: "26",
    month: "Dec",
    title: "Indoor Minivoetbal 5vs5 ⚽ Jacky Leroy zaal",
    time: "18:00 - 19:30",
    location: "Leuzesteenweg van DerBroekcaed 241, 9600 Ronse, Belgium ",
    hoste: "Ismail Assakali",
    date: "Wednesday 16 Decembre"
  },
  {
    id: 4,
    day: "1",
    month: "Jan",
    title: "Street Basketball",
    time: "10:00 - 12:00",
    location: "Ruslandstraat 2, 1000 Brussel",
    hoste: "Yarno De Hedebouer",
    date: "Wednesday 16 Decembre"
  },
  {
    id: 5,
    day: "12",
    month: "Jan",
    title: "Indoor Soccer 5v5",
    time: "18:00 - 19:30",
    location: "Leuzesteenweg 241, 9600 Ronse",
    hoste: "Ilyas Assakali",
    date: "Wednesday 16 Decembre"
  },
  {
    id: 6,
    day: "3",
    month: "Feb",
    title: "Street Basketball",
    time: "10:00 - 12:00",
    location: "Ruslandstraat 2, 1000 Brussel",
    hoste: "Mohammed El Amrites",
    date: "Wednesday 16 Decembre"
  },
  {
    id: 7,
    day: "30",
    month: "Feb",
    title: "Indoor Soccer 5v5",
    time: "18:00 - 19:30",
    location: "Leuzesteenweg 241, 9600 Ronse",
    hoste: "Ilyas Assakali",
    date: "Wednesday 16 Decembre"
  },
  {
    id: 8,
    day: "30",
    month: "Feb",
    title: "Indoor Soccer 5v5",
    time: "18:00 - 19:30",
    location: "Leuzesteenweg 241, 9600 Ronse",
    hoste: "Ilyas Assakali",
    date: "Wednesday 16 Decembre"
  },
  {
    id: 9,
    day: "30",
    month: "Feb",
    title: "Indoor Soccer 5v5",
    time: "18:00 - 19:30",
    location: "Leuzesteenweg 241, 9600 Ronse",
    hoste: "Ilyas Assakali",
    date: "Wednesday 16 Decembre"
  },
  {
    id: 10,
    day: "30",
    month: "Feb",
    title: "Indoor Soccer 5v5",
    time: "18:00 - 19:30",
    location: "Leuzesteenweg 241, 9600 Ronse",
    hoste: "Ilyas Assakali",
    date: "Wednesday 16 Decembre"
  },
  {
    id: 11,
    day: "30",
    month: "Feb",
    title: "Indoor Soccer 5v5",
    time: "18:00 - 19:30",
    location: "Leuzesteenweg 241, 9600 Ronse",
    hoste: "Ilyas Assakali",
    date: "Wednesday 16 Decembre"
  },
];*/