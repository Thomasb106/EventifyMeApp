//Version Control: 1.0 Iteration 1 
// Importing necessary components from 'react-native' and other libraries
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, Dimensions, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react'; 
import { database } from '../firebaseConfig.js'; // Importing the configured Firebase database reference
import { ref, set } from "firebase/database"; // Firebase database methods for setting data
import { useNavigation } from '@react-navigation/native'; // Hook for navigation

// This is the main component of the app, named 'Home'
export default function Home() {
  // State hooks for managing local state
  const [message, setMessage] = useState(''); // State for storing the message from the backend
  const [userInput, setUserInput] = useState(''); // State for managing the user input
  const navigation = useNavigation(); // Hook to access navigation object



  // useEffect hook to perform side effects (like fetching data)
  /* Author: [Chat GPT-3]
 * Date: [07/11/2023]
 * Source: [I asked GPT how I could call my python backendand in my front end and it gave me the answer of useEffect hook and explained it to me]
Start of code ->*/
  useEffect(() => {
    fetch('http://127.0.0.1:5000/hello') // Fetching data from the local backend on a local host IP. They backend is being hoseted on port 5000 using Flask API
      .then(response => response.json()) // Parsing the JSON response
      .then(data => setMessage(data.message)) // Setting the message state with the fetched data
      .catch(error => console.error('Error fetching data:', error)); // Catching and logging errors if the fetch fails
  }, []); // This empty dependency array means this effect runs once after the initial render
// End of code <-


  // Function to handle the submission of data to Firebase database
  /* Author: [Thomas Blennerhassett]
 * Date: [07/11/2023]
 * Source: [Code is based on code from firebases offical documentation available at https://firebase.google.com/docs/auth/web/password-auth]
 Start of code ->*/
  const handleDataSubmit = () => {
    if (userInput) { // Check if the userInput is not empty
      const dataRef = ref(database, 'Test/data'); // Creating a reference to the database path where we want to store the data
      set(dataRef, userInput) // Using the set method to save the data
        .then(() => {
          console.log('Data saved successfully!'); // Log data save success message
          setUserInput(''); // Clear the input after saving
        })
        .catch(error => {
          console.error('Error saving data:', error); // Log any errors during saving
        });
    } else {
      console.log('Input is empty. Please enter some data.'); // Log a message if input is empty
    }
  };
// End of code <-

  return (
    <View style={styles.container}>
      {/* Image component for displaying a static image */}
      <Image 
        source={require('../assets/Image.png')} 
        style={styles.image} 
      />  

      {/* Text component for the welcome message */}
      <Text style={styles.welcomeMessage}>Welcome to Eventify Me!</Text> 

      {/* Text component for displaying the backend message */}
      <Text style={styles.backendMessage}>{message}</Text>  

      {/* TextInput component for user input */}
      <TextInput 
        style={styles.TextInput}
        placeholder="Enter data to save to database"
        value={userInput}
        onChangeText={setUserInput}
      />

      {/* TouchableOpacity component for the button */}
      <TouchableOpacity style={styles.button} onPress={handleDataSubmit}>
        <Text style={styles.buttonText}>Save to Database</Text> 
      </TouchableOpacity>

      {/* TouchableOpacity component for the Logout button */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Logout</Text> 
      </TouchableOpacity>

      {/* StatusBar component for the status bar */}
      <StatusBar style="light" /> 
    </View>
  );
}

// Retrieve the height of the screen for styling purposes
const screenHeight = Dimensions.get('window').height;
// Calculate a position from the top of the screen, here it's set to 1% of the screen height
const topPosition = 0.01 * screenHeight;

// StyleSheet object to centralize styling for components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'center',
    position: 'absolute',
    top: topPosition, // Set the top position to the calculated value
    marginBottom: 20,
  },
  welcomeMessage: {
    fontSize: 25,
    marginBottom: 15,
    marginTop: 40
  },
  backendMessage: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15
  },
  TextInput: {
    marginBottom: 15,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: '80%', // Set the width to 80% of the parent container's width
  },
  button: {
    backgroundColor: '#007BFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    borderWidth: 0.5    
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  }
});
