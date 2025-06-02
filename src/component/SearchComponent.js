import { Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ButtonComponent from './ButtonComponent';
import { useNavigation } from '@react-navigation/native';


const{width, height} = Dimensions.get("screen");
const SearchComponent = ({onChange}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={{}}
      onPress={() => navigation.goBack()}
      >
        <Image source={require("../assets/img/back.png")} style={styles.backButton} />
      </TouchableOpacity>

      <TextInput style={styles.input} placeholder='Search doctors..' clearButtonMode="always" autoCapitalize='none' autoCorrect={false} placeholderTextColor={"#54575e"} onChangeText={onChange} />
        
    </View>
  )
}

export default SearchComponent

const styles = StyleSheet.create({
  container:{
    flexDirection:"row",
    backgroundColor:"#fff",
    borderRadius: 10,
    // margin: 10,
    marginTop:43,
    height:height*0.06,
    width:width*0.9,
    alignItems:"center"
  },
  backButton:{
    width: width*0.075,
    height: height*0.035,
    marginLeft: 8,
    resizeMode: "contain"

  },
  input:{
    // flex:1,
    width:"80%",
    paddingLeft:10,
    fontSize:16,
    color:"#000",
    fontWeight:"500"
  }
})