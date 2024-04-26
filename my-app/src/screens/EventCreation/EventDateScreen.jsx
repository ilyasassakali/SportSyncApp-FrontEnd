import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Button} from "react-native";
import { Calendar } from 'react-native-calendars';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Ionicons } from "@expo/vector-icons";


const EventDateScreen = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [markedDates, setMarkedDates] = useState({});
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [timePickerMode, setTimePickerMode] = useState('start');

  const showTimePicker = (mode) => {
    setTimePickerMode(mode);
    setTimePickerVisibility(true);
  };
  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };
  const handleConfirm = (selectedTime) => {
    if (timePickerMode === 'start') {
      setStartTime(selectedTime);
    } else {
      setEndTime(selectedTime);
    }
    hideTimePicker();
  };
  const formatTime = (time) => {
    return `${time.getHours()}:${time.getMinutes().toString().padStart(2, '0')}`;
  };

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
    if (selectedDate) {
      updatedMarkedDates[selectedDate] = { ...updatedMarkedDates[selectedDate], selected: false, selectedColor: undefined };
    }
    updatedMarkedDates[day.dateString] = { ...updatedMarkedDates[day.dateString], selected: true, selectedColor: '#4CAF50' };
    setMarkedDates(updatedMarkedDates);
    setSelectedDate(day.dateString);
  };

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={30} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>When?</Text>
      </View>


      <Text style={styles.label}>Timing and Date</Text>   
      <View style={styles.timeContainer}>
        <View style={styles.timeWrapper}>
            <Text style={styles.sublabel}>Start <Ionicons name="time-outline" size={15}  color="#333" /></Text>
            <TouchableOpacity onPress={() => showTimePicker('start')} style={styles.timeDisplay}>
            <Text style={styles.timeText}>{formatTime(startTime)}</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.timeWrapper}>
            <Text style={styles.sublabel}>End <Ionicons name="time-outline" size={15}  color="#333" /></Text>
            <TouchableOpacity onPress={() => showTimePicker('end')} style={styles.timeDisplay}>
            <Text style={styles.timeText}>{formatTime(endTime)}</Text>
            </TouchableOpacity>
        </View>
      </View>
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideTimePicker}
        is24Hour={true}
      />
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
          
      /> 

        <TouchableOpacity
            onPress={() => navigation.navigate('EventDate')}
            style={styles.button}
            activeOpacity={0.9}
            >
            <Text style={styles.buttonText}>Continue</Text>
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
    fontFamily: 'Poppins_Bold',
    flexGrow: 1,
    textAlign: 'center',
    marginTop: 5
  },
  backButton: {
    marginLeft: -10,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  input: {
    marginBottom: 10,
    backgroundColor: "#fff"
  },
  label: {
    fontSize: 18,
    fontFamily: 'Poppins_SemiBold',
    color: '#000',
  },
  sublabel:{
    fontSize: 16,
    fontFamily: 'Poppins_Regular',
    color: '#333'
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    marginTop: 30
  },
  timeWrapper: {
    flex: 1, 
    alignItems: 'center'
  },
  timeDisplay: {
    backgroundColor: "#fff",
    width: '100%',  
    alignItems: 'center'
  },
  timeText: {
    fontSize: 22,
    color: '#333',
    fontFamily: 'Poppins_Regular'
  },
  calendar: {
    marginTop: 30
  },
  button: {
    position: "absolute",
    backgroundColor: "#4CAF50", 
    padding: 12, 
    alignItems: 'center', 
    borderRadius: 5, 
    bottom: 0,
    left: 0,
    right: 0,
    margin: 20,
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.25, 
    shadowRadius: 3.84, 
    elevation: 5 
  },
  buttonText: {
    color: "#fff",
    fontSize: 18, 
    fontFamily: 'Poppins_SemiBold' 
  }
});

export default EventDateScreen;
