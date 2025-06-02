import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../../component/Header'
import CatagoriesComponent from '../../component/CatagoriesComponent'
import SectionHeaderComponent from '../../component/SectionHeaderComponent'
import DoctorListComponent from '../../component/DoctorListComponent'
import { useNavigation } from '@react-navigation/native'


const Home = ({navigation}) => {

  return (
    <View style={styles.mainContainer}>

        <Header />

        <CatagoriesComponent />

        <SectionHeaderComponent title={"Top Doctors"} onPress={() => navigation.navigate("DoctorListComponent") }/>

        <DoctorListComponent horizontal/>

    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        backgroundColor:"white"
    }
})