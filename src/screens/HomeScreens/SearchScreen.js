import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback } from 'react'
import SearchComponent from '../../component/SearchComponent';
import { useNavigation } from '@react-navigation/native';

const {height, width} = Dimensions.get("screen");
const SearchScreen = () => {

    const navigation = useNavigation();
    
    const onChange = useCallback((text) => {
        // Handle the search input change
        console.log("Search text:", text);
    }, []);
    return (

        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <SearchComponent onChange={onChange}/>
            </View>

            <View style={styles.subContainer}>
                <Text style={styles.subContainerText}>Recent Searches</Text>
                <TouchableOpacity>
                    <Text style={[styles.subContainerText, {color:"#1c4aaf", fontWeight:"600"}]}>Clear</Text>
                </TouchableOpacity>

                {/* List of Recent Searches */}


            </View>
        </View>
    )
}

export default SearchScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
    },
    searchContainer:{
        backgroundColor:"#1c4aaf",
        height: height*0.12,
        alignItems:"center",
    },
    subContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        padding:10,
    },
    subContainerText:{
        fontSize:15,
        paddingLeft:10,
        paddingRight:10,
        
    }
})