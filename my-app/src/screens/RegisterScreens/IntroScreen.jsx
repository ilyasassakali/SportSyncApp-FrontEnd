import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const IntroScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Welcome to SportSync</Text>
                <Text style={styles.description}>
                    Create an account with us and experience the ease of organizing sports activities with friends.
                </Text>
            </View>
            
            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    style={styles.createAccountButton}
                    onPress={() => { navigation.navigate('CreateAccount') }}
                    activeOpacity={0.7}
                >
                    <Text style={styles.buttonText}>Create Account</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={() => { navigation.navigate('Login') }}
                    activeOpacity={0.7}
                >
                    <Text style={styles.loginButtonText}>Log In</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%', 
    },
    title: {
        fontSize: 24,
        fontFamily: 'Poppins_Bold',
        marginBottom: 10,
        textAlign: 'center'
    },
    description: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
        fontFamily: 'Poppins_SemiBold',
        paddingHorizontal: 20
    },
    buttonsContainer: {
        width: '100%', 
    },
    createAccountButton: {
        backgroundColor: '#4CAF50',
        padding: 12, 
        borderRadius: 10,
        marginBottom: 10
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        fontFamily: 'Poppins_SemiBold'
    },
    loginButton: {
        borderWidth: 1,
        borderColor: '#4CAF50',
        padding: 12, 
        borderRadius: 10,
    },
    loginButtonText: {
        color: '#4CAF50',
        fontSize: 18,
        textAlign: 'center',
        fontFamily: 'Poppins_SemiBold'
    }
});

export default IntroScreen;

