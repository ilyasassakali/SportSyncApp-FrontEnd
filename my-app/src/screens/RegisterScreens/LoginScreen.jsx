import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, KeyboardAvoidingView, Platform  } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../components/AuthContext"
import * as SecureStore from 'expo-secure-store';


const LoginScreen = ({ navigation }) => {
    const { setIsUserLoggedIn } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function saveUserData(userData) {
        await SecureStore.setItemAsync('userData', JSON.stringify(userData));
    }

    const handleLogin = async () => {
        try {
            const response = await fetch('http://192.168.129.29:3000/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const jsonData = await response.json();
            if (response.status === 200) {
                await saveUserData({
                    id: jsonData.user.id, 
                    firstName: jsonData.user.firstName,
                    lastName: jsonData.user.lastName,
                    email: jsonData.user.email
                });
                setIsUserLoggedIn(true);
                Alert.alert("Succss", "You are connected !");
            } else {
                Alert.alert("Error", jsonData.message);
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "An error occured when login.");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Ionicons name="chevron-back-outline" size={30} color="#000" />
                </TouchableOpacity>    
            </View>
            <KeyboardAvoidingView 
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"} 
            >
            <View style={styles.content}>
            <Text style={styles.ssTitle}>SportSync</Text>
                <Text style={styles.sublabel}>E-mail</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder="E-mail" 
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />
                <Text style={styles.sublabel}>Password</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder="Password" 
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                />
                <Text style={styles.pw}>
                    Forgot Your Password ?
                </Text>

                <TouchableOpacity
                    style={styles.createAccountButton}
                    onPress={handleLogin}
                    activeOpacity={0.7}
                >
                    <Text style={styles.buttonText}>Log In</Text>
                </TouchableOpacity>

            </View>
            </KeyboardAvoidingView>
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
    content: {
        flex: 1, 
        justifyContent: 'center', 
        width: '100%',
    },
    ssTitle:{
        fontSize: 35,
        fontFamily: 'Poppins_Bold',
        marginBottom: 30,
        textAlign: 'center',
        color:'#4CAF50'
    },
    input: {
        padding: 10,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 10,
        fontFamily: 'Poppins_Regular'
    },
    sublabel:{
        fontSize: 16,
        fontFamily: 'Poppins_Regular',
        color: '#333'
    },
    createAccountButton: {
        backgroundColor: '#4CAF50',
        padding: 12,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
        marginTop: 20
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'Poppins_SemiBold',
    },
    pw: {
        fontSize: 14,
        color: '#4CAF50',
        fontFamily: 'Poppins_Regular',
        textAlign: 'right',
        marginTop: -15

    }
});

export default LoginScreen;

