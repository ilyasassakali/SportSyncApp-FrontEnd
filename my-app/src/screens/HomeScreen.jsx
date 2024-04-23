import React,{useState} from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const HomeScreen = () => {
  const [buttonColor, setButtonColor] = useState("#4CAF50");
  const [fabColor, setFabColor] = useState("#4CAF50");


  return(
  <View style={styles.container}>
    <Text style={styles.header}>Hello Ilyas!</Text>
    <View style={styles.textContainer}>     
      <Text style={styles.subText} >
        Get ready to make your sports{"\n"}
        meetups easy, Ready to play?{"\n"} 
        Start here!
      </Text>
      <TouchableOpacity
          style={[styles.button, { backgroundColor: buttonColor }]}
          onPressIn={() => setButtonColor("#449D48")} 
          onPressOut={() => setButtonColor("#4CAF50")} 
          activeOpacity={1}
        >
          <Text style={styles.buttonText}>Plan a Sport Event</Text>
        </TouchableOpacity>
    </View>
    <Text style={styles.subHeader}>Next Up: Don’t miss out!</Text>
    <View style={styles.eventContainer}>
        <Ionicons name="calendar-outline" size={70} color="#4CAF50" />
        <View style={styles.eventTextContainer}>
          <Text style={styles.eventHeader}>No Events</Text>
          <Text style={styles.eventSubText}>
            Your schedule looks empty.{"\n"} 
            Use SportSync to add exciting{"\n"}
            sports activities.
          </Text>
        </View>
    </View>
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
  textContainer: {
    padding: 20,
    backgroundColor: "#D7F5D8", 
    borderRadius: 10,
    alignSelf: 'stretch',
  },
  header: {
    fontFamily: 'Poppins_Bold',
    fontSize: 24,
    marginBottom: 10, 
  },
  subHeader: {
    fontFamily: 'Poppins_SemiBold',
    fontSize: 20,
    marginBottom: 10, 
    marginTop: 20
  },
  subText: {
    fontFamily: 'Poppins_Regular',
    fontSize: 16,
    textAlign: 'left',
    marginBottom: 20, 
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
  eventContainer: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center'
  },
  eventTextContainer: {
    marginLeft: 20
  },
  eventHeader: {
    fontFamily: 'Poppins_SemiBold',
    fontSize: 16
  },
  eventSubText: {
    fontFamily: 'Poppins_Regular',
    fontSize: 14,
    color: '#A9A9A9' 
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

export default HomeScreen;