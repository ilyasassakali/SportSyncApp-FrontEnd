import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker } from 'react-native-maps';
import { customMapStyle } from '../../components/MapStyles';



function EventOverviewScreen({route, navigation }) {
  const { event } = route.params;

  const eventLocation = {
    latitude: 50.7459,
    longitude: 3.6005, 
    latitudeDelta: 0.003,
    longitudeDelta: 0.003,
  };

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.checkButton}>
          <Ionicons name="checkmark-outline" size={30} color="#000" />
        </TouchableOpacity>
      </View>

      <Text style={styles.eventName}>{event.title}</Text>
      <Text style={styles.hostedBy}>
            Hosted by <Text style={styles.hostName}>{event.hoste}</Text>
      </Text>

      <View style={styles.mapContainer}>
        <MapView
            style={styles.map}
            initialRegion={eventLocation}
            customMapStyle={customMapStyle}
        >
            <Marker coordinate={eventLocation} title={event.title} description={event.location} pinColor="#4caf50"/>
        </MapView>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <Ionicons name="location-outline" size={20} color="#4CAF50" />
          <Text style={styles.detailText}>{event.location}</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="calendar-outline" size={20} color="#4CAF50" />
          <Text style={styles.detailText}>{event.date}</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="time-outline" size={20} color="#4CAF50" />
          <Text style={styles.detailText}>{event.time}</Text>
        </View>
      </View>


      <View style={styles.statisticsContainer}>
        <View style={styles.statItem}>
            <View style={styles.distributionContainer}>
                <Text style={styles.distributionText}>5 vs 5</Text>
            </View>
            <Text style={styles.statNumber}>10</Text>
            <Text style={styles.statLabel}>Players</Text>
        </View>
        <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              2<Text style={styles.smallUnit}>h</Text><Text style={styles.smallerUnit}>30</Text>
            </Text>
            <Text style={styles.statLabel}>Duration</Text>
        </View>
        <View style={styles.statItem}>
            <Text style={styles.statNumber}>
            <Text style={styles.smallUnit}>€</Text>2.5
            </Text>
            <Text style={styles.statLabel}>Price</Text>
        </View>
      </View>



      
    </View>
  );
}

export default EventOverviewScreen;


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
  eventName: {
    fontFamily: 'Poppins_Bold',
    fontSize: 24,
    color: "#333",
  },
  hostedBy: {
    fontFamily: 'Poppins_Regular',
    fontSize: 17,
    color: "#666",
    marginBottom: 15,
    marginTop: -5
  },
  hostName: {
    color: "#4CAF50",
    fontFamily: 'Poppins_Regular',
    fontSize: 17,
  },
  detailsContainer: {
    
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  detailText: {
    fontFamily: 'Poppins_Regular',
    fontSize: 16,
    color: "#666",
    marginLeft: 10,
  },
  map: {
    height: 150,
  },
  mapContainer: {
    height: 150,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
  statisticsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  statItem: {
    alignItems: 'center',
    position: 'relative', 
  },
  statNumber: {
    fontFamily: 'Poppins_Regular',
    fontSize: 40,
    color: "#333",
  },
  statLabel: {
    fontFamily: 'Poppins_Regular',
    fontSize: 14,
    color: "#4CAF50",
    marginTop: -20
  },
  distributionContainer: {
    position: 'absolute',
    top: 8, 
    left: '90%', 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  distributionText: {
    fontFamily: 'Poppins_Regular',
    fontSize: 16,
    color: "#333",
  },
  smallUnit: {
    fontFamily: 'Poppins_Regular',
    fontSize: 18,  
  },
  smallerUnit: {
    fontFamily: 'Poppins_Regular',
    fontSize: 24, 
  }

});