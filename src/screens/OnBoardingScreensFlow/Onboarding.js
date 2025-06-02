import React, { useState, useRef } from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import ButtonComponent from '../../component/ButtonComponent';
import StatusBarComponent from '../../component/StatusBarComponent';

const { width, height } = Dimensions.get('screen');

const Onboarding = ({ navigation }) => {
  // State to track the current slide
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

 

  // Array of slides with images and text content
  const slides = [
    {
      id: '1',
      image: require('../../assets/img/doctor.png'),
      title: 'Discover Top Doctors',
      titleHighlight: 'Near You',
      description: 'Easily find the best doctors in your area with our smart search technology.',
    },
    {
      id: '2',
      image: require('../../assets/img/doctor.png'),
      title: 'Book Appointments',
      titleHighlight: 'Effortlessly',
      description: 'Schedule appointments with your preferred doctors in just a few taps.',
    },
    {
      id: '3',
      image: require('../../assets/img/doctor.png'),
      title: 'Get Started',
      titleHighlight: 'Today',
      description: 'Join now and take the first step towards better healthcare access.',
    },
  ];

  // Handle scroll to update the current index
  const onViewRef = React.useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  });
  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 });

  // Render each slide
  const renderSlide = ({ item }) => (
    
    <ImageBackground source={require('../../assets/img/splash.png')} style={styles.backgroundImage}>
      {/* Skip Button (not shown on the last slide) */}
      {item.id !== '3' && (
        <TouchableOpacity
          style={styles.skipButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      )}
      <View style={styles.imageContainer}>
        <Image source={item.image} resizeMode="contain" style={styles.image} />
      </View>
    </ImageBackground>
  );

  // Get the current slide's text content
  const currentSlide = slides[currentIndex];

  return (
    <View style={{ flex: 1 }}>

       <StatusBarComponent />
       
      {/* Swipeable Image Section */}
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderSlide}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
      />

      {/* Bottom Container */}
      <View style={styles.bottomContainer}>
        {/* Title and Description */}
        <Text style={styles.title}>{currentSlide.title}</Text>
        <Text style={styles.titleHighlight}>{currentSlide.titleHighlight}</Text>
        <Text style={styles.description}>{currentSlide.description}</Text>

        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          <View style={currentIndex === 0 ? styles.progressDotActive : styles.progressDot} />
          <View style={currentIndex === 1 ? styles.progressDotActive : styles.progressDot} />
          <View style={currentIndex === 2 ? styles.progressDotActive : styles.progressDot} />
        </View>

        {/* Next/Login Button */}
        <ButtonComponent
      
          title={currentIndex === 2 ? "Get Started" : 'Next'}
          onPress={() => {
            if (currentIndex === 2) {
              navigation.navigate('Login'); // Navigate to Login screen on last slide
            } else {
              flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
            }
          }}
          style={{ marginTop: 20 }}
          backgroundColor="#0B3DA9"
          textColor="#fff"
        />
      </View>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  backgroundImage: {
    width: width,
    flex: 1,
    justifyContent: 'center',
  },
  skipButton: {
    position: 'absolute',
    top: height*0.08,
    right: width*0.05,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  skipText: {
    color: '#000',
    fontSize: 16,
  },
  imageContainer: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 120,
  },
  image: {
    width: width*0.8,
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A3D',
    textAlign: 'center',
  },
  titleHighlight: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6C63FF',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginVertical: 20,
    lineHeight: 24,
  },
  progressContainer: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  progressDotActive: {
    width: 20,
    height: 8,
    backgroundColor: '#6C63FF',
    borderRadius: 4,
    marginHorizontal: 5,
  },
  progressDot: {
    width: 8,
    height: 8,
    backgroundColor: '#D3D3D3',
    borderRadius: 4,
    marginHorizontal: 5,
  }
});