//Version Control: 1.0 Iteration 1 
// Required imports from 'react-native', navigation hooks from 'react-navigation' and authentication functions from Firebase
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';

// Functional component for the SignUp screen
export default function SignUp() {
  // State hooks to manage the email, password, registration status and error message
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showRegisteredEmail, setShowRegisteredEmail] = useState(false); // State to show the registered email
  const [error, setError] = useState(''); // State to show the error message
  const navigation = useNavigation(); // Hook to access navigation object

  // Function to handle user registration using Firebase auth
   /* Author: [Thomas Blennerhassett]
 * Date: [08/11/2023]
 * Source: [Code is based on code from firebases offical documentation available at https://firebase.google.com/docs/auth/web/password-auth]
 Start of code ->*/
  const handleRegistration = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // When registration is successful, update the registered email state, show an alert and navigate to the 'Main' screen
        const user = userCredential.user;
        setShowRegisteredEmail(true);
        Alert.alert('Registration Successful!', `Welcome ${user.email}`); //Alert to show the user that the registration was successful and the new users email
        navigation.navigate('Main');
      })
      .catch((error) => {
        // If there's an error, set the error state and show an alert
        setError(error.message);
        Alert.alert('Registration Error', error.message);
      });
  };
// End of code <-



  // UI for the Signup Screen
/* Author: [Thomas Blennerhassett]
 * Date: [08/11/2023]
 * Source: [UI code was written by Thomas Blennerhassett based on a mockup loginScreen that i slightly modiflied for a sign up screen that 
 * I created in Canva available at https://www.canva.com]
 * Start of code ->*/
  return (
    <View style={styles.container}>
      {/* Header container with logo and text */}
      <View style={styles.headerContainer}>
        <Image
          source={require('../assets/Loginheader.png')} // Local image file for the logo
          style={styles.logo}
        />
        <Text style={styles.headerText}> Eventify Me</Text>
      </View>
      
      {/* Title for the account creation section */}
      <Text style={styles.CreateAccountText}>Create Account</Text>
      
      {/* Container for input fields */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Email</Text>
        <TextInput
          placeholder="Example@mail.com" // Placeholder for email input
          value={email}
          onChangeText={text => setEmail(text)} // Update the email state on text change
          style={styles.input}
        />
        <Text style={styles.inputTitle}>Password</Text>
        <TextInput
          placeholder="Password" // Placeholder for password input
          value={password}
          onChangeText={text => setPassword(text)} // Update the password state on text change
          secureTextEntry // Hide the password text
          style={styles.input}
        />
      </View>

      {/* Sign Up button that triggers the handleRegistration function */}
      <TouchableOpacity style={styles.SignUpButton} onPress={handleRegistration}>
        <Text style={styles.loginButtonText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Navigation to login for users who already have an account */}
      <View style={styles.LoginContainer}>
        <Text>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.LoginText}>Login</Text>
        </TouchableOpacity>
      </View>

      {/* Developer-only button to bypass signup and go straight to the main app */}
      <Button
        title="Go to Main App (Dev Only)"
        onPress={() => navigation.navigate('Main')}
      />
    </View>
  );
};

// Stylesheet for all the elements involved the signup screen
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

headerText: {
  fontSize: 35,
  fontWeight: 'bold',
  color: '#2D4951',
},
CreateAccountText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#536F71',
    alignItems: 'center',
  },
inputContainer: {
  width: '100%',
  marginTop: 10,
  
},
input: {
  backgroundColor: '#fff',
  paddingHorizontal: 15,
  paddingVertical: 10,
  borderRadius: 5,
  borderWidth: 1,
  borderColor: '#2D4951',
  marginBottom: 15,
  
},
inputTitle: {
  color: '#536F71',
  fontSize: 18,
  
  
},

SignUpButton: {
    backgroundColor: '#536F71', // set the background colour
    paddingVertical: 15, // add vertical padding
    borderRadius: 10, // add rounded corners
    width: '70%', // set the width
    alignItems: 'center', // center all elements horizontally
    marginBottom: 15, // add bottom margin
    marginTop: 35,
},
loginButtonText: {
  color: '#fff',
  fontSize: 16,
  fontWeight: 'bold',
},
LoginContainer: {
  flexDirection: 'row',
  alignItems: 'center',
},
LoginText: {
  color: '#0000ff',
  marginLeft: 5,
},
});



