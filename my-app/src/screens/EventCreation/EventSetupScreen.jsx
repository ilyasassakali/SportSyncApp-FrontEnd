import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

function EventSetupScreen({ navigation }) {
  const [numberOfPlayers, setNumberOfPlayers] = useState(1);
  const [teamOne, setTeamOne] = useState('');
  const [teamTwo, setTeamTwo] = useState('');
  const [teamOneColor, setTeamOneColor] = useState('#4CAF50');
  const [teamTwoColor, setTeamTwoColor] = useState('#ff4500');
  const colors = ['#4CAF50', '#ff4500', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#000000', '#ffffff']; 

  const handleIncrease = () => {
    setNumberOfPlayers(prev => prev + 1);
  };

  const handleDecrease = () => {
    if (numberOfPlayers > 1) {
      setNumberOfPlayers(prev => prev - 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={30} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Setup</Text>
      </View>

      <Text style={styles.label}>Number of Players</Text>
      <View style={styles.numberInputContainer}>
        <TouchableOpacity onPress={handleDecrease} style={styles.changeNumberButton}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <TextInput 
          placeholder="Enter Number of Players" 
          style={styles.numberInput} 
          value={numberOfPlayers.toString()} 
          keyboardType="numeric"
          onChangeText={text => setNumberOfPlayers(Number(text))}
        />
        <TouchableOpacity onPress={handleIncrease} style={styles.changeNumberButton}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Team Distribution</Text>
      <View style={styles.teamDistributionContainer}>
        <Ionicons name="shirt-outline" size={40} style={[styles.shirtIcon, {
            color: teamOneColor,
            backgroundColor: teamOneColor === '#ffffff' ? '#4CAF50' : 'transparent', 
            padding: teamOneColor === '#ffffff' ? 1 : 0 
        }]}  />
        <TextInput 
          placeholder="5" 
          style={styles.teamInput} 
          value={teamOne} 
          onChangeText={setTeamOne}
          keyboardType='numeric'
        />
        <Text style={styles.vsText}>VS</Text>
        <TextInput 
          placeholder="5" 
          style={styles.teamInput} 
          value={teamTwo} 
          onChangeText={setTeamTwo}
          keyboardType='numeric'
        />
        <Ionicons name="shirt-outline" size={40} style={[styles.shirtIcon, {
            color: teamTwoColor,
            backgroundColor: teamTwoColor === '#ffffff' ? '#4CAF50' : 'transparent', 
            padding: teamTwoColor === '#ffffff' ? 1 : 0 
        }]}  />
      </View>

      <View style={styles.colorPickerContainer}>
        <View style={styles.colorPickerContainerLeft}>
            <View style={styles.colorRow}>
            {colors.slice(0, 4).map((color, index) => (
                <TouchableOpacity
                key={index}
                style={[styles.colorOption, {backgroundColor: color}]}
                onPress={() => setTeamOneColor(color)}
                />
            ))}
            </View>
            <View style={styles.colorRow}>
            {colors.slice(4, 8).map((color, index) => (
                <TouchableOpacity
                key={index}
                style={[styles.colorOption, {backgroundColor: color}]}
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
                style={[styles.colorOption, {backgroundColor: color}]}
                onPress={() => setTeamTwoColor(color)}
                />
            ))}
            </View>
            <View style={styles.colorRow}>
            {colors.slice(4, 8).map((color, index) => (
                <TouchableOpacity
                key={index}
                style={[styles.colorOption, {backgroundColor: color}]}
                onPress={() => setTeamTwoColor(color)}
                />
            ))}
            </View>
        </View>
       </View>


      <TouchableOpacity
        onPress={() => navigation.navigate('EventSetup')}
        style={styles.button}
        activeOpacity={0.9}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

export default EventSetupScreen;

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
  headerTitle: {
    fontSize: 22,
    fontFamily: 'Poppins_Bold',
    flexGrow: 1,
    textAlign: 'center',
    marginTop: 5,
  },
  backButton: {
    marginLeft: -10,
  },
  numberInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  numberInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    padding: 10,
    borderRadius: 10,
    textAlign: 'center',
    marginHorizontal: 20
  },
  changeNumberButton: {
    padding: 10,
    backgroundColor: "#4CAF50",
    borderRadius: 10,
    paddingHorizontal: 20
  },
  label: {
    fontSize: 18,
    fontFamily: 'Poppins_SemiBold',
    color: '#000',
  },
  teamDistributionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  teamInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    padding: 10,
    borderRadius: 10,
    textAlign: 'center',
    marginHorizontal: 10
  },
  vsText: {
    marginHorizontal: 10,
    fontSize: 16,
    fontFamily: 'Poppins_SemiBold',
    color: '#333'
  },
  colorPickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  colorPickerContainerLeft: {
    width: '50%', 
    alignItems: 'flex-start', 
  },
  colorPickerContainerRight: {
    width: '50%', 
    alignItems: 'flex-end', 
  },
  colorRow: { 
    flexDirection: 'row',
    justifyContent: 'flex-start', 
  },
  shirtIcon: {
    width: 40,
    height: 40,
    textAlign: 'center',
    borderRadius: 10
   
  },
  colorOption: {
    width: 30,
    height: 30,
    borderRadius: 15,
    margin: 5,
    borderWidth: 0.25, 
    borderColor: '#000' 
  },
  button: {
    position: "absolute",
    backgroundColor: "#4CAF50",
    padding: 12,
    alignItems: 'center',
    borderRadius: 10,
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