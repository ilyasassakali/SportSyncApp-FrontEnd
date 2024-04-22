import React from "react";
import { StyleSheet, Text, View } from "react-native";

const HomeScreen = () => (
  <View style={styles.center}>
    <Text>Home Screen</Text>
  </View>
);

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
