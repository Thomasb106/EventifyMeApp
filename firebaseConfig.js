//Version Control: 1.0 Iteration 1 
// Importing necessary functions from Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence, signInWithEmailAndPassword} from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase } from "firebase/database";



// Eventify Me's Firebase configuration 
   /* Author: [Eventify Me's Firebase configuration]
 * Date: [26/10/2023]
 * Source: [Code is copyed from firebase after firebase automatically genarated Evnetify Me's Firebase configuration when I created the project on firebase]
 Start of code ->*/
const firebaseConfig = {
  apiKey: "AIzaSyByy4DVT8hpfKbza6xYM4jAFccxexUrVW4",
  authDomain: "eventifyme-5f118.firebaseapp.com",
  projectId: "eventifyme-5f118",
  storageBucket: "eventifyme-5f118.appspot.com",
  messagingSenderId: "625186804632",
  appId: "1:625186804632:web:cf42ed98d9cdb0bb8e11ed",
  measurementId: "G-CRNBBW1NY4",
  databaseURL: "https://eventifyme-5f118-default-rtdb.europe-west1.firebasedatabase.app/",
};
// Initializing the Firebase application with the provided configuration
const app = initializeApp(firebaseConfig);
// End of code <-


// Get the authentication instance for the default app
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});



// Get the database instance for the default app
const database = getDatabase(app);


// Export the 'app', and 'auth' and 'database' to be used in other parts of the application
export { app, auth, database, };