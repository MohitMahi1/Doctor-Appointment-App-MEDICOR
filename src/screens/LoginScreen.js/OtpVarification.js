import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { use, useCallback, useEffect } from 'react'
import { OtpInput } from 'react-native-otp-entry'
import StatusBarComponent from '../../component/StatusBarComponent';
import ButtonComponent from '../../component/ButtonComponent';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('screen'); // Get screen dimensions for responsive design
const OtpVarification = ({ route }) => {
  const { phoneNumber } = route?.params; // Get phone number from route params
  const [counter, setCounter] = React.useState(60); // State for countdown timer
  const {navigate} = useNavigation();

  const countdown = useCallback(() => {
    if (counter > 0) {
      setCounter(prevCounter => prevCounter - 1); // Decrease counter by 1
    }
  }, [])

  useEffect(() => {
    const timer = setInterval(countdown, 1000); // Start countdown every second
    return () => clearInterval(timer); // Clear interval on unmount
  }, [counter]);
  // Function to handle text change in OtpInput
  const onChangeText = useCallback((text) => {

  }, [])

  // Function to handle otp filled in OtpInput
  const onOtpFilled = useCallback((text) => {
    console.log('OTP Filled:', text);
    navigate("TabNavigator"); // Navigate to Home screen after OTP is filled
  }, [])
  return (
    <View style={styles.container}>
      <StatusBarComponent />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{"We've sent a verification code to"}</Text>
        <Text style={styles.subtitle}>+91 {phoneNumber}</Text>
      </View>

      <View style={styles.otpContainer}>
        <OtpInput numberOfDigits={6}
          onTextChange={onChangeText}
          onFilled={onOtpFilled}
        />
      </View>

      {
        counter > 0 &&
        <Text style={{ alignSelf: "center", fontSize: 19, marginTop: 35 }}>Resend OTP in {counter} s</Text>
      }

      {
        counter <= 0 &&
        <ButtonComponent style={styles.buttonComp}
          onPress={() => setCounter(10)}>
          <Text style={{ fontSize: 19, color:"#0B3DA9", fontWeight:"bold" }}>Resend OTP</Text>
        </ButtonComponent>
      }
    </View>
  )
}

export default OtpVarification

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    marginTop: 50,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',

  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  }, subtitle: {
    fontSize: 18,
    textAlign: 'center',
    color: '#666',
  },
  otpContainer: {
    marginTop: 50,
    paddingHorizontal: 20,

  },
  buttonComp: { 
    height: height * 0.05, 
    width: width * 0.35, 
    alignSelf: "center", 
    marginTop: 20, 
    backgroundColor: "#fff", 
    paddingHorizontal: 20,
    paddingVertical: 10,
  }
})