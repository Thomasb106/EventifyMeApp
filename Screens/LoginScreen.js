//Version Control: 1.0 Iteration 1 
// Importing necessary modules and components
import React, { useState } from 'react'; 
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { StatusBar } from 'expo-status-bar';

// Component for the Login Screen
export default function LoginScreen() {
  // State hooks for managing email and password input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Hook for navigation
  const navigation = useNavigation();

  
  // Function to handle login using Firebase authentication
  /* Author: [Thomas Blennerhassett]
 * Date: [07/11/2023]
 * Source: [Code is based on code from firebases offical documentation available at https://firebase.google.com/docs/auth/web/password-auth]
 Start of code ->*/
  const handleLogin = () => { 
    signInWithEmailAndPassword(auth, email, password) // <- Firebase authentication logic
      .then(userCredentials => {
        const user = userCredentials.user; // <- Getting the user credentials
        console.log('Logged in with:', user.email); // <- Logging the user email to the console
        // Navigate to the Main app screen after successful login
        navigation.navigate('Main');
      })
      //showing error if login is unsuccessful
      .catch(error => alert(error.message));
  };
  // End of code <-


  // UI for the Login Screen
/* Author: [Thomas Blennerhassett]
 * Date: [07/11/2023]
 * Source: [UI code was written by Thomas Blennerhassett based on a mockup loginScreen I created in Canva available at https://www.canva.com]
 * Start of code ->*/
  return (
    <View style={styles.container}>
      {/* Header section with image and title */}
      <View style={styles.headerContainer}>
        <Image
          // Logo image for the login screen
          source={require('../assets/Loginheader.png')}
          style={styles.logo}
        />
        {/* Title for the login screen */}
        <Text style={styles.headerText}>Eventify Me</Text>
      </View>
      
      {/* Input fields for email and password */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle} >Email</Text>
        <TextInput
          placeholder="Example@mail.com"
          value={email}
          onChangeText={text => setEmail(text)} // <- Setting the email state hook
          style={styles.input}
        />
        <Text style={styles.inputTitle}>Password</Text>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)} // <- Setting the password state hook
          secureTextEntry
          style={styles.input}
        />
         {/* Forgot Password navigation */}
        <TouchableOpacity>
          <Text style={styles.forgotPasswordText} onPress={() => navigation.navigate('ForgotPassword')}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      
      {/* Login button that is calling the handleLogin function */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
      
      {/* Sign Up navigation */}
      <View style={styles.signupContainer}>
        <Text>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.signupText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      
      {/* Developer shortcut to Main App (for development use only) */}
      <Button
        title="Go to Main App (Dev Only)"
        onPress={() => navigation.navigate('Main')}
      />
      {/* Status bar styling */}
      <StatusBar style="light" /> 
    </View>
  );
};


// Stylesheet for all the elements involved the Login Screen
/* Author: [Thomas Blennerhassett]
 * Date: [07/11/2023]
 * Source: [Style code was written by Thomas Blennerhassett based on a mockup loginScreen I created in Canva]
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
headerText: { // style the header text
  fontSize: 35, // set the font size
  fontWeight: 'bold', // set the font weight
  color: '#2D4951', // set the font colour
},
inputContainer: {
  width: '100%', // ensure it spans the full width
  marginTop: 30, // add top margin to the input container
  
},
input: { // style the input fields
  backgroundColor: '#fff', // set the background colour
  paddingHorizontal: 15, // add horizontal padding
  paddingVertical: 10, // add vertical padding
  borderRadius: 5, // add rounded corners
  borderWidth: 1, // add a border
  borderColor: '#2D4951', // set the border colour
  marginBottom: 15, // add bottom margin
  
},
inputTitle: { // style the input titles
  color: '#536F71', // set the font colour
  fontSize: 18, // set the font size
  
  
},
forgotPasswordText: { // style the forgot password text
  color: '#0000ff', // set the font colour
  textAlign: 'right', // align the text to the right
  marginBottom: 20, // add bottom margin
},
loginButton: { // style the login button
  backgroundColor: '#536F71', // set the background colour
  paddingVertical: 15, // add vertical padding
  borderRadius: 10, // add rounded corners
  width: '70%', // set the width
  alignItems: 'center', // center all elements horizontally
  marginBottom: 15, // add bottom margin
},
loginButtonText: { // style the login button text
  color: '#fff', // set the font colour
  fontSize: 16, // set the font size
  fontWeight: 'bold', // set the font weight
},
signupContainer: { // style the sign up container
  flexDirection: 'row', // align the children horizontally
  alignItems: 'center', // center all elements horizontally
},
signupText: { // style the sign up text
  color: '#0000ff', // set the font colour
  marginLeft: 5, // add left margin
},
});
// End of code <-






