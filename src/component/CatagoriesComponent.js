import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { symptomsList } from './Constant'


const CatagoriesComponent = ({onChangeCategory}) => {
  const [selected, setSelected] = useState(0);

  const onPress = useCallback((index) => {
    setSelected(index);
    onChangeCategory && onChangeCategory(index);
  }, [])

  const RenderItem = ({name, description, index}) =>{
    return(
      <View style={{marginTop:10}}>
      <TouchableOpacity style={[styles.categoryItem, index === selected ? {backgroundColor:"#1c4aaf"} : {}]}
      onPress={() => setSelected(index)}
      >
        <Text style={{color: index === selected ? "#fff" : "#000"}}>{name}</Text>
      </TouchableOpacity>
      </View>
    )
  }
  return (
    <View>
      <FlatList 
      data={symptomsList}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      // contentContainerStyle={{gap: 10}}
      style={styles.flatList}
      renderItem={({item, index}) => <RenderItem {...item} index={index} key={index}/>}
      />
    </View>
  )
}

export default CatagoriesComponent

const styles = StyleSheet.create({
  flatList:{
    padding: 10,
  },
  categoryItem:{
    backgroundColor: "#E9E9FE",
    padding:10,
    borderRadius:9,
    alignSelf:"center",
    marginRight:20,
  }
})

