import React, { useState, useEffect } from "react";
import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { Ionicons } from "@expo/vector-icons";
import * as SecureStore from 'expo-secure-store';
import HomeScreen from "./screens/HomeScreens/HomeScreen";
import EventsScreen from "./screens/EventsScreens/EventsScreen";
import ProfileScreen from "./screens/ProfileScreens/ProfileScreen";
import EventNameScreen from "./screens/EventCreation/EventNameScreen";
import EventDateScreen from "./screens/EventCreation/EventDateScreen";
import EventLocationScreen from "./screens/EventCreation/EventLocationScreen";
import EventSetupScreen from "./screens/EventCreation/EventSetupScreen";
import EventOverviewScreen from "./screens/EventOverviewScreens/EventOverviewScreen" 
import EditProfileScreen from "./screens/ProfileScreens/EditProfileScreen"
import NotificationsScreen from "./screens/ProfileScreens/NotificationsScreen"
import IntroScreen from "./screens/RegisterScreens/IntroScreen"
import CreateAccountScreen from "./screens/RegisterScreens/CreateAccountScreen"
import LoginScreen from "./screens/RegisterScreens/LoginScreen";
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator(); 

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#4CAF50",
        tabBarLabelStyle: { fontFamily: 'Poppins_SemiBold' },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
          headerShown: false
        }}
      />
      <Tab.Screen
        name="Events"
        component={EventsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" color={color} size={size} />
          ),
          headerShown: false
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
          headerShown: false
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const userData = await SecureStore.getItemAsync('userData');
      setIsUserLoggedIn(userData !== null);
    };

    checkLoginStatus();
  }, []);

  let [fontsLoaded] = useFonts({
    Poppins_Regular: Poppins_400Regular,
    Poppins_SemiBold: Poppins_600SemiBold,
    Poppins_Bold: Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>

        {isUserLoggedIn ? (
            <>
            <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
            <Stack.Screen name="EventName" component={EventNameScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="EventDate" component={EventDateScreen} options={{ headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}/>
            <Stack.Screen name="EventLocation" component={EventLocationScreen} options={{ headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}/>
            <Stack.Screen name="EventSetup" component={EventSetupScreen} options={{ headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}/>

            <Stack.Screen name="EventOverview" component={EventOverviewScreen} options={{ headerShown: false}}/>

            <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}/>
            <Stack.Screen name="Notifications" component={NotificationsScreen} options={{ headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}/>
            </>
          ) : (
            <>
              <Stack.Screen name="Intro" component={IntroScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
              <Stack.Screen name="CreateAccount" component={CreateAccountScreen} options={{ headerShown: false }} />
            </>
        )}
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}