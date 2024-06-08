import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import { useAuth } from "../../components/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";

function EditProfileScreen({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const { setUserData } = useAuth();

  useEffect(() => {
    async function loadProfileData() {
      const userDataString = await SecureStore.getItemAsync("userData");
      const userData = JSON.parse(userDataString);
      if (userData) {
        setFirstName(userData.firstName);
        setLastName(userData.lastName);
        setEmail(userData.email);
      }
    }

    loadProfileData();
  }, []);

  const handleSave = async () => {
    const userDataString = await SecureStore.getItemAsync("userData");
    const userData = JSON.parse(userDataString);

    try {
      const response = await fetch(
        "https://sportsyncapp-backend.onrender.com/users/edit-profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: userData.id,
            firstName,
            lastName,
            email,
          }),
        }
      );

      const jsonData = await response.json();
      if (response.status === 200) {
        Alert.alert("Success", "Profile updated successfully");
        await SecureStore.setItemAsync(
          "userData",
          JSON.stringify({
            id: userData.id,
            firstName,
            lastName,
            email,
          })
        );
        setUserData({ id: userData.id, firstName, lastName, email });
      } else {
        Alert.alert("Error", jsonData.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "An error occurred while updating profile.");
    }
  };

  const getInitials = () => {
    const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`;
    return initials.toUpperCase();
  };

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="chevron-back" size={30} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Profile</Text>
          <Text style={styles.savelabel} onPress={handleSave}>
            SAVE
          </Text>
        </View>

        <View style={styles.centeredContainer}>
          <View style={styles.initialsContainer}>
            <Text style={styles.initialsText}>{getInitials()}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.inputContainer}>
            <Text style={styles.sublabel}>First Name</Text>
            <TextInput
              style={styles.halfInput}
              placeholder="First Name"
              value={firstName}
              onChangeText={setFirstName}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.sublabel}>Last Name</Text>
            <TextInput
              style={styles.halfInput}
              placeholder="Last Name"
              value={lastName}
              onChangeText={setLastName}
            />
          </View>
        </View>

        <Text style={styles.sublabel}>E-mail</Text>
        <TextInput
          placeholder="E-mail"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>
    </SafeAreaView>
  );
}

export default EditProfileScreen;

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
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    padding: 10,
    borderRadius: 10,
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
  savelabel: {
    fontSize: 16,
    fontFamily: "Poppins_Regular",
    color: "#4CAF50",
  },
  centeredContainer: {
    alignItems: "center",
    marginBottom: 30,
    marginTop: 30,
  },
  initialsContainer: {
    width: 100,
    height: 100,
    borderRadius: 70,
    backgroundColor: "#D7F5D8",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
    paddingTop: 5,
  },
  initialsText: {
    color: "#4CAF50",
    fontSize: 40,
    fontFamily: "Poppins_SemiBold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputContainer: {
    width: "48%",
  },
  halfInput: {
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 10,
  },
});
