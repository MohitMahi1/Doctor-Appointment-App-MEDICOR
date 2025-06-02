import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchDoctors } from '../api/Doctors'
import DoctorCardComponent from './DoctorCardComponent'

const DoctorListComponent = ({horizontal}) => {
    const {data, isLoading, error} = useQuery({
        queryKey:["doctors"],
        queryFn:fetchDoctors,
    })
    console.log("data", data);
  return (
    <View style={styles.container}>

        <FlatList 
        data={data}
        showsHorizontalScrollIndicator={false}
        horizontal={horizontal}
        style={styles.flatListContainer}
        numColumns={!horizontal && 2}
        columnWrapperStyle={!horizontal && {justifyContent:"space-between", gap: 10}}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => <DoctorCardComponent key={item.id} {...item}/>}
        />
      
    </View>
  )
}

export default DoctorListComponent

const styles = StyleSheet.create({
    container:{
      // marginTop:5,
    },
    flatListContainer:{
      padding:10,
    }
})