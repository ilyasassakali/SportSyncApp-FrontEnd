import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';


const EventLocationScreen = ({ navigation }) => {
    const [location, setLocation] = useState('');
    const [region, setRegion] = useState({
      latitude: 50.8503,
      longitude: 4.3517,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  
    const handleLocationSearch = async () => {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${location}`);
      const data = await response.json();
      if (data && data.length > 0) {
        setRegion({
          latitude: parseFloat(data[0].lat),
          longitude: parseFloat(data[0].lon),
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      }
    };

    useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            alert('Permission to access location was denied');
            return;
          }
  
          let loc = await Location.getCurrentPositionAsync({});
          setRegion({
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
        })();
    }, []);
  
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={30} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Where?</Text>
        </View>
        <Text style={styles.label}>Location</Text>
        <View style={styles.searchArea}>
          <TextInput
            placeholder="Enter Event Location"
            style={styles.input}
            value={location}
            onChangeText={setLocation}
          />
          <TouchableOpacity onPress={handleLocationSearch} style={styles.searchButton}>
            <Ionicons name="search-outline" size={20} color="#fff" />
          </TouchableOpacity>  
        </View>
        <MapView
          style={styles.map}
          region={region}
        >
          <Marker coordinate={region} pinColor="#4caf50" />
        </MapView>
      
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
  map: {
    height: "70%",
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
  searchArea: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    fontFamily: 'Poppins_SemiBold',
    color: '#000',
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

export default EventLocationScreen;

