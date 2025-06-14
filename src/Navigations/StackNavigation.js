import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import Onboarding from '../screens/OnBoardingScreensFlow/Onboarding'
import Login from '../screens/LoginScreen.js/Login'
import OtpVarification from '../screens/LoginScreen.js/OtpVarification'
import Home from '../screens/HomeScreens/Home'
import SearchScreen from '../screens/HomeScreens/SearchScreen'
import DoctorListComponent from '../component/DoctorListComponent'
import DoctorDetails from '../screens/DoctorDeitails/DoctorDetails'
import Appointment from '../screens/AppointmentScreen/Appointment'
import BottomTabNavigation from './BottomTabNavigator/BottomTabNavigation'


const Stack = createNativeStackNavigator();
const StackNavigation = () => {
    return (
        <NavigationContainer >
            <Stack.Navigator>
                <Stack.Screen name="Onboarding" component={Onboarding} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="OtpVarification" component={OtpVarification} options={{title: "OTP Verification"}} />
                <Stack.Screen name='TabNavigator' component={BottomTabNavigation} options={{ headerShown: false }} />
                <Stack.Screen name='SearchScreen' component={SearchScreen} options={{headerShown: false}} />
                <Stack.Screen name='DoctorListComponent' component={DoctorListComponent} options={{title:"Doctor List"}} />
                <Stack.Screen name='DoctorDetails' component={DoctorDetails} options={{title:"Doctor Details"}} />
                <Stack.Screen name='Appointment' component={Appointment} options={{title:"Book an Appointment"}} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigation

const styles = StyleSheet.create({})