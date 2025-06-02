import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useQuery } from '@tanstack/react-query';
import DoctorCardComponent from '../../component/DoctorCardComponent';

const { height, width } = Dimensions.get("screen");
const Appointment = ({route}) => {

    const { doctorId } = route?.params;

    const { data } = useQuery({
        queryKey: ["doctorById", doctorId],
        queryFn: () => fetchDoctorsById(doctorId),
    })

    return (
        <View style={styles.container}>
            <Text style={styles.doctorHeading}>Appointment</Text>

            <DoctorCardComponent {...data} horizontal style={styles.cardContanier}/>
        </View>
    )
}

export default Appointment

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:10,
    },
    doctorHeading:{
        fontSize:22,
        fontWeight:"800",
        
    },
    cardContanier:{
        marginVertical:20,
        backgroundColor:"#fff",
        elevation:3,
        paddingHorizontal:20,
    }
})