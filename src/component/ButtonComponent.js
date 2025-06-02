// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// const ButtonComponent = () => {
//   return (
//     <View>
//       <Text>ButtonComponent</Text>
//     </View>
//   )
// }

// export default ButtonComponent

// const styles = StyleSheet.create({})


import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';

const {height, width} = Dimensions.get("screen");

const ButtonComponent = ({ title, onPress, backgroundColor, textColor, style, children }) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: backgroundColor || '#6C63FF' }, style]}
      onPress={onPress}
    >
     {children ? children : <Text style={[styles.buttonText, { color: textColor || '#fff' }]}>
        {title}
      </Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height:height *0.07,
    width: width * 0.8,
    paddingVertical: 15,
    paddingHorizontal: 100,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ButtonComponent;