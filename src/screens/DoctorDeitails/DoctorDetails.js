import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { fetchDoctorsById } from '../../api/Doctors';
import DoctorCardComponent from '../../component/DoctorCardComponent';
import { metricsDoctor } from './DoctorDetailsConstant';
import ButtonComponent from '../../component/ButtonComponent';
import { useNavigation } from '@react-navigation/native';

const { height, width } = Dimensions.get("screen");
const DoctorDetails = ({ route }) => {

  const navigation = useNavigation();


  const { doctorId } = route?.params;

  const { data } = useQuery({
    queryKey: ["doctorById", doctorId],
    queryFn: () => fetchDoctorsById(doctorId),
  })
  return (
    <View style={{flex:1}}>
      <ScrollView style={styles.container}>
        <View style={styles.subContainer}>
          <DoctorCardComponent {...data} style={styles.doctorCard} imgStyle={styles.imgStyle} />
        </View>

        <View style={styles.lableOfDoc}>
          {metricsDoctor.map((item, i) => (
            <View key={i} style={styles.lableOfDocIn}>
              <Image source={item.icon} style={styles.lableOfDocInImage} />
              <Text style={styles.lableOfDocInLabel}>{item.label}</Text>
              <Text style={styles.lableOfDocInLabel}>{item.title}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.aboutMeText}>{"About Me :"}</Text>
        <Text style={styles.aboutMe}>{"Dr. Carly Angle is the top most immunogists specialist in Crist Hospital in London, UK. Read More .... "}</Text>

      </ScrollView>

      <View style={styles.appointmentButtonContainer}>
        <ButtonComponent
            title="Book an Appointment"
            
            backgroundColor="#0B3DA9"
            textColor="#fff"
            style={styles.appointmentButton}
            onPress={() => navigation.navigate("Appointment", {doctorId:doctorId})}
          />
      </View>
    </View>
  )
}

export default DoctorDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    paddingLeft: 3
  },
  subContainer: {
    marginTop: 10,
    marginLeft: 12,
    // marginRight:10,
    justifyContent: "center"
  },

  doctorCard: {
    width: width * 0.965,
    height: height * 0.55,
    backgroundColor: "#fff", // required for shadow to be visible
    alignSelf: "center",
    borderRadius: 10,

    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,

    // Shadow for Android
    elevation: 5,
  },
  imgStyle: {
    width: width * 0.92,
    height: height * 0.4,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  lableOfDoc: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },
  lableOfDocIn: {

    margin: 20,
    alignItems: "center"
  },
  lableOfDocInImage: {
    // backgroundColor:"#EDEDFC",
    height: height * 0.035,
    width: width * 0.08
  },
  lableOfDocInLabel: {
    marginTop: 5,
    fontSize: 13,
    fontWeight: "800",
  },

  aboutMeText: {
    fontSize: 20,
    fontWeight: "500",
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  aboutMe: {
    paddingLeft: 10,
    lineHeight: 20
  },
  appointmentButtonContainer: {
    position: "absolute",
    bottom: 0,
    width:width,

  },
  appointmentButton: {
    alignSelf:"center",
    alignItems: 'center',
    marginTop:5,
    marginVertical:20,
    width: '90%',
    paddingHorizontal: 0,
    
  },

})