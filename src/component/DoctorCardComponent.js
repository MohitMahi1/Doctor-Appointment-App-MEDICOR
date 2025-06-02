import { Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { fetchSpecialities } from '../api/specialities';

const { height, width } = Dimensions.get("screen");

const DoctorCardComponent = ({
  name,
  speciality,
  image,
  horizontal,
  style,
  imgStyle,
  imgContainerStyle,
  ...props
}) => {
  const navigation = useNavigation();

  const { data } = useQuery({
    queryKey: ["specialities"],
    queryFn: fetchSpecialities,
  });

  const specialitiesObj = useMemo(() => {
    return data?.find((item) => item.id === speciality);
  }, [speciality, data]);

  return (
    <Pressable
      style={[
        styles.container,
        horizontal ? styles.fullWidthBackground : styles.notHorizontalContainer,
        style,
      ]}
      onPress={() => navigation.navigate("DoctorDetails", { doctorId: props.id })}
    >
      {horizontal ? (
        // Horizontal Layout for Appointment Screen
        <View style={[styles.horizontalRow, imgContainerStyle]}>
          {/* Text Left */}
          <View style={styles.leftContent}>
            <View style={styles.nameAndRatingRow}>
              <Text style={styles.nameText} numberOfLines={1}>{name}</Text>
              <View style={styles.ratingRow}>
                <Image source={require("../assets/img/star.png")} />
                <Text style={styles.ratingText}>{props.rating}</Text>
              </View>
            </View>

            <Text style={styles.specialityText}>{specialitiesObj?.title}</Text>
            <Text style={styles.feeText}>Fee: ₹{props?.fee}</Text>
          </View>

          {/* Image Right */}
          <Image
            source={{ uri: image }}
            style={[styles.rightImage, imgStyle]}
          />
        </View>
      ) : (
        // Default Vertical Layout
        <View style={[styles.allContent, imgContainerStyle]}>
          <Image
            source={{ uri: image }}
            style={[
              styles.images,
              horizontal ? styles.horizontalImage : styles.notHorizontalImage,
              imgStyle,
            ]}
          />

          {/* Name and Rating Row */}
          <View style={styles.nameRatingRow}>
            <Text
              style={styles.nameText}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {name}
            </Text>
            <View style={styles.ratingRow}>
              <Image source={require("../assets/img/star.png")} />
              <Text style={styles.ratingText}>{props.rating}</Text>
            </View>
          </View>

          <View style={styles.lastContent}>
            <Text style={styles.specialityText}>{specialitiesObj?.title}</Text>
            <Text style={styles.feeText}>Fee: ₹{props?.fee}</Text>
          </View>
        </View>
      )}
    </Pressable>
  );
};

export default DoctorCardComponent;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: "#ededed",
  },
  notHorizontalContainer: {
    marginBottom: 10,
    height: height * 0.32,
    width: width * 0.435,
    marginRight: 15,
  },
  fullWidthBackground: {
    width: "100%",
    backgroundColor: "#ededed",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  allContent: {
    margin: 10,
  },
  images: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  horizontalImage: {
    height: height * 0.18,
    width: width * 0.56,
  },
  notHorizontalImage: {
    height: height * 0.21,
    width: width * 0.38,
  },
  nameRatingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 5,
    marginTop: 5,
  },
  nameText: {
    fontSize: 17,
    fontWeight: "500",
    flex: 1,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
  },
  lastContent: {
    marginTop: 6,
  },
  specialityText: {
    fontSize: 14,
    marginBottom: 4,
  },
  feeText: {
    fontSize: 14,
    fontWeight: "500",
  },
  horizontalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftContent: {
    flex: 1,
    paddingRight: 10,
  },
  rightImage: {
    height: height * 0.15,
    width: width * 0.3,
    borderRadius: 10,
  },
  nameAndRatingRow: {
  flexDirection: 'row',
  justifyContent: "space-evenly",
  alignItems: 'center',
  // gap: 5,
},
});
