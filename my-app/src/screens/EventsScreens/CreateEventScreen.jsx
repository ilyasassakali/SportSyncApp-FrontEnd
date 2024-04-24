import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from '@react-native-community/datetimepicker';

const CreateEventScreen = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={30} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Plan Event</Text>
      </View>
      <TextInput style={styles.input} placeholder="Event Title" />
      <View style={styles.dateTimeContainer}>
        <TouchableOpacity style={styles.dateTimeInput} onPress={() => showMode('date')}>
          <Text style={styles.dateTimeText}>{date.toDateString()}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.dateTimeInput} onPress={() => showMode('time')}>
          <Text style={styles.dateTimeText}>{date.toTimeString().slice(0, 5)}</Text>
        </TouchableOpacity>
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
      <TextInput style={styles.input} placeholder="Location" />
      <TextInput style={styles.input} placeholder="Hosted By" />
      <TextInput style={styles.input} placeholder="Number of Players" keyboardType="number-pad" />
      <TextInput style={styles.input} placeholder="Price per Person (optional)" keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Team Distribution (optional)" />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Next: Preview</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: "#fff"
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    flexGrow: 1,
    textAlign: 'center'
  },
  input: {
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
    padding: 10
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  dateTimeInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 10
  },
  dateTimeText: {
    fontSize: 18
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: 'bold'
  }
});

export default CreateEventScreen;
