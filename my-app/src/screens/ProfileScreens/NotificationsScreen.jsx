import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ProfileScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={30} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>

      <View style={styles.optionsContainer}>
        <OptionItem title="Receive notification when guests Go or cancel"/>
        <OptionItem title="Receive notification for activity that involves me"/>
        <OptionItem title="Receive notification about approaching events " />
      </View>
    </View>
  );
};

const OptionItem = ({ title }) => {
    const [isEnabled, setIsEnabled] = useState(true);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  
    return (
      <View style={styles.optionItem}>
        <Text style={styles.optionText}>{title}</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#D7F5D8" }}
          thumbColor={isEnabled ? "#4CAF50" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
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
    paddingTop: 60
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
   
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: 'Poppins_Bold',
    flexGrow: 1,
    textAlign: 'center',
    marginTop: 5,
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
    fontFamily: 'Poppins_Regular',
    fontSize: 16,
    color: '#000',
    color: '#000',
    flex: 1, 
    marginRight: 90,
  },
});

export default ProfileScreen;

