import React, { useEffect, useState } from "react"
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Button, Platform } from "react-native"
import { Link } from "expo-router";
import Icon from 'react-native-vector-icons/AntDesign';
import * as DocumentPicker from 'expo-document-picker';
import DateTimePicker from '@react-native-community/datetimepicker';


export default function NewListing() {
    const [textArea, setTextArea] = useState('');
    const [interest, setInterest] = useState('select');
    const [networkChoose, setNetworkChoose] = useState('');
    const [selectMenuOpen, setSelectMenuOpen] = useState(false);
    const [file, setFile] = React.useState(null);
    const [calendarOpen, setCalendarOpen] = useState(false);
    const [viewYear, setViewYear] = useState(true);
    const [viewMonth, setViewMonth] = useState(false);
    const [viewDay, setViewDay] = useState(false);
    const anoAtual = new Date().getFullYear();
    // let daysMonth: number[] = [];

    const [year, setYear] = useState(anoAtual);
    const [month, setMonth] = useState(1);
    const [day, setDay] = useState(1);
    const [daysMonthSelected, setDaysMounthSelected] = useState([]);
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);


    const CalendarIcon = () => <Icon name="calendar" size={16} color="#000" className="" />;
    const ArrowUpIcon = () => <Icon name="arrowup" size={16} color="#fff" className="" />;
    const ArrowDownIcon = () => <Icon name="arrowdown" size={16} color="#fff" className="" />;
    const CheckIcon = () => <Icon name="check" size={16} color="#fff" className="" />;

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    

    const meses = [
        {
            name: "Jan",
            number: 1,
            nDays: 31
        },
        {
            name: "Feb",
            number: 2,
            nDays: 28
        },
        {
            name: "Mar",
            number: 3,
            nDays: 31
        },
        {
            name: "Apr",
            number: 4,
            nDays: 30
        },
        {
            name: "May",
            number: 5,
            nDays: 31
        },
        {
            name: "Jun",
            number: 6,
            nDays: 30
        },
        {
            name: "Jul",
            number: 7,
            nDays: 31
        },
        {
            name: "Aug",
            number: 8,
            nDays: 31
        },
        {
            name: "Sept",
            number: 9,
            nDays: 30
        },
        {
            name: "Oct",
            number: 10,
            nDays: 31
        },
        {
            name: "Nov",
            number: 11,
            nDays: 30,
        },
        {
            name: "Dec",
            number: 12,
            nDays: 31,
        },
    ]

    const daysMonth = new Array(12).fill(null).map(() => []);

    meses.forEach((month, monthIndex) => {
        for (let day = 1; day <= month.nDays; day++) {
            daysMonth[monthIndex].push(day);
        }
    });

    useEffect(() => {
        setDaysMounthSelected(daysMonth[month - 1])
    }, [month])



    const BackIcon = () => <Icon name="arrowleft" size={16} color="#000" className="ml-2" />;
    const CaretDownIcon = () => <Icon name="caretdown" size={16} color="#000" className="my-auto ml-auto pointer-events-none" />;
    const UploadIcon = () => <Icon name="upload" size={16} color="#000" className="-ml-8 my-auto" />;


    async function selectPDF() {
        let result = await DocumentPicker.getDocumentAsync({
            type: 'application/pdf',
            // Can set other types
        });
    }

    const types = [
        "Smart Contract",
        "teste 1",
        "teste 2",
        ""
    ]
    const dateArr = String(date).split(' ');
    const dataTratada = dateArr[0] +'/'+ dateArr[1] + '/' + dateArr[2]
    return (
        <ScrollView>
            <View className={`${selectMenuOpen ? 'absolute' : 'hidden'} h-full w-full z-10`}>
                <TouchableOpacity className='h-1/2' onPress={() => setSelectMenuOpen(!selectMenuOpen)}></TouchableOpacity>
                <ScrollView className='bg-slate-900 mt-auto h-1/2 rounded-t-3xl p-8'>
                    {types.map((type, index) =>
                        <TouchableOpacity key={index} className='items-center mb-4' onPress={() => { setSelectMenuOpen(!selectMenuOpen), setInterest(type) }}>
                            <Text className='text-white text-2xl mb-1'>{type}</Text>
                        </TouchableOpacity>
                    )}
                </ScrollView>
            </View>
            <View className="px-8 mt-10">
                <Link href={'/companyprofile'} className="flex flex-row mt-2">
                    <BackIcon />
                    <Text className="ml-1">Back</Text>
                </Link>
                <Text className="my-6 text-xl">Something big is cooking</Text>
                <Text className="mb-8 text-[36px]">Setup your bounty</Text>
                <Text className="text-slate-500 mb-4">Title</Text>
                <TextInput className="px-4 h-12 rounded border border-slate-400 focus:border-black"></TextInput>
                <Text className="text-slate-500 mb-2 mt-6">Area of Interest</Text>
                <TouchableOpacity className='flex flex-row px-4 items-center h-12 border border-slate-400 rounded' onPress={() => setSelectMenuOpen(!selectMenuOpen)}>
                    <Text>{interest}</Text>
                    <CaretDownIcon />
                </TouchableOpacity>
                <Text className="text-slate-500 mb-2 mt-6">Short Description</Text>
                <TextInput className="px-4 h-40 border border-slate-400 focus:border-black rounded" multiline numberOfLines={8} onChangeText={(text) => setTextArea(text)}></TextInput>
                <Text className="mt-6 text-slate-500">Detail Attachment</Text>
                <TouchableOpacity className="h-12 w-full flex flex-row border border-slate-400 mt-4 rounded px-4 justify-between text-center items-center" onPress={selectPDF} ><Text className="text-slate-500">Click to upload document</Text><UploadIcon /></TouchableOpacity>
                <Text className="text-sm mb-2 text-slate-500 mt-6">Due Date</Text>
                <View>
                    <View>
                        <TouchableOpacity className="rounded flex flex-row border border-slate-400 px-4 h-12 mb-6 justify-between items-center" onPress={showDatepicker}><Text>{dataTratada}</Text><CalendarIcon /></TouchableOpacity>
                    </View>
                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            // mode={mode}
                            is24Hour={true}
                            display="default"
                            onChange={onChange}
                        />
                    )}
                </View>
                <Link href={'/setupreward'} className="p-4 bg-black rounded text-white text-center mb-20">Continue to setup reward</Link>
            </View>
        </ScrollView>
    )
}
