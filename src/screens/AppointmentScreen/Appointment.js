import {
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import React, { useCallback, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import DoctorCardComponent from '../../component/DoctorCardComponent';
import ButtonComponent from '../../component/ButtonComponent';
import AppointmentSlotComponent from '../../component/AppointmentSlotComponent';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { fetchDoctorsById } from '../../api/Doctors';
import ComfirmationModal from '../../component/ComfirmationModal';
import { createAppointment } from '../../api/Appoinment';
import { useDispatch } from 'react-redux';
import { setAppointment } from '../../store/features/AppointmentRedux';

const { height } = Dimensions.get("screen");

const Appointment = ({ route }) => {
    const navigation = useNavigation();
    const { doctorId } = route?.params;

    const { data, isError, error } = useQuery({
        queryKey: ["doctorById", doctorId],
        queryFn: () => fetchDoctorsById(doctorId),
    });

    const dispatch = useDispatch();
    const mutation = useMutation({
        mutationFn:createAppointment,
        onSuccess:(data) => {
            dispatch(setAppointment(data));
            setDisplayModal(true);
        },
        onError:(err) => {
            console.log(err);
            
        }
    })

    const [descHeight, setDescHeight] = useState(height * 0.07);
    const [appointmentDetails, setAppointmentDetails] = useState({
        patient: {
            name: "",
            phoneNumber: "",
            age: "",
            desc: ""
        },
        slot: {
            "time": "",
            "date": "",
            "reminder": ""
        },
        doctor:doctorId
    });

    const [formError, setFormError] = useState(false);
    const [isPatientDetails, setIsPatientDetails] = useState(false);
    const [displayModal, setDisplayModal] = useState(false);

    useFocusEffect(
        useCallback(() => {
            // Prevent navigation from going back to previous screen if on slot screen
            const beforeRemove = (e) => {
                if (isPatientDetails) {
                    e.preventDefault();
                    setIsPatientDetails(false); // go back to patient form instead
                }
            };

            const unsubscribe = navigation.addListener('beforeRemove', beforeRemove);

            return () => {
                unsubscribe();
            };
        }, [isPatientDetails])
    );

    const onPressNext = useCallback(() => {
        const { name, age, phoneNumber, desc } = appointmentDetails.patient;
        const { date, time } = appointmentDetails.slot;

        if (isPatientDetails) {

            // Check if date or time is missing
            if (!date || !time) {
                alert("Please select a date and time slot.");
                return;
            }
            mutation.mutate(appointmentDetails);
            // setDisplayModal(true);
        } else {
            if (
                name.trim() &&
                age.trim().length > 0 &&
                phoneNumber.trim().length === 10 &&
                desc.trim()
            ) {
                setIsPatientDetails(true);
                setFormError(false);
            } else {
                setFormError("Please fill the above fields.");
            }
        }
    }, [appointmentDetails, isPatientDetails]);


    const onChangeTextFeild = useCallback((name, value) => {
        setAppointmentDetails(prevDetails => ({
            ...prevDetails,
            patient: {
                ...prevDetails.patient,
                [name]: value
            }
        }));

        if (formError) {
            setFormError(false);
        }
    }, [formError]);

    const onChangeHandler = useCallback((name, value) => {
        setAppointmentDetails(prevDetails => ({
            ...prevDetails,
            slot: {
                ...prevDetails.slot,
                [name]: value
            }
        }))
    }, [])

    console.log("Change : ", appointmentDetails);


    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={100}
        >
            <View style={{ flex: 1 }}>
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    {!isPatientDetails && (
                        <View style={styles.container}>
                            <View style={styles.cardContainer}>
                                <Text style={styles.doctorHeading}>Doctor</Text>
                                <DoctorCardComponent {...data} horizontal style={styles.card} />
                            </View>

                            <View style={styles.afterCard}></View>

                            <View style={styles.cardContainer}>
                                <Text style={[styles.doctorHeading, { marginTop: 5 }]}>Appointment For</Text>

                                <TextInput
                                    style={styles.input}
                                    placeholder='Patient name'
                                    onChangeText={(text) => onChangeTextFeild("name", text)}
                                    value={appointmentDetails.patient.name}
                                />

                                <TextInput
                                    style={styles.input}
                                    placeholder='Contact number'
                                    keyboardType="phone-pad"
                                    maxLength={10}
                                    onChangeText={(text) => onChangeTextFeild("phoneNumber", text)}
                                    value={appointmentDetails.patient.phoneNumber}
                                />

                                <TextInput
                                    style={styles.input}
                                    placeholder='Age'
                                    keyboardType="phone-pad"
                                    maxLength={3}
                                    onChangeText={(text) => onChangeTextFeild("age", text)}
                                    value={appointmentDetails.patient.age}
                                />

                                <TextInput
                                    style={[styles.input, {
                                        height: descHeight,
                                        textAlignVertical: 'top',
                                    }]}
                                    placeholder='Description'
                                    multiline
                                    onContentSizeChange={(e) =>
                                        setDescHeight(Math.max(height * 0.07, e.nativeEvent.contentSize.height))
                                    }
                                    onChangeText={(text) => onChangeTextFeild("desc", text)}
                                    value={appointmentDetails.patient.desc}
                                />

                                {formError ? (
                                    <Text style={{ color: 'red', marginTop: 10 }}>{formError}</Text>
                                ) : null}
                            </View>
                        </View>
                    )}

                    {isPatientDetails && (
                        <AppointmentSlotComponent
                            onChangeHandler={onChangeHandler}
                        // selectedDate={appointmentDetails.slot.date}
                        // onSelectDate={handleSlotChange}
                        />
                    )}
                </ScrollView>

                <View style={styles.buttonWrapper}>
                    <ButtonComponent
                        title={isPatientDetails ? "Set Appoinment" : "Next"}
                        backgroundColor="#0B3DA9"
                        textColor="#fff"
                        style={styles.nextButton}
                        onPress={onPressNext}
                    />
                </View>
                <ComfirmationModal
                    modalText={`You booked an appointment with ${data?.name || 'Doctor'} on ${appointmentDetails?.slot?.date || 'N/A'} at ${appointmentDetails?.slot?.time || 'N/A'}.`}
                    visible={displayModal}
                    onClose={() => setDisplayModal(false)}
                />

            </View>
        </KeyboardAvoidingView>
    );
};

export default Appointment;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    doctorHeading: {
        fontSize: 20,
        fontWeight: "600",
    },
    cardContainer: {
        padding: 10,
        paddingHorizontal: 10,
    },
    card: {
        marginVertical: 20,
        backgroundColor: "#fff",
        elevation: 3,
        paddingHorizontal: 25,
    },
    afterCard: {
        backgroundColor: "#e8e6e6",
        height: height * 0.015,
        width: "100%",
        elevation: -10
    },
    input: {
        minHeight: height * 0.05,
        borderWidth: 1,
        borderColor: "#828181",
        borderRadius: 10,
        marginVertical: 15,
        marginHorizontal: 5,
        paddingHorizontal: 15,
    },
    nextButton: {
        width: '95%',
        alignSelf: "center",
    },
    buttonWrapper: {
        paddingVertical: 10,
    }
});
