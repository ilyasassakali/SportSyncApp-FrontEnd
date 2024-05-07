import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

const CreateAccountScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <TextInput 
                    style={styles.input} 
                    placeholder="Name" 
                />
                <TextInput 
                    style={styles.input} 
                    placeholder="E-mail" 
                    keyboardType="email-address"
                />
                <TextInput 
                    style={styles.input} 
                    placeholder="Password" 
                    secureTextEntry={true}
                />
                <Text style={styles.termsText}>
                    By creating your account, you agree to the Terms of Service and Privacy Policy
                </Text>
            </View>

            <TouchableOpacity
                style={styles.createAccountButton}
                onPress={() => navigation.navigate('Intro')}
            >
                <Text style={styles.buttonText}>Create Account</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end', 
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
    input: {
        width: '100%',
        padding: 12,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        fontSize: 16,
        fontFamily: 'Poppins_Regular'
    },
    termsText: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
        fontFamily: 'Poppins_Regular',
        marginBottom: 20
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
    }
});

export default CreateAccountScreen;

