import React, { useCallback } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import * as SecureStore from 'expo-secure-store';
import { useEvents } from '../../components/EventsContext'; 
import { useFocusEffect } from '@react-navigation/native';



const Tab = createMaterialTopTabNavigator();

const EventCard = ({ event, onPress }) => (
  <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
    <View style={styles.dateContainer}>
      <Text style={styles.dateDay}>{new Date(event.date).getDate()}</Text>
      <Text style={styles.dateMonth}>{new Date(event.date).toLocaleString('en-US', { month: 'short' })}</Text>
    </View>
    <View style={styles.detailContainer}>
      <Text style={styles.eventTitle} numberOfLines={1} ellipsizeMode="tail">{event.title}</Text>
      <View style={styles.eventDetailItem}>
        <Text style={styles.eventDetailsText}>{event.time}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

function UpNextEventsScreen({ navigation }) {
  const { events } = useEvents();
  const now = new Date();
  const upNextEvents = events.filter(event => new Date(event.date) >= now);

  return (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      {upNextEvents.map(event => (
        <EventCard key={event.id} event={event} onPress={() => navigation.navigate('EventOverview', { event })} />
      ))}
    </ScrollView>
  );
}

function PastEventsScreen({ navigation }) {
  const { events } = useEvents(); 
  const now = new Date();
  const pastEvents = events.filter(event => new Date(event.date) < now);

  return (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      {pastEvents.map(event => (
        <EventCard key={event.id} event={event} onPress={() => navigation.navigate('EventOverview', { event })} />
      ))}
    </ScrollView>
  );
}

const EventsScreen = ({ navigation }) => {
  const { setEvents } = useEvents();

  useFocusEffect(
    useCallback(() => {
      const fetchEvents = async () => {
        try {
          const userDataString = await SecureStore.getItemAsync('userData');
          const userData = JSON.parse(userDataString);

          if (userData && userData.id) {
            const userId = userData.id;
            const response = await fetch(`http://192.168.129.29:3000/events/user-events/${userId}`);
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
          {() => <UpNextEventsScreen navigation={navigation} />}
        </Tab.Screen>
        <Tab.Screen name="Past">
          {() => <PastEventsScreen navigation={navigation} />}
        </Tab.Screen>
        </Tab.Navigator>


      <TouchableOpacity
        style={[styles.fab, { backgroundColor: "#4CAF50" }]}
        onPress={() => navigation.navigate('EventName')}
        activeOpacity={1}
      >
        <Ionicons name="create-outline" size={30} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

export default EventsScreen;

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

