import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInput } from 'react-native-paper';


const CreateEventScreen = ({ navigation }) => {
  const [eventName, setEventName] = useState('');
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
        <Text style={styles.headerTitle}>Plan a Sport Event</Text>
      </View>
      <TextInput activeOutlineColor="#6fbf72" outlineColor="#e0e0e0" mode="outlined" label="Event Name" style={styles.input}  value={eventName} onChangeText={setEventName}/>
      {/* Event name presets */}
      <Text style={styles.presetLabel}>Quick Presets:</Text>
      <View style={styles.presetContainer}>
        <EventPresetButton name="Indoor Soccer ⚽" setEventName={setEventName} />
        <EventPresetButton name="Street Basketball 4V4 🏀" setEventName={setEventName} />
        <EventPresetButton name="Tennis 2V2 🎾" setEventName={setEventName} />
        <EventPresetButton name="Running Race 🏃" setEventName={setEventName} />
      </View>
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
      <TextInput style={styles.input} activeOutlineColor="#6fbf72" outlineColor="#e0e0e0" mode="outlined" label="Location" />
      <TextInput style={styles.input} activeOutlineColor="#6fbf72" outlineColor="#e0e0e0" mode="outlined" label="Hosted By" />
      <TextInput style={styles.input} activeOutlineColor="#6fbf72" outlineColor="#e0e0e0" mode="outlined" label="Number of Players" keyboardType="number-pad" />
      <TextInput style={styles.input} activeOutlineColor="#6fbf72" outlineColor="#e0e0e0" mode="outlined" label="Price per Person (optional)" keyboardType="numeric" />
      <TextInput style={styles.input} activeOutlineColor="#6fbf72" outlineColor="#e0e0e0" mode="outlined" label="Team Distribution (optional)" />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Next: Preview</Text>
      </TouchableOpacity>
    </View>
  );
};

const EventPresetButton = ({ name, setEventName }) => (
    <TouchableOpacity
      style={styles.presetButton}
      onPress={() => setEventName(name)}
    >
      <Text style={styles.presetButtonText}>{name}</Text>
    </TouchableOpacity>
);

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
    fontFamily: 'Poppins_SemiBold',
    flexGrow: 1,
    textAlign: 'center',
    marginTop: 5
  },
  input: {  
    marginBottom: 10,
    backgroundColor: "#fff"
  },
  presetContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
    justifyContent: 'flex-start'
  },
  presetButton: {
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 5,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: "#e0e0e0"
  },
  presetLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
    fontFamily: 'Poppins_Regular'
  },
  presetButtonText: {
    color: "#666",
    fontSize: 12,
    fontFamily: 'Poppins_Regular'
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
