import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useState } from 'react'

const SlotRender = ({ name, description, index, onChange, selected }) => {
    // const [selected, setSelected] = useState(0);

    const onPress = useCallback(() => {
        onChange && onChange(index);
    }, [index])
    return (
        <View style={{ marginTop: 10 }}>
            <TouchableOpacity style={[styles.container, index === selected ? { backgroundColor: "#1c4aaf" } : {}]}
                onPress={onPress}
            >
                <Text style={{ color: index === selected ? "#fff" : "#000" }}>{name}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SlotRender

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#E9E9FE",
        padding: 10,
        borderRadius: 9,
        alignSelf: "center",
        marginRight: 20,
    }
})