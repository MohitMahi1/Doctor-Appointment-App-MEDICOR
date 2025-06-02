import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const SectionHeaderComponent = ({ title, onPress }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.textTitle}>{title}</Text>

            <TouchableOpacity 
            onPress={onPress}
            >
                <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>

        </View>
    )
}

export default SectionHeaderComponent

const styles = StyleSheet.create({
    container: {
        // marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
    },
    textTitle: {
        fontSize: 18,
        fontWeight: "bold",

    },
    seeAllText: {
        margin: 5, 
        color: "#1c4aaf",
        fontWeight: "500",
    }
})