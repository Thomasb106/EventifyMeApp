// Required imports from the React Native library and other dependencies.
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, Alert, Dimensions,  TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react'; 
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth , database } from './firebaseConfig.js';
import { ref, set } from "firebase/database";

export default function Home() {
  // Initializing state variables using React's useState hook.
  const [message, setMessage] = useState('');  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [error, setError] = useState(null);
  const [showRegisteredEmail, setShowRegisteredEmail] = useState(false);

  // A Function to handle user registration using Firebases authentication.
  const handleRegistration = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUserEmail(user.email);
        setShowRegisteredEmail(true);  // <-- Set to true when registration is successful
        Alert.alert('Registration Successful!', `Welcome ${user.email}`);
      })
      .catch((error) => {
        setError(error.message);
        Alert.alert('Registration Error', error.message);
      });
  }
 // using a useEffect hook to fetch data from local python backend.

  useEffect(() => {
    fetch('http://127.0.0.1:5000/hello')  
      .then(response => response.json())
      .then(data => setMessage(data.message))  
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // State and function for handling data submission to Firebase database not the same as user authentication.
  const [userInput, setUserInput] = useState('');

  const handleDataSubmit = () => {
    if (userInput) {
      const dataRef = ref(database, 'Test/data');
      set(dataRef, userInput)
        .then(() => {
          console.log('Data saved successfully!');
          setUserInput(''); // Clear the input after saving
        })
        .catch(error => {
          console.error('Error saving data:', error); //error handling
        });
    } else {
      console.log('Input is empty. Please enter some data.'); //showing error if input is empty to console
    }
  };




  return (
    <View style={styles.container}>

        <Image 
        source={require('./assets/Image.png')} // specify the image file path
        style={styles.image} 
      />  

      <Text style={{fontSize: 25, marginBottom: 15 , marginTop: 40}}> Welcome to Eventify Me! </Text> 
   

      <Text style={{fontSize: 20 , fontWeight: 'bold' , marginBottom: 15}}>{message}</Text>  



  <TextInput 
        style={styles.TextInput} 
        maxLength={25}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
  />

  <TextInput 
        style={styles.TextInput}
        maxLength={10}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
  />

{showRegisteredEmail && <Text style={{fontSize: 18,}}>Registered Email:{userEmail}</Text>}

  <Text style={styles.errorMessage}>{error}</Text>
       
  <TouchableOpacity style={styles.button} title="Register" onPress={handleRegistration}>
  <Text style={styles.buttonText}>Register</Text>
  </TouchableOpacity>

  <TextInput 
        style={styles.TextInput}
        maxLength={10}
        placeholder="Enter data to save to database"
        value={userInput}
        onChangeText={setUserInput}
  />

  <TouchableOpacity style={styles.button} onPress={handleDataSubmit}>
  <Text style={styles.buttonText}>Save to Database</Text>
  </TouchableOpacity>



      <StatusBar style="auto" />
    </View>
  );
}



const screenHeight = Dimensions.get('window').height; // Used to get the height of the screen dynamically depending on the device used.
const topPosition = 0.01 * screenHeight; // This will be 1% from the top of the screen

// Styling for all components using a stylesheet .
const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  image: {
    width: 200, // Set the width in pixels
    height: 200, // Set the height in pixels
    resizeMode: 'center',
    position: 'absolute',
    top: topPosition,    // distance from the top of the screen used to position the image
    marginBottom: 20,
    
  }, 
  TextInput: {
    marginBottom: 15,
    height:20,
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 5,
    paddingRight: 5,
  },
  errorMessage: {
    height: 30,  // reserve a fixed height
    justifyContent: 'center',
    alignItems: 'center',
    color: 'red',
},
  button: {
    backgroundColor: '#007BFF', // A shade of blue, 
    paddingHorizontal: 20,     // Horizontal padding
    paddingVertical: 10,       // Vertical padding
    borderRadius: 20,          // Rounded corners
    alignItems: 'center',      // Center text horizontally
    justifyContent: 'center',  // Center text vertically
    marginBottom: 15,
    borderWidth: 0.5    
  },
  buttonText: {
    color: 'white',            // White text color
    fontSize: 15,              // Adjust font size as needed
    fontWeight: 'bold',        // Bold font weight
  }
});