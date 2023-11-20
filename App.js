//Version Control: 1.0 Iteration 1 
import React from 'react'; // Import React
import { createDrawerNavigator } from '@react-navigation/drawer'; // Import the drawer navigator
import { createStackNavigator } from '@react-navigation/stack'; // Import the stack navigator
import { NavigationContainer } from '@react-navigation/native'; // Import the navigation container
import Home from './Screens/Home'; // Import the home screen
import Settings from './Screens/Settings'; // Import the settings screen
import LoginScreen from './Screens/LoginScreen'; // Import the login screen
import SignUp from './Screens/SignUp'; // Import the sign up screen
import ForgotPassword from './Screens/ForgotPassword'; // Import the forgot password screen

  /* Author: [Thomas Blennerhassett]
  * Description: [This is the main app file that contains the all navigation for the app]
 * Date: [07/11/2023]
 * Source: [I created this code which uses both drawer (For main App) and stack(For login and account creation) all navigation code is
 * based on the code from the React natives official Navigation documentation available at https://reactnavigation.org/docs/getting-started/]
 Start of code ->*/

const Drawer = createDrawerNavigator();// Drawer Navigator
const Stack = createStackNavigator();// Stack Navigator

// Drawer Navigator Component
function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Home"> 
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Settings" component={Settings} /> 
    </Drawer.Navigator>
  );
}

// App Component
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Stack screen for Login */}
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />
          {/* Stack screen for Sign Up */}
          <Stack.Screen 
          name="SignUp" 
          component={SignUp} 
          options={{ headerShown: false }} 
        />
          {/* Stack screen for Forgot Password */}
          <Stack.Screen 
          name="ForgotPassword"
          component={ForgotPassword} 
          options={{ headerShown: false }} 
        />
        {/* Stack screen for Main App with Drawer Navigation */}
        <Stack.Screen 
          name="Main" 
          component={DrawerNavigator} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
// End of code <-
