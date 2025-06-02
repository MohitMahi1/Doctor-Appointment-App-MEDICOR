import { Dimensions, Image, ImageBackground, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import StatusBarComponent from './StatusBarComponent';
import ButtonComponent from './ButtonComponent';
import SearchComponent from './SearchComponent';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get("screen");
const Header = () => {

    const {navigate} = useNavigation();

    return (
        <>
            <ImageBackground
                source={require("../assets/img/splash.png")}
                style={{ height: height * 0.24 }}
            >
                <View style={styles.profile}>
                    <View style={{flexDirection:"row"}}>
                        <Image
                            source={require("../assets/img/avatar.png")}
                            style={styles.avatar}
                        />
                        <View style={styles.bio}>
                            <Text style={styles.bioTxt}>Hello.!!, Welcome</Text>
                            <Text style={[styles.bioTxt, {fontSize:20}]}>Username</Text>
                        </View>
                    </View>
                    <View style={styles.bellIcon}>
                        <TouchableOpacity >
                            <Image source={require("../assets/img/icon.png")}/>
                        </TouchableOpacity>

                    </View>
                </View>

                {/* Search Bar */}
                <View style={{justifyContent:"center", alignItems:"center"}}>
                    <TouchableOpacity style={styles.searchBar}
                    onPress={() => navigate("SearchScreen")}
                    >
                        <Image source={require("../assets/img/search.png")} style={{marginLeft:10}}/>
                        <Text style={styles.searchText}>{"Search doctors.."}</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </>
    )
}

export default Header

const styles = StyleSheet.create({
    profile: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        margin: 10,
        padding: 20
    },
    avatar: {
        marginTop: 20,
        width: width * 0.12,
        height: width * 0.12,
        borderRadius: width * 0.07,
        borderWidth: 2,
        borderColor: "#fff",
    },
    bio: {
        flexDirection: "column",
        paddingLeft: 10,
    },
    bioTxt:{
        color:"white",
        fontSize:18,
        fontWeight:"600",
        marginTop:10,
        paddingTop:5,
        marginLeft:10

    },
    bellIcon:{
        // alignSelf:"center",
    },
    searchBar:{
        marginTop:10,
        flexDirection:"row",
        alignItems:"center",
        borderWidth:1,
        borderColor:"#B1B1B1",
        height:height * 0.065,
        width:width * 0.9,
        borderRadius:15,
    },
    searchText:{
        fontSize:16,
        color:"#B1B1B1",
        marginLeft:10,
        fontWeight:"500",
    }
    
})
