import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  LogBox,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

function EventNameScreen({ navigation }) {
  const [eventName, setEventName] = useState("");

  LogBox.ignoreLogs([
    "Warning: Unknown: Support for defaultProps will be removed from memo components in a future major release.",
  ]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Ionicons name="chevron-back" size={30} color="#000" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>What's the plan?</Text>
          </View>

          <Text style={styles.label}>Event Name</Text>
          <TextInput
            placeholder="Enter Event Name"
            style={styles.input}
            value={eventName}
            onChangeText={setEventName}
          />
          <Text style={styles.presetLabel}>Quick Presets:</Text>
          <View style={styles.presetContainer}>
            <EventPresetButton
              name="Indoor Soccer ⚽"
              setEventName={setEventName}
            />
            <EventPresetButton
              name="Street Basketball 4V4 🏀"
              setEventName={setEventName}
            />
            <EventPresetButton
              name="Tennis 2V2 🎾"
              setEventName={setEventName}
            />
            <EventPresetButton
              name="Running Race 🏃"
              setEventName={setEventName}
            />
          </View>

          <TouchableOpacity
            onPress={() =>
              eventName.trim() &&
              navigation.navigate("EventDate", { event: { title: eventName } })
            }
            style={eventName.trim() ? styles.button : styles.buttonDisabled}
            activeOpacity={0.9}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const EventPresetButton = ({ name, setEventName }) => (
  <TouchableOpacity
    style={styles.presetButton}
    onPress={() => setEventName(name)}
  >
    <Text style={styles.presetButtonText}>{name}</Text>
  </TouchableOpacity>
);

export default EventNameScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
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
    marginLeft: -6,
  },
  input: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    padding: 10,
    borderRadius: 10,
  },
  presetContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
    justifyContent: "flex-start",
  },
  presetButton: {
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 5,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  presetLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 5,
    fontFamily: "Poppins_Regular",
  },
  presetButtonText: {
    color: "#666",
    fontSize: 12,
    fontFamily: "Poppins_Regular",
  },
  label: {
    fontSize: 18,
    fontFamily: "Poppins_SemiBold",
    color: "#000",
  },
  sublabel: {
    fontSize: 16,
    fontFamily: "Poppins_Regular",
    color: "#333",
  },
  button: {
    position: "absolute",
    backgroundColor: "#4CAF50",
    padding: 12,
    alignItems: "center",
    borderRadius: 10,
    bottom: 0,
    left: 0,
    right: 0,
    margin: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Poppins_SemiBold",
  },
  buttonDisabled: {
    position: "absolute",
    backgroundColor: "#cccccc",
    padding: 12,
    alignItems: "center",
    borderRadius: 10,
    bottom: 0,
    left: 0,
    right: 0,
    margin: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
