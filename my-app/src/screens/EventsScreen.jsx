import React from "react";
import { StyleSheet, Text, View } from "react-native";

const EventsScreen = () => (
  <View style={styles.center}>
    <Text>Events Screen</Text>
  </View>
);

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default EventsScreen;