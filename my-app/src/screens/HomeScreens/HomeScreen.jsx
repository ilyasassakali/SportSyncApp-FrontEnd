import React,{useState, useEffect} from "react";
import { StyleSheet, Text, View, TouchableOpacity, Button, Platform } from "react-native";
import { useAuth } from "../../components/AuthContext";
import { useEvents } from '../../components/EventsContext'; 
import FabButton from '../../components/FabButton';
import * as SecureStore from 'expo-secure-store';
import { usePushNotifications } from '../../components/PushNotificationManager';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';


const CountdownTimer = ({ targetDate }) => {
  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining(targetDate));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining(getTimeRemaining(targetDate));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [targetDate]);

  if (!timeRemaining) {
    return null;
  }

  return (
    <View style={styles.countdownContainer}>
      <View style={styles.countdownSection}>
        <Text style={styles.countdownLabel}>Days</Text>
        <Text style={styles.countdownValue}>{timeRemaining.days}</Text>
      </View>
      <View style={styles.countdownSection}>
        <Text style={styles.countdownLabel}>Hours</Text>
        <Text style={styles.countdownValue}>{timeRemaining.hours}</Text>
      </View>
      <View style={styles.countdownSection}>
        <Text style={styles.countdownLabel}>Minutes</Text>
        <Text style={styles.countdownValue}>{timeRemaining.minutes}</Text>
      </View>
      <View style={styles.countdownSection}>
        <Text style={styles.countdownLabel}>Seconds</Text>
        <Text style={styles.countdownValue}>{timeRemaining.seconds}</Text>
      </View>
    </View>
  );
};

const getTimeRemaining = (targetDate) => {
  const now = new Date();
  const difference = targetDate - now;

  if (difference <= 0) {
    return null;
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
};

const parseEventDateTime = (date, time) => {
  const [startTime] = time.split(' - ');
  const [hours, minutes] = startTime.split(':').map(Number);
  const eventDate = new Date(date);
  eventDate.setHours(hours);
  eventDate.setMinutes(minutes);
  eventDate.setSeconds(0);
  eventDate.setMilliseconds(0);
  return eventDate;
};

const HomeScreen = ({ navigation }) => {
  const { userData, savePushToken } = useAuth();
  const { events, setEvents } = useEvents();
  const [buttonColor, setButtonColor] = useState("#4CAF50");
  const [upcomingEvent, setUpcomingEvent] = useState(null);
  const expoPushToken = usePushNotifications();
  const [notifApproachingEvents, setNotifApproachingEvents] = useState(true);

  useEffect(() => {
    if (userData && expoPushToken) {
      savePushToken(userData.id, expoPushToken);
    }
  }, [userData, expoPushToken, savePushToken]);

  const sendNotification = async () => {
    const message = {
      to: expoPushToken,
      sound: "default",
      title: "My first push notification",
      body: "This is my first push notification made with expo"
    }
    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      header:{
        host: "exp.host",
        accept: "application/json",
        "accept-encoding": "gzip, deflate",
        "content-type": "application/json"
      },
      body: JSON.stringify(message)
    })
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const userDataString = await SecureStore.getItemAsync('userData');
        const userData = JSON.parse(userDataString);

        if (userData && userData.id) {
          const userId = userData.id;
          const response = await fetch(`http://192.168.129.29:3000/events/user-events/${userId}`);
          const eventsData = await response.json();
          setEvents(eventsData); 
        } else {
          console.error("No user ID found");
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [setEvents]);

  useEffect(() => {
    const now = new Date();
    const upcomingEvents = events.filter(event => {
      const eventDate = parseEventDateTime(event.date, event.time);
      return eventDate >= now && event.status === "active";
    });

    upcomingEvents.sort((a, b) => {
      const eventADate = parseEventDateTime(a.date, a.time);
      const eventBDate = parseEventDateTime(b.date, b.time);
      return eventADate - eventBDate;
    });

    if (upcomingEvents.length > 0) {
      setUpcomingEvent(upcomingEvents[0]);
    } else {
      setUpcomingEvent(null);
    }
  }, [events]);

  useEffect(() => {
    const loadNotificationPreference = async () => {
      try {
        const value = await AsyncStorage.getItem('notif_approaching_events');
        if (value !== null) {
          setNotifApproachingEvents(JSON.parse(value));
        }
      } catch (e) {
        console.error('Failed to load the notification preference.');
      }
    };

    loadNotificationPreference();
  }, []);

  useEffect(() => {
    if (upcomingEvent && notifApproachingEvents) {
      const eventDate = parseEventDateTime(upcomingEvent.date, upcomingEvent.time);
      const reminders = [
        { title: "24 Hours Reminder", body: `Your event "${upcomingEvent.title}" is starting in 24 hours.`, time: 24 * 60 * 60 * 1000 },
        { title: "8 Hours Reminder", body: `Your event "${upcomingEvent.title}" is starting in 8 hours.`, time: 8 * 60 * 60 * 1000 },
        { title: "1 Hour Reminder", body: `Your event "${upcomingEvent.title}" is starting in 1 hour.`, time: 1 * 60 * 60 * 1000 },
        { title: "20 Minutes Reminder", body: `Your event "${upcomingEvent.title}" is starting in 20 minutes.`, time: 20 * 60 * 1000 },
      ];

      const scheduleNotifications = async () => {
        await Notifications.cancelAllScheduledNotificationsAsync();
        reminders.forEach(async (reminder) => {
          const reminderDate = new Date(eventDate.getTime() - reminder.time);
          await Notifications.scheduleNotificationAsync({
            content: {
              title: "Upcoming Event Reminder",
              body: reminder.body,
              sound: "default",
            },
            trigger: {
              date: reminderDate,
            },
          });
        });
      };

      scheduleNotifications();
    }
  }, [upcomingEvent, notifApproachingEvents]);
  
  
  return(
  <View style={styles.container}>
    <Text style={styles.header}>Hello {userData ? userData.firstName : ""}!</Text>
    <Text style={styles.subTitle}>Up next</Text>
    <View style={styles.textContainer}>  
    {upcomingEvent ? (
      <View>
      <CountdownTimer targetDate={parseEventDateTime(upcomingEvent.date, upcomingEvent.time)} />
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
          </View>
        ) : (
          <View>
            <Text style={styles.subText} >
              Your upcoming sport event{"\n"}
              will appear here...{"\n"}
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
    <Button title="Send push notification" onPress={sendNotification}/>

    <FabButton/>
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
    borderRadius: 10,
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: "#4CAF50"
  },
  header: {
    fontFamily: 'Poppins_Bold',
    fontSize: 28,
    marginBottom: 10, 
  },
  subTitle:{
    fontFamily: 'Poppins_SemiBold',
    fontSize: 20,
    marginBottom: 10, 
    color: "#4CAF50",
  },
  subText: {
    fontFamily: 'Poppins_SemiBold',
    fontSize: 16,
    textAlign: 'left',
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
  cardContainer: {
    flexDirection: 'row',
    paddingLeft: 10,  
    paddingTop: 10
  },
  dateContainer: {
    marginRight: 30,
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
  countdownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    padding: 10,
  },
  countdownSection: {
    alignItems: 'center',
  },
  countdownLabel: {
    fontSize: 12,
    color: '#FFFFFF',
  },
  countdownValue: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
  }
});

export default HomeScreen;