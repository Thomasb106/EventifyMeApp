//Version Control: 1.0 Iteration 1 
//This is just a defult settings page with simple text I have not added any functionality to it yet
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
export default function Settings() {
  return (
    <View style={styles.container}>
      <Text>Settings Page</Text>
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