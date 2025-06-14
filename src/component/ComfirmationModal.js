import { Dimensions, Image, Modal, StyleSheet, Text, View } from 'react-native';
import React, { useCallback } from 'react';
import ButtonComponent from './ButtonComponent';
import { useNavigation } from '@react-navigation/native';

const { height, width } = Dimensions.get('screen');
const ConfirmationModal = ({ visible, onClose, modalText }) => {

  const navigation = useNavigation();

  const onPress = useCallback(() => {
    navigation.navigate("TabNavigator");
    onClose && onClose();
  }, [onClose, navigation]);

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          onClose && onClose();
        }}>
        <View style={styles.container}>
          <View style={styles.modalView}>
            <View style={styles.imageContainer}>
              <Image source={require('../assets/img/like.png')} />
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 28, paddingVertical: 10, fontWeight: '400' }}>{'Thank You !'}</Text>
              <Text style={{ fontSize: 18, color: 'gray', paddingVertical:15 }}>{'Your Appointment Successful'}</Text>
              <Text style={{ paddingVertical: 15, fontSize: 16, textAlign:"center", paddingHorizontal:15}}>{modalText}</Text>
            </View>
            <View style={{ width: '100%', bottom: 20, position: 'absolute' }}>
              <ButtonComponent
                onPress={onPress}
                title={'Done'}
                style={{ backgroundColor: "#0B3DA9", alignSelf: 'center', width: '100%' }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ConfirmationModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    height: height * 0.6,
    width: width * 0.9,
    alignItems: 'center',
    justifyContent: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: 'relative',
  },
  imageContainer: {
    backgroundColor: '#EDEDFC',
    height: 120,
    width: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  buttonWrapper: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
});
