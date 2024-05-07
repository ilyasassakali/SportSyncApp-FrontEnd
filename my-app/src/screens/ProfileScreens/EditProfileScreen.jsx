import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from "@expo/vector-icons";


function EditProfileScreen({ navigation }) {

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={30} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <Text style={styles.savelabel}>SAVE</Text>
      </View>

      <View style={styles.centeredContainer}>
        <View style={styles.initialsContainer}>
          <Text style={styles.initialsText}>IA</Text>
        </View>
      </View>

      <Text style={styles.sublabel}>Name</Text>
      <TextInput placeholder="Enter Your Name" style={styles.input}/>

      <Text style={styles.sublabel}>E-mail</Text>
      <TextInput placeholder="Enter Your E-mail" style={styles.input}/>
    </View>
  );
}


export default EditProfileScreen;


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
  input: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    padding: 10,
    borderRadius: 10,
    fontFamily: 'Poppins_Regular'
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
  savelabel:{
    fontSize: 16,
    fontFamily: 'Poppins_Regular',
    color: '#4CAF50'
  },
  centeredContainer: {
    alignItems: 'center', 
    marginBottom: 30, 
    marginTop: 30
  },
  initialsContainer: {
    width: 100,
    height: 100,
    borderRadius: 70,
    backgroundColor: '#D7F5D8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    paddingTop: 5
  },
  initialsText: {
    color: '#4CAF50',
    fontSize: 30,
    fontFamily: 'Poppins_SemiBold'
  }
});