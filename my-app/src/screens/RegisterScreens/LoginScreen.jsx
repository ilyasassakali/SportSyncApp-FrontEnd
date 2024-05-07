import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

const LoginScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Ionicons name="chevron-back-outline" size={30} color="#000" />
                </TouchableOpacity>    
            </View>
            <View style={styles.content}>
                
                <Text style={styles.sublabel}>E-mail</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder="E-mail" 
                    keyboardType="email-address"
                />
                <Text style={styles.sublabel}>Password</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder="Password" 
                    secureTextEntry={true}
                />
            </View>

            <TouchableOpacity
                style={styles.createAccountButton}
                onPress={() => navigation.navigate('Home')}
                activeOpacity={0.7}
            >
                <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>
            <Text style={styles.termsText}>
                    Forgot Your Password 
            </Text>

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
        marginBottom: 20
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'Poppins_SemiBold'
    },
    termsText: {
        fontSize: 15,
        color: '#4CAF50',
        fontFamily: 'Poppins_Regular',
    }
});

export default LoginScreen;

