import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from "@expo/vector-icons";


const EventEnterCodeScreen = ({ navigation }) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);

  const handleInputChange = (text, index) => {
    if (/^\d*$/.test(text)) {
      const newCode = [...code];
      newCode[index] = text;
      setCode(newCode);

      if (text && index < 5) {
        inputs[index + 1].focus();
      }
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !code[index]) {
      if (index > 0) {
        const newCode = [...code];
        newCode[index - 1] = '';
        setCode(newCode);
        inputs[index - 1].focus();
      }
    }
  };

  const inputs = [];

  return (
    <View style={styles.container}>
        <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={30} color="#000" />
        </TouchableOpacity>
      </View>


      <View style={styles.centeredContent}>
        <Text style={styles.title}>Enter the Code to join the sport event</Text>
        <View style={styles.codeContainer}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              value={digit}
              onChangeText={(text) => handleInputChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              style={styles.input}
              keyboardType="numeric"
              maxLength={1}
              ref={(input) => { inputs[index] = input; }}
            />
          ))}
        </View>
      </View>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: "#fff",
    paddingBottom: 50
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginBottom: 20,
    fontSize: 22,
    fontFamily: 'Poppins_Bold',
    textAlign: 'center',
    color: '#333',
    marginHorizontal: 35
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  input: {
    width: 40,
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    textAlign: 'center',
    fontSize: 20,
    backgroundColor: '#fff',
    fontFamily: 'Poppins_SemiBold',
  },
  
});

export default EventEnterCodeScreen;
