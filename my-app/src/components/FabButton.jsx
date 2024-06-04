import React, { useState } from "react";
import { FAB } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Platform, StyleSheet } from "react-native";

const FabButton = () => {
  const [state, setState] = useState({ open: false });
  const navigation = useNavigation();

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  const fabStyle = Platform.select({
    ios: { marginBottom: -20 },
    android: {},
  });

  return (
    <FAB.Group
      open={open}
      visible
      icon={open ? "close" : "plus"}
      actions={[
        {
          icon: "account-plus",
          label: "Join Event",
          onPress: () => navigation.navigate("EventEnterCode"),
          style: { backgroundColor: "#4CAF50" },
          color: "#FFFFFF",
          labelTextColor: "#4CAF50",
        },
        {
          icon: "pencil",
          label: "Plan Event",
          onPress: () => navigation.navigate("EventName"),
          style: { backgroundColor: "#4CAF50" },
          color: "#FFFFFF",
          labelTextColor: "#4CAF50",
        },
      ]}
      onStateChange={onStateChange}
      fabStyle={[styles.fab, fabStyle]}
      color="#FFFFFF"
    />
  );
};

export default FabButton;

const styles = StyleSheet.create({
  fab: {
    backgroundColor: "#4CAF50", 
  },
});
