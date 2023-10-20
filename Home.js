import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react'; 

export default function Home() {
  const [message, setMessage] = useState('');  

  useEffect(() => {
    fetch('http://127.0.0.1:5000/hello')  
      .then(response => response.json())
      .then(data => setMessage(data.message))  
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <View style={styles.container}>
      <Text>Welcome to Eventify Me!</Text>
      {/* Display the message from the backend */}
      <Text>{message}</Text>  
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});