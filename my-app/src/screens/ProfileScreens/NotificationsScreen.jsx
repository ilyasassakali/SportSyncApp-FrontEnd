import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={30} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>

      <View style={styles.optionsContainer}>
        {/*<OptionItem
          title="Receive practical notifications that involves me"
          settingKey="notif_involves_me"
  />*/}
        <OptionItem
          title="Receive reminder notifications about approaching events"
          settingKey="notif_approaching_events"
        />
      </View>
    </View>
  );
};

const OptionItem = ({ title, settingKey }) => {
  const [isEnabled, setIsEnabled] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const value = await AsyncStorage.getItem(settingKey);
      if (value !== null) {
        setIsEnabled(JSON.parse(value));
      }
    } catch (e) {
      console.error("Failed to load the setting " + settingKey);
    }
  };

  const toggleSwitch = async () => {
    try {
      const newValue = !isEnabled;
      setIsEnabled(newValue);
      await AsyncStorage.setItem(settingKey, JSON.stringify(newValue));
    } catch (e) {
      console.error("Failed to save the setting " + settingKey);
    }
  };

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
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: 20,
    paddingTop: 60,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: "Poppins_Bold",
    flexGrow: 1,
    textAlign: "center",
    marginTop: 5,
  },
  backButton: {
    marginLeft: -10,
  },
  optionsContainer: {
    width: "100%",
  },
  optionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    width: "100%",
  },
  optionText: {
    fontFamily: "Poppins_Regular",
    fontSize: 16,
    color: "#000",
    color: "#000",
    flex: 1,
    marginRight: 60,
  },
});

export default ProfileScreen;
