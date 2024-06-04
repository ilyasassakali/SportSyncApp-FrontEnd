import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const IntroScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>
            Welcome to <Text style={styles.ssTitle}>SportSync</Text>
          </Text>
          <Text style={styles.description}>
            Create an account with us and experience the ease of planning sports
            activities with friends.
          </Text>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.createAccountButton}
            onPress={() => {
              navigation.navigate("CreateAccount");
            }}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>Create Account</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => {
              navigation.navigate("Login");
            }}
            activeOpacity={0.7}
          >
            <Text style={styles.loginButtonText}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  title: {
    fontSize: 28,
    fontFamily: "Poppins_Bold",
    marginBottom: 10,
    textAlign: "center",
  },
  ssTitle: {
    color: "#4CAF50",
  },
  description: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    fontFamily: "Poppins_SemiBold",
    paddingHorizontal: 20,
  },
  buttonsContainer: {
    width: "100%",
  },
  createAccountButton: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    fontFamily: "Poppins_SemiBold",
  },
  loginButton: {
    borderWidth: 1,
    borderColor: "#4CAF50",
    padding: 12,
    borderRadius: 10,
  },
  loginButtonText: {
    color: "#4CAF50",
    fontSize: 18,
    textAlign: "center",
    fontFamily: "Poppins_SemiBold",
  },
});

export default IntroScreen;
