import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ProfileScreen = () => (
  <View style={styles.center}>
    <Text>Profile Screen</Text>
  </View>
);

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProfileScreen;