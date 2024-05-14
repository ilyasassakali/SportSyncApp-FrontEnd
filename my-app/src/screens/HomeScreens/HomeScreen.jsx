import React,{useState, useEffect} from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as SecureStore from 'expo-secure-store';
import { useAuth } from "../../components/AuthContext";


const HomeScreen = ({ navigation }) => {
  const { userData } = useAuth();
  const [buttonColor, setButtonColor] = useState("#4CAF50");
  const [fabColor, setFabColor] = useState("#4CAF50");

  return(
  <View style={styles.container}>
    <Text style={styles.header}>Hello {userData ? userData.firstName : ""}!</Text>
    <Text style={styles.subTitle}>Up next</Text>
    <View style={styles.textContainer}>  
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


    {/* Floating Action Button */}
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
  }
});

export default HomeScreen;