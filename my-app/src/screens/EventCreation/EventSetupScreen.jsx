import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

function EventSetupScreen({ route, navigation }) {
  const { event } = route.params;
  const [numberOfPlayers, setNumberOfPlayers] = useState(10);
  const [teamOne, setTeamOne] = useState("5");
  const [teamTwo, setTeamTwo] = useState("5");
  const [teamOneColor, setTeamOneColor] = useState("#4CAF50");
  const [teamTwoColor, setTeamTwoColor] = useState("red");
  const colors = [
    "#4CAF50",
    "red",
    "#0080ff",
    "#ffe200",
    "purple",
    "orange",
    "black",
    "#ffffff",
  ];
  const [price, setPrice] = useState("0");
  const [isTeamDistributionEnabled, setIsTeamDistributionEnabled] =
    useState(false);

  const handleIncrease = () => {
    setNumberOfPlayers((prev) => prev + 1);
  };

  const handleDecrease = () => {
    if (numberOfPlayers > 1) {
      setNumberOfPlayers((prev) => prev - 1);
    }
  };

  function isValidPrice(value) {
    return /^\d+(\.\d{0,2})?$/.test(value);
  }

  const handlePriceChange = (value) => {
    const formattedValue = value.replace(",", ".");
    setPrice(formattedValue);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="chevron-back" size={30} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Add Setup</Text>
        </View>

        <Text style={styles.label}>Number of Players</Text>
        <View style={styles.numberInputContainer}>
          <TouchableOpacity
            onPress={handleDecrease}
            style={styles.changeNumberButton}
          >
            <Ionicons name="remove-outline" size={30} color="#fff" />
          </TouchableOpacity>
          <TextInput
            placeholder="10"
            style={styles.numberInput}
            value={numberOfPlayers.toString()}
            keyboardType="numeric"
            onChangeText={(text) => setNumberOfPlayers(Number(text))}
          />
          <TouchableOpacity
            onPress={handleIncrease}
            style={styles.changeNumberButton}
          >
            <Ionicons name="add-outline" size={30} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            onPress={() => setIsTeamDistributionEnabled((prev) => !prev)}
            style={styles.checkbox}
          >
            {isTeamDistributionEnabled ? (
              <Ionicons name="checkbox" size={30} color="#4CAF50" />
            ) : (
              <Ionicons name="square-outline" size={30} color="#4CAF50" />
            )}
            <Text style={styles.checkboxText}>Enable Team Distribution</Text>
          </TouchableOpacity>
        </View>

        {isTeamDistributionEnabled && (
          <View style={styles.teamDistributionContainer}>
            <Ionicons
              name="shirt"
              size={40}
              style={[
                styles.shirtIcon,
                {
                  color: teamOneColor,
                  backgroundColor:
                    teamOneColor === "#ffffff" ? "#4CAF50" : "transparent",
                  padding: teamOneColor === "#ffffff" ? 1 : 0,
                },
              ]}
            />
            <TextInput
              placeholder="5"
              style={styles.teamInput}
              value={teamOne}
              onChangeText={setTeamOne}
              keyboardType="numeric"
            />
            <Text style={styles.vsText}>VS</Text>
            <TextInput
              placeholder="5"
              style={styles.teamInput}
              value={teamTwo}
              onChangeText={setTeamTwo}
              keyboardType="numeric"
            />
            <Ionicons
              name="shirt"
              size={40}
              style={[
                styles.shirtIcon,
                {
                  color: teamTwoColor,
                  backgroundColor:
                    teamTwoColor === "#ffffff" ? "#4CAF50" : "transparent",
                  padding: teamTwoColor === "#ffffff" ? 1 : 0,
                },
              ]}
            />
          </View>
        )}

        {isTeamDistributionEnabled && (
          <View style={styles.colorPickerContainer}>
            <View style={styles.colorPickerContainerLeft}>
              <View style={styles.colorRow}>
                {colors.slice(0, 4).map((color, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[styles.colorOption, { backgroundColor: color }]}
                    onPress={() => setTeamOneColor(color)}
                  />
                ))}
              </View>
              <View style={styles.colorRow}>
                {colors.slice(4, 8).map((color, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[styles.colorOption, { backgroundColor: color }]}
                    onPress={() => setTeamOneColor(color)}
                  />
                ))}
              </View>
            </View>
            <View style={styles.colorPickerContainerRight}>
              <View style={styles.colorRow}>
                {colors.slice(0, 4).map((color, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[styles.colorOption, { backgroundColor: color }]}
                    onPress={() => setTeamTwoColor(color)}
                  />
                ))}
              </View>
              <View style={styles.colorRow}>
                {colors.slice(4, 8).map((color, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[styles.colorOption, { backgroundColor: color }]}
                    onPress={() => setTeamTwoColor(color)}
                  />
                ))}
              </View>
            </View>
          </View>
        )}

        <Text style={styles.label}>Price per Person</Text>
        <View style={styles.priceContainer}>
          <Ionicons
            name="logo-euro"
            size={35}
            color="#4CAF50"
            style={{ marginRight: 10 }}
          />
          <TextInput
            placeholder="1"
            style={styles.priceInput}
            value={price}
            onChangeText={handlePriceChange}
            keyboardType="decimal-pad"
          />
        </View>

        <TouchableOpacity
          onPress={() => {
            if (
              (!isTeamDistributionEnabled ||
                (isTeamDistributionEnabled &&
                  parseInt(teamOne) + parseInt(teamTwo) === numberOfPlayers &&
                  teamOneColor !== teamTwoColor)) &&
              numberOfPlayers > 0 &&
              isValidPrice(price)
            ) {
              navigation.navigate("EventPreview", {
                event: {
                  ...event,
                  numberOfPlayers,
                  teamDistribution: { teamOne, teamTwo },
                  teamColors: { teamOneColor, teamTwoColor },
                  price,
                  isTeamDistributionEnabled,
                },
              });
            }
          }}
          style={
            (!isTeamDistributionEnabled ||
              (isTeamDistributionEnabled &&
                parseInt(teamOne) + parseInt(teamTwo) === numberOfPlayers &&
                teamOneColor !== teamTwoColor)) &&
            numberOfPlayers > 0 &&
            isValidPrice(price)
              ? styles.button
              : styles.buttonDisabled
          }
          activeOpacity={0.9}
          disabled={numberOfPlayers <= 0 || !isValidPrice(price)}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default EventSetupScreen;

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
  numberInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  numberInput: {
    borderWidth: 1,
    borderTopWidth: 1,
    borderColor: "#e0e0e0",
    padding: 10,
    borderRadius: 10,
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Poppins_Regular",
    width: 100,
    marginHorizontal: 10,
  },
  changeNumberButton: {
    paddingVertical: 9,
    backgroundColor: "#4CAF50",
    borderRadius: 10,
    paddingHorizontal: 5,
  },
  label: {
    fontSize: 18,
    fontFamily: "Poppins_SemiBold",
    color: "#000",
  },
  teamDistributionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  teamInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    padding: 10,
    borderRadius: 10,
    textAlign: "center",
    marginHorizontal: 10,
    fontSize: 16,
    fontFamily: "Poppins_Regular",
  },
  vsText: {
    marginHorizontal: 10,
    fontSize: 16,
    fontFamily: "Poppins_SemiBold",
    color: "#333",
  },
  colorPickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  colorPickerContainerLeft: {
    width: "50%",
    alignItems: "flex-start",
  },
  colorPickerContainerRight: {
    width: "50%",
    alignItems: "flex-end",
  },
  colorRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  shirtIcon: {
    width: 40,
    height: 40,
    textAlign: "center",
    borderRadius: 10,
    overflow: "hidden",
  },
  colorOption: {
    width: 30,
    height: 30,
    borderRadius: 10,
    margin: 5,
    borderWidth: 1.25,
    borderColor: "#e0e0e0",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkbox: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxText: {
    marginLeft: 8,
    fontSize: 16,
    fontFamily: "Poppins_Regular",
    marginTop: 5,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: Platform.OS === "ios" ? 10 : 0,
  },
  priceInput: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    padding: 10,
    borderRadius: 10,
    fontSize: 16,
    fontFamily: "Poppins_Regular",
    width: 100,
    textAlign: "center",
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
