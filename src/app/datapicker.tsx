import React, { useState } from 'react';
import { View, Button, Platform, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/AntDesign';


const MyDatePicker = () => {
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const CalendarIcon = () => <Icon name="calendar" size={16} color="#000" className="mr-4 my-auto pointer-events-none" />;
    

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showDatePicker = () => {
        setShow(true);
    };

    return (
        <View className='w-full'>
            <TouchableOpacity onPress={showDatePicker} className='border border-slate-400 h-12 w-full items-end'><CalendarIcon /></TouchableOpacity>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}
        </View>
    );
};

export default MyDatePicker;
