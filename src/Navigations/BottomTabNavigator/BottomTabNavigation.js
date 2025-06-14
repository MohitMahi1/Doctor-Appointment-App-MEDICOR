import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../../screens/HomeScreens/Home';
import AllAppoientment from '../../screens/AppointmentScreen/AllAppoientment';
import Setteings from '../../screens/Settings/Setteings';
import Profile from '../../screens/Profile/Profile';

const { height, width } = Dimensions.get("screen");
// Images of all the Bottom tab navigator
const FilledHome = require(`../../assets/img/home-filled.png`);
const HomeEmpty = require(`../../assets/img/home-empty.png`);
const AppointmentEmpty = require('../../assets/img/appointment-empty.png');
const AppointmentFilled = require('../../assets/img/appointment-filled.png');
const SettingsEmpty = require('../../assets/img/settings.png');
const SettingsFilled = require('../../assets/img/setting-filled.png');
const ProfileEmpty = require('../../assets/img/ProfileEmpty.png');
const ProfileFilled = require('../../assets/img/ProfileFilled.png');


const Tab = createBottomTabNavigator();
const BottomTabNavigation = () => {
  return (
    <Tab.Navigator initialRouteName='Home'
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          if (route.name === 'Home') {
            return (
              <Image
                style={{ height: height * 0.032, width: width * 0.065 }}
                source={focused ? FilledHome : HomeEmpty}
              />
            );
          }

          else if (route.name === 'Appoientments') {
            return (
              <Image
                style={{ height: height * 0.032, width: width * 0.065 }}
                source={focused ? AppointmentFilled : AppointmentEmpty}
              />
            );
          }

          else if (route.name === 'Settings') {
            return (
              <Image
                style={{ height: height * 0.032, width: width * 0.065 }}
                source={focused ? SettingsFilled : SettingsEmpty}
              />
            );
          }

          else {
            return (
              <Image
                style={{ height: height * 0.032, width: width * 0.065 }}
                source={focused ? ProfileFilled : ProfileEmpty}
              />
            )
          }
        },

        // tabBarLabel: () => {
        //   return null;
        // }

        headerStyle: {
          backgroundColor: '#0B3DA9',

        },
        headerTintColor: 'white',
        // headerTitleStyle: {},
        headerBackTitleVisible: false,
        tabBarStyle: {
          height: height * 0.07,
          alignItems: 'center',
          justifyContent: 'center'
        },
        tabBarIconStyle: {
          marginTop:3,
          marginBottom: 5
        },
        tabBarLabelStyle: {
          // marginBottom: 5,
          fontSize: 12
        },

      })}
    >
      <Tab.Screen name='Home' component={Home} options={{ headerShown: false }} />

      <Tab.Screen name='Appoientments' component={AllAppoientment} />

      <Tab.Screen name='Settings' component={Setteings} />

      <Tab.Screen name='Profile' component={Profile} />


    </Tab.Navigator>
  )
}

export default BottomTabNavigation

const styles = StyleSheet.create({})