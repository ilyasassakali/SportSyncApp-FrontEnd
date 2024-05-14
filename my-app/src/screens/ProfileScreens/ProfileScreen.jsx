import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../components/AuthContext"
import * as SecureStore from 'expo-secure-store';


const ProfileScreen = ({navigation}) => {
  const { userData, setUserData, setIsUserLoggedIn } = useAuth();

  const handleSignOut = async () => {
    try {
      await SecureStore.deleteItemAsync('userData');
      setIsUserLoggedIn(false);
      setUserData(null); 
    } catch (error) {
      console.error("Failed to delete the user data", error);
      Alert.alert("Error", "Failed to sign out.");
    }
  };

  const getInitials = () => {
    if (!userData) return "";
    const initials = `${userData.firstName.charAt(0)}${userData.lastName.charAt(0)}`;
    return initials.toUpperCase();
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <View style={styles.initialsContainer}>
          <Text style={styles.initialsText}>{getInitials()}</Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.nameText}>{userData ? `${userData.firstName} ${userData.lastName}` : ""}</Text>
          <Text style={styles.emailText}>{userData ? userData.email : ""}</Text>
        </View>
      </View>

      <View style={styles.optionsContainer}>
        <OptionItem title="Edit Profile" onPress={() => navigation.navigate('EditProfile')}/>
        <OptionItem title="Notifications" onPress={() => navigation.navigate('Notifications')}/>
        <OptionItem title="Contact Us" />
        <OptionItem title="Frequently Asked Questions" />
        <OptionItem title="Sign Out" onPress={handleSignOut}/>
      </View>

      <View style={styles.legalContainer}>
        <Text style={styles.legalText}>Terms of Service</Text>
        <Text style={styles.legalIcon}> | </Text>
        <Text style={styles.legalText}>Privacy Policy</Text>
      </View>
    </View>
  );
};

const OptionItem = ({ title, onPress }) => (
  <TouchableOpacity style={styles.optionItem} onPress={onPress}>
    <Text style={styles.optionText}>{title}</Text>
    <Ionicons name="chevron-forward-outline" size={20} color="#000" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 20,
    paddingTop: 60
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 50
  },
  initialsContainer: {
    width: 80,
    height: 80,
    borderRadius: 70,
    backgroundColor: '#D7F5D8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    paddingTop: 5
  },
  initialsText: {
    color: '#4CAF50',
    fontSize: 30,
    fontFamily: 'Poppins_SemiBold'
  },
  profileInfo: {
    flexDirection: 'column',
    justifyContent: 'center'
  },
  nameText: {
    fontSize: 20,
    fontFamily: 'Poppins_SemiBold',
    color: '#000'
  },
  emailText: {
    fontSize: 14,
    fontFamily: 'Poppins_Regular',
    color: '#666'
  },
  optionsContainer: {
    width: '100%',
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    width: '100%',
  },
  optionText: {
    fontFamily: 'Poppins_SemiBold',
    fontSize: 16,
    color: '#333',
  },
  legalContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
  legalText: {
    fontFamily: 'Poppins_Regular',
    fontSize: 12,
    color: '#4CAF50'
  },
  legalIcon:{
    fontFamily: 'Poppins_Regular',
    fontSize: 12,
    color: '#666'
  }
});

export default ProfileScreen;

