import { Dimensions, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import dayjs from 'dayjs';
import { Calendar } from 'react-native-calendars';
import SectionHeaderComponent from './SectionHeaderComponent';
import SlotRender from './SlotRender';

const { height } = Dimensions.get("screen");

const timeSlots = Array.from({ length: 8 }, (_, i) => ({
    time: `${10 + i}:00 ${10 + i >= 12 ? "PM" : "AM"}`,
    value: `${10 + i}:00`,
}))

const reminderSlot = [
    {
        title: '10 min',
        value: '10'
    },
    {
        title: '15 min',
        value: '15'
    },
    {
        title: '30 min',
        value: '30'
    }
]

const AppointmentSlotComponent = ({ onChangeHandler }) => {
    const today = dayjs().format("YYYY-MM-DD");
    const maxDate = dayjs().add(14, "day").format("YYYY-MM-DD");

    const [selectedDate, setSelectDate] = useState(null)
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [selectedRemindTime, setSeelectedRemindTime] = useState(null);

    const onChangeDate = useCallback((day) => {
        setSelectDate(day.dateString);
        onChangeHandler && onChangeHandler("date", day.dateString)
    }, [onChangeHandler]);

    const onChangeSlot = useCallback((index) => {
        setSelectedSlot(index);
        onChangeHandler && onChangeHandler('time', timeSlots[index].value);
    }, [onChangeHandler]);

    const onChangeReminder = useCallback((index) => {
        setSeelectedRemindTime(index);
        onChangeHandler && onChangeHandler('reminder', reminderSlot[index].value);
    }, [onChangeHandler]);

    return (
        <ScrollView style={styles.container}>
            {/* <Text style={styles.heading}>Select Appointment Date</Text> */}
            <Calendar
                minDate={today}
                maxDate={maxDate}
                onDayPress={onChangeDate}
                markedDates={{
                    [selectedDate]: {
                        selected: true,
                        disableTouchEvent: true,
                        selectedDotColor: '#0B3DA9',
                    }
                }}
                style={styles.calendar}
                theme={{
                    backgroundColor: '#ffffff',
                    selectedDayBackgroundColor: "#0B3DA9",
                    selectedDayTextColor: '#ffffff',
                    arrowColor: "#0B3DA9",
                }}
            />




            <SectionHeaderComponent title={"Available Time Slots"} />
            {/* Time slots */}
            <View>
                <FlatList
                    data={timeSlots}
                    keyExtractor={(item, i) => i.toString()}
                    renderItem={({ item, index }) =>
                        <SlotRender
                            onChange={() => onChangeSlot(index)}
                            selected={selectedSlot}
                            name={item.time}
                            description={item.value}
                            key={index}
                            index={index}
                        />
                    }
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{ paddingVertical: 10, paddingHorizontal: 10 }}
                />
            </View>

            <Text style={{ padding: 10, fontSize: 15, fontWeight: "600" }}>{"Reminder me before"}</Text>
            <View style={styles.timigContainer}>
                {reminderSlot.map((item, i) => (
                    <SlotRender
                        onChange={() => onChangeReminder(i)}
                        selected={selectedRemindTime}
                        name={item.title}
                        description={item.value}
                        key={i}
                        index={i}
                    />
                ))}
            </View>

        </ScrollView>
    );
};

export default AppointmentSlotComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingHorizontal: 10,
        paddingTop: 10,
    },
    heading: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10,
    },
    calendar: {
        elevation: 5,
        height: height * 0.35,
    },
    timeSlots: {
        margin: 10
    },
    timeSlotsText: {
        fontSize: 20,
        fontWeight: "700",

    },
    timigContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        // justifyContent:"space-between",
        gap: 8,
        padding: 10
    }
});
