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
    const [marker, setMarker] = useState(null);
  
    const handleLocationSearch = async () => {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${location}`);
        const data = await response.json();
        if (data && data.length > 0) {
          const newRegion = {
            latitude: parseFloat(data[0].lat),
            longitude: parseFloat(data[0].lon),
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          };
          setRegion(newRegion);
          setMarker(newRegion);  
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
          showsMyLocationButton={true}
          showsUserLocation={true}
        >
          {marker && <Marker coordinate={marker} pinColor="#4caf50" />}
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
    backgroundColor: "transparent" // Assurez-vous que le conteneur est transparent
  },
  map: {
    position: 'absolute', // La carte couvre tout l'écran
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  header: {
    position: 'absolute', // Garde le positionnement absolu
    top: 0, // Démarre tout en haut de la vue
    left: 0,
    right: 0,
    height: 100, // Hauteur spécifique pour le header
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: '#fff', // Fond blanc pour le header
    zIndex: 1, // Assurez-vous qu'il est au-dessus de la carte
    paddingTop: 45
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
  searchArea: {
    position: 'absolute', // Positionnement absolu
    top: 120, // Ajustez cette valeur en fonction de la position du header
    left: 20,
    right: 20,
    flexDirection: 'row',
    zIndex: 1,
    
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
    backgroundColor: '#fff'
  },
  searchButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
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

