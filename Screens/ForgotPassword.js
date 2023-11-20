//Version Control: 1.0 Iteration 1 
// Import necessary hooks and components from React and React Native
import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert
} from 'react-native';
// useNavigation hook from React Navigation for navigation between screens
import { useNavigation } from '@react-navigation/native';
// Import the function to send a password reset email from Firebase authentication
import { sendPasswordResetEmail } from 'firebase/auth';
// Import the Firebase auth object from the local firebaseConfig file
import { auth } from '../firebaseConfig';

// Define the ForgotPassword functional component
export default function ForgotPassword() {
  // useState hooks to manage the email input and error state
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  // Initialize navigation for navigating between screens
  const navigation = useNavigation();

  // Function to handle password reset using Firebase auth
    /* Author: [Thomas Blennerhassett]
 * Date: [07/11/2023]
 * Source: [Code is based on code from firebases offical documentation available at https://firebase.google.com/docs/auth/web/password-auth]
 Start of code ->*/
  const handlePasswordReset = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Show an alert to inform the user to check their email
        Alert.alert('Check your email', 'A link to reset your password has been sent to your email address.');
        navigation.goBack(); // Optionally navigate back to the login screen or another relevant screen
      })
      .catch((error) => {
        // If there's an error, set the error state and show an alert
        setError(error.message);
        Alert.alert('Reset Error', error.message);
      });
  };
  // End of code <-



  // UI for the Forgot Password Screen
/* Author: [Thomas Blennerhassett]
 * Date: [08/11/2023]
 * Source: [UI code was written by Thomas Blennerhassett based on a mockup loginScreen that i slightly modiflied for a forgot password screen that 
 * I created in Canva available at https://www.canva.com]
 * Start of code ->*/
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={require('../assets/Loginheader.png')} // specify the image file path
          style={styles.logo}
        />
        <Text style={styles.headerText}>Eventify Me</Text>
      </View>
      <Text style={styles.forgottenPasswordText}>Forgotten your password?</Text>
      
      {/* Container for the email input field */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Email</Text>
        <TextInput
          placeholder="Enter your email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
      </View>
      {/* Button to trigger the password reset function */}
      <TouchableOpacity style={styles.resetButton} onPress={handlePasswordReset}>
        <Text style={styles.resetButtonText}>Reset Password</Text>
      </TouchableOpacity>

      {/* Container for the login navigation prompt */}
      <View style={styles.loginContainer}>
        <Text>Remembered your password?</Text>

        {/* TouchableOpacity to navigate the user to the Login screen */}
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
// End of code <-




// Stylesheet for all the elements involved the Forgot Password screen
/* Author: [Thomas Blennerhassett]
 * Date: [07/11/2023]
 * Source: [Style code was written by Thomas Blennerhassett]
Start of code ->*/
const styles = StyleSheet.create({
  container: { // style the container
    flex: 1, // ensure the container takes up the full screen
    backgroundColor: '#F0E7DA', // background colour for the login screen
    justifyContent: 'center', // center all elements vertically
    alignItems: 'center', // center all elements horizontally
    padding: 20, // add padding to all sides of the screen
  },
  headerContainer: {
    width: '100%', 
    position: 'absolute',
    top: 0,
    alignItems: 'center',
    justifyContent: 'center', // if you want to center the content
  },
  logo: { // style the logo
    width: 450, // set the width of the image
    height: 250, // set the height of the image
    resizeMode: 'contain', // maintain aspect ratio for the image
    
  
  },
    // Styles for the header text
    headerText: {
      fontSize: 35,
      fontWeight: 'bold',
      color: '#2D4951',
    },
    // Styles for the forgotten password prompt text
    forgottenPasswordText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#536F71',
      textAlign: 'center',
      marginBottom: 20,
    },
    // Styles for the email input container
    inputContainer: {
      width: '100%',
      marginTop: 10,
    },
    // Styles for the email text input field
    input: {
      backgroundColor: '#fff',
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#2D4951',
      marginBottom: 15,
    },
    // Styles for the email input title
    inputTitle: {
      color: '#536F71',
      fontSize: 18,
    },
    // Styles for the reset password button
    resetButton: {
      backgroundColor: '#536F71',
      paddingVertical: 15,
      borderRadius: 10,
      width: '70%',
      alignItems: 'center',
      marginBottom: 15,
      marginTop: 35,
    },
    // Styles for the text inside the reset password button
    resetButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    // Styles for the container holding the login prompt
    loginContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    // Styles for the login text, making it stand out as a link
    loginText: {
      color: '#0000ff',
      marginLeft: 5,
    },
    
    // End of code <-
  });
