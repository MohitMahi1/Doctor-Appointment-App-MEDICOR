import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useMemo } from 'react'
import Header from '../../component/Header'
import CatagoriesComponent from '../../component/CatagoriesComponent'
import SectionHeaderComponent from '../../component/SectionHeaderComponent'
import DoctorListComponent from '../../component/DoctorListComponent'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import { fetchSpecialities } from '../../api/specialities'
import dayjs from 'dayjs'
import { fakeBaseQuery } from '@reduxjs/toolkit/query'

const { height, width } = Dimensions.get("screen")

const Home = ({ navigation }) => {
  const appointments = useSelector((state) => state.appointment.appointments);
  console.log("Appoinments", appointments);

  const { data, isError, error } = useQuery({
    queryKey: ["doctorById", appointments[0]?.doctor],
    queryFn: () => fetchDoctorsById(doctorId),
  });

   const {data:specialityData} = useQuery({
      queryKey:['specialities'],
      queryFn:fetchSpecialities
    });

  const specialityObj = useMemo(() => {
    return specialityData?.find((item) => item?.id === data?.speciality) ?? {};
  }, [specialityData, data]);

  return (
    <ScrollView style={styles.mainContainer} showsVerticalScrollIndicator={false}>

      <Header />

      <CatagoriesComponent />

      {appointments.length > 0 &&
        <View>
          <SectionHeaderComponent title={"Appointments"} onPress={() => {
            navigation.navigate("TabNavigator", {screen: "Appoientments"})
          }}/>
          <TouchableOpacity style={styles.bookingInfoContainer}>
            <View style={styles.doctorInfo}>
              <Image source={{ uri: data?.image }} style={styles.doctorImage} />
              <View style={{ paddingHorizontal: 10, marginTop:20, }}>
                <Text style={styles.cardText}>{data?.name}</Text>
                <Text style={styles.cardText}>{specialityObj?.title}</Text>
              </View>
            </View>

            <View style={{flexDirection:"row", justifyContent:"space-between", marginTop:10}}>
              <View style={{flexWrap:"wrap", flexDirection:"row"}}>
                <Image source={require("../../assets/img/calendar.png")} style={styles.calenderImg}/>
                <Text style={{color:'white',paddingHorizontal:10, marginTop:5}}>{dayjs(appointments[0]?.slot?.date).format("DD MMM")}</Text>
              </View>

              <View style={{flexWrap:"wrap", flexDirection:"row"}}>
                <Image source={require("../../assets/img/clock.png")} style={styles.calenderImg}/>
                <Text style={{color:'white',paddingHorizontal:10, marginTop:5}}>{appointments[0]?.slot?.time?.split(":")[0]>12 ? appointments[0]?.slot?.time + ' PM' : appointments[0]?.slot?.time + ' AM'}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      }
      <SectionHeaderComponent title={"Top Doctors"} onPress={() => navigation.navigate("DoctorListComponent")} />

      <DoctorListComponent horizontal />

    </ScrollView>
  )
}

export default Home

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white"
  },

  bookingInfoContainer: {
    backgroundColor: "#0B3DA9",
    height: height * 0.24,
    width: "95.5%",
    margin: 10,
    borderRadius: 15,
  },
   doctorImage:{
    margin:10,
    height: height*0.17,
    width: width*0.35,
    borderRadius:10,
  },
    cardText:{
    color:'white',
    fontSize:16,
    paddingVertical:10
  },
  doctorInfo:{
    flexDirection:"row",
  },
  calenderImg:{
    marginLeft:10,
    height: height*0.026,
    width: width * 0.06,
  }
})