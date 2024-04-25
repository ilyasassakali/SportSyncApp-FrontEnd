import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Calendar } from 'react-native-calendars';
import { TextInput } from 'react-native-paper';


const CreateEventScreen = ({ navigation }) => {
  const [eventName, setEventName] = useState('');
  /*
  const [selectedDate, setSelectedDate] = useState('');
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    const today = new Date();
    const todayString = today.toISOString().split('T')[0];
    setSelectedDate(todayString);  
    generateMarkedDates(todayString);  
  }, []);
  
  const generateMarkedDates = (selectedDateString) => {
    let dates = {};
    const today = new Date();
    for (let i = 0; i < 365; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      const dateString = date.toISOString().split('T')[0];
      dates[dateString] = {
        marked: true,
        dotColor: '#4CAF50',
        selected: dateString === selectedDateString,
        selectedColor: '#4CAF50'
      };
    }
    setMarkedDates(dates);
  };
  
  const onDayPress = (day) => {
    const updatedMarkedDates = { ...markedDates };

    // Retirer la sélection précédente
    if (selectedDate) {
      updatedMarkedDates[selectedDate] = { ...updatedMarkedDates[selectedDate], selected: false, selectedColor: undefined };
    }

    // Marquer la nouvelle date sélectionnée
    updatedMarkedDates[day.dateString] = { ...updatedMarkedDates[day.dateString], selected: true, selectedColor: '#4CAF50' };

    setMarkedDates(updatedMarkedDates);
    setSelectedDate(day.dateString);
  };*/

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={30} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Plan a Sport Event</Text>
      </View>

      <Text style={styles.label}>Event Name</Text>
      <TextInput activeOutlineColor="#6fbf72" outlineColor="#e0e0e0" mode="outlined" label="Event Name" style={styles.input}  value={eventName} onChangeText={setEventName}/>
      <Text style={styles.presetLabel}>Quick Presets:</Text>
      <View style={styles.presetContainer}>
        <EventPresetButton name="Indoor Soccer ⚽" setEventName={setEventName} />
        <EventPresetButton name="Street Basketball 4V4 🏀" setEventName={setEventName} />
        <EventPresetButton name="Tennis 2V2 🎾" setEventName={setEventName} />
        <EventPresetButton name="Running Race 🏃" setEventName={setEventName} />
      </View>


      <Text style={styles.label}>Event Date</Text>
      {/*
      <Calendar
        
        onDayPress={onDayPress}
        markedDates={markedDates}
        style={styles.calendar}
        theme={{
            backgroundColor: '#ffffff',
            calendarBackground: '#ffffff',
            textSectionTitleColor: '#b6c1cd',
            todayTextColor: '#4CAF50',
            todayBackgroundColor: 'transparent',
            selectedDayBackgroundColor: 'transparent',  
            selectedDayTextColor: '#ffffff',
            dayTextColor: '#2d4150',
            arrowColor: '#2d4150',
            monthTextColor: '#2d4150',
            textDayFontFamily: 'Poppins_Regular',
            textMonthFontFamily: 'Poppins_Regular',
            textDayHeaderFontFamily: 'Poppins_Regular',
            textDayFontSize: 17,
            textMonthFontSize: 18,
            textDayHeaderFontSize: 16,
          }}
          
      />*/}

      






      {/*
      <TextInput style={styles.input} activeOutlineColor="#6fbf72" outlineColor="#e0e0e0" mode="outlined" label="Location" />
      <TextInput style={styles.input} activeOutlineColor="#6fbf72" outlineColor="#e0e0e0" mode="outlined" label="Number of Players" keyboardType="number-pad" />
      <TextInput style={styles.input} activeOutlineColor="#6fbf72" outlineColor="#e0e0e0" mode="outlined" label="Price per Person (optional)" keyboardType="numeric" />
      <TextInput style={styles.input} activeOutlineColor="#6fbf72" outlineColor="#e0e0e0" mode="outlined" label="Team Distribution (optional)" />*/ }
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
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  input: {
    marginBottom: 10,
    backgroundColor: "#fff"
  },
  presetContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 30,
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
  label: {
    fontSize: 16,
    fontFamily: 'Poppins_SemiBold',
    color: '#000'
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
