import React, { useCallback, useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import ButtonComponent from '../../component/ButtonComponent';

const { width, height } = Dimensions.get('screen');
const Login = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  // Handle phone number input change
  const handlePhoneNumberChange = (text) => {
    // Allow only digits (remove any non-digit characters)
    const cleanedText = text.replace(/[^0-9]/g, '');

    // Enforce 10-digit limit (already handled by maxLength, but adding for safety)
    if (cleanedText.length <= 10) {
      setPhoneNumber(cleanedText);
      console.log('Phone Number:', cleanedText);
    }
  };

  const onPressLogin = useCallback(() => {
    if(phoneNumber?.length === 10){
      console.log('Login with phone number:', `+91${phoneNumber}`);
      navigation.navigate('OtpVarification', {phoneNumber:phoneNumber}); // Navigate to OTP screen after login
    }
  }, [phoneNumber])

  return (
    <>
      <View style={styles.container}>
        {/* App Logo */}
        <Image
          source={require('../../assets/img/AppLogo.png')} // Replace with your actual logo path
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Content Container with Border Radius and Absolute Position */}
        <View style={styles.contentContainer}>
          {/* Title */}
          <Text style={styles.title}>Login to Your Account</Text>

          {/* Phone Number Input */}
          <Text style={styles.label}>Phone number</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.countryCode}>{"+91"}</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your phone number"
              placeholderTextColor="#666"
              keyboardType="numeric"
              value={phoneNumber}
              onChangeText={handlePhoneNumberChange}
              maxLength={10}
            />
          </View>

          {/* Sign Up Link */}
          {/* <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.signupLink}>Sign Up</Text>
            </TouchableOpacity>
          </View> */}

          {/* Login Button */}
          <ButtonComponent
            title="Login with Phone Number"
            onPress={onPressLogin}
            backgroundColor="#0B3DA9"
            textColor="#fff"
            style={styles.loginButton}
          />

          <ButtonComponent
            // title="Login with Google"
            onPress={() => {
              // console.log('Login with phone number:', `+91${phoneNumber}`);

            }}
            backgroundColor="#fff"
            textColor="#fff"
            style={styles.GoogleButton}
          >
            <Image source={require("../../assets/img/google_icon.png")} style={{ width: width * 0.065, height: height * 0.035, marginRight: 12 }} />
            <Text style={{ color: '#000', fontSize: 20, fontWeight: "bold" }}>Login with Google</Text>
          </ButtonComponent>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B3DA9",
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: width * 0.6,
    height: height * 0.25,
    marginTop: 50,
  },
  contentContainer: {
    position: 'absolute',
    top: 300,
    left: 2,
    right: 2,
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: 'center',
  },
  title: {
    marginTop: 10,
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1A1A3D',
    marginBottom: 20,
  },
  label: {
    fontSize: 19,
    color: '#1A1A3D',
    fontWeight: '600',
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    marginBottom: 20,
  },
  countryCode: {
    fontSize: 16,
    color: '#1A1A3D',
    paddingHorizontal: 15,
    borderRightWidth: 1,
    borderRightColor: '#D3D3D3',
    height: '100%',
    textAlignVertical: 'center',
    lineHeight: 50,
  },
  input: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#1A1A3D',
  },
  signupContainer: {
    marginTop: 20,
    flexDirection: 'row',
    marginBottom: 30,
  },
  signupText: {
    fontSize: 16,
    color: '#666',
  },
  signupLink: {
    fontSize: 16,
    color: '#6C63FF',
    fontWeight: 'bold',
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
    paddingHorizontal: 0,
  },
  GoogleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
    paddingHorizontal: 0,
    borderColor: '#0005',
    borderWidth: 1,
  }
});

export default Login;