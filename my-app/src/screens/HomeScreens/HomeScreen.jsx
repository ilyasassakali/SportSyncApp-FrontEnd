import React,{useState, useEffect} from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../components/AuthContext";
import { useEvents } from '../../components/EventsContext'; 


const HomeScreen = ({ navigation }) => {
  const { userData } = useAuth();
  const { events } = useEvents();
  const [buttonColor, setButtonColor] = useState("#4CAF50");
  const [fabColor, setFabColor] = useState("#4CAF50");
  const [upcomingEvent, setUpcomingEvent] = useState(null);

  useEffect(() => {
    const now = new Date();
    const upcomingEvents = events.filter(event => {
      const [eventStartHour, eventStartMinute] = event.time.split(' - ')[0].split(':');
      const eventDate = new Date(event.date);
      eventDate.setHours(eventStartHour);
      eventDate.setMinutes(eventStartMinute);
      return eventDate >= now;
    });
    upcomingEvents.sort((a, b) => {
      const eventADate = new Date(a.date);
      const eventBDate = new Date(b.date);
      const [eventAStartHour, eventAStartMinute] = a.time.split(' - ')[0].split(':');
      const [eventBStartHour, eventBStartMinute] = b.time.split(' - ')[0].split(':');
      eventADate.setHours(eventAStartHour);
      eventADate.setMinutes(eventAStartMinute);
      eventBDate.setHours(eventBStartHour);
      eventBDate.setMinutes(eventBStartMinute);
      return eventADate - eventBDate;
    });
    if (upcomingEvents.length > 0) {
      setUpcomingEvent(upcomingEvents[0]);
    } else {
      setUpcomingEvent(null);
    }
  }, [events]);
  
  

  return(
  <View style={styles.container}>
    <Text style={styles.header}>Hello {userData ? userData.firstName : ""}!</Text>
    <Text style={styles.subTitle}>Up next</Text>



    <View style={styles.textContainer}>  
    {upcomingEvent ? (
          <TouchableOpacity style={styles.cardContainer} onPress={() => navigation.navigate('EventOverview', { event: upcomingEvent })}>
            <View style={styles.dateContainer}>
              <Text style={styles.dateDay}>{new Date(upcomingEvent.date).getDate()}</Text>
              <Text style={styles.dateMonth}>{new Date(upcomingEvent.date).toLocaleString('en-US', { month: 'short' })}</Text>
            </View>
            <View style={styles.detailContainer}>
              <Text style={styles.eventTitle} numberOfLines={1} ellipsizeMode="tail">{upcomingEvent.title}</Text>
              <View style={styles.eventDetailItem}>
                <Text style={styles.eventDetailsText}>{upcomingEvent.time}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ) : (
          <View>
            <Text style={styles.subText} >
              Your upcoming sport events{"\n"}
              will appear here...
            </Text>
            <TouchableOpacity
            style={[styles.button, { backgroundColor: buttonColor }]}
            onPressIn={() => setButtonColor("#449D48")} 
            onPressOut={() => setButtonColor("#4CAF50")} 
            onPress={() => navigation.navigate('EventName')}
            activeOpacity={1}
          >
            <Text style={styles.buttonText}>Plan a Sport Event</Text>
          </TouchableOpacity>
        </View>

        )}
      
    </View>



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
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 20,
    paddingTop: 50
  },
  textContainer: {
    padding: 20,
    backgroundColor: "#D7F5D8", 
    borderRadius: 10,
    alignSelf: 'stretch',
  },
  header: {
    fontFamily: 'Poppins_Bold',
    fontSize: 28,
    marginBottom: 10, 
  },
  subTitle:{
    fontFamily: 'Poppins_SemiBold',
    fontSize: 18,
    marginBottom: 10, 
    color: "#666",
  },
  subText: {
    fontFamily: 'Poppins_SemiBold',
    fontSize: 16,
    textAlign: 'left',
    marginBottom: 20, 
    color: "#333",
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  buttonText: {
    fontFamily: 'Poppins_SemiBold',
    color: "#FFFFFF", 
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
  },
  cardContainer: {
    flexDirection: 'row',
    padding: 10,  
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
});

export default HomeScreen;