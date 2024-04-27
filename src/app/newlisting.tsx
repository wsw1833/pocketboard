import React, { useEffect, useState } from "react"
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from "react-native"
import { Link } from "expo-router";
import Icon from 'react-native-vector-icons/AntDesign';
import * as DocumentPicker from 'expo-document-picker';


export default function NewListing() {
    const [textArea, setTextArea] = useState('');
    const [interest, setInterest] = useState('select');
    const [networkChoose, setNetworkChoose] = useState('');
    const [date, setDate] = useState('');
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


    const CalendarIcon = () => <Icon name="calendar" size={16} color="#000" className="" />;
    const ArrowUpIcon = () => <Icon name="arrowup" size={16} color="#fff" className="" />;
    const ArrowDownIcon = () => <Icon name="arrowdown" size={16} color="#fff" className="" />;
    const CheckIcon = () => <Icon name="check" size={16} color="#fff" className="" />;


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
    const dataTratada = (day < 10 ? '0' : '') + String(day) + ' / ' + (month < 10 ? '0' : '') + String(month) + ' / ' + String(year)
    return (
        <ScrollView>
            <View className={`${calendarOpen ? '' : 'hidden'} absolute flex w-screen h-screen z-50`}>
                <TouchableOpacity className="h-2/3 w-full" onPress={() => setCalendarOpen(!calendarOpen)}></TouchableOpacity>


                <View className="bg-slate-900 w-full h-full rounded-3xl">
                    <View className="flex flex-row justify-between p-6">
                        <TouchableOpacity className="bg-slate-800 rounded-lg p-2 w-[30%] text-center items-center" onPress={() => { setViewYear(true), setViewMonth(false), setViewDay(false) }}>
                            <Text className="text-white text-2xl">Year</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="bg-slate-800 rounded-lg p-2 w-[30%] text-center items-center" onPress={() => { setViewYear(false), setViewMonth(true), setViewDay(false) }}>
                            <Text className="text-white text-2xl">Month</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="bg-slate-800 rounded-lg p-2 w-[30%] text-center items-center" onPress={() => { setViewYear(false), setViewMonth(false), setViewDay(true) }}>
                            <Text className="text-white text-2xl">Day</Text>
                        </TouchableOpacity>
                    </View>
                    <View className="flex flex-row justify-between px-6">
                        <View className="w-[30%]">
                            <View className={`${viewYear ? '' : 'hidden'} w-1/3 border border-slate-800 self-center`}></View>
                        </View>
                        <View className="w-[30%]">
                            <View className={`${viewMonth ? '' : 'hidden'} w-1/3 border border-slate-800 self-center`}></View>
                        </View>
                        <View className="w-[30%]">
                            <View className={`${viewDay ? '' : 'hidden'} w-1/3 border border-slate-800 self-center`}></View>
                        </View>
                    </View>


                    <View className={`${viewYear ? '' : 'hidden'} w-full h-1/3`}>
                        <View className="flex flex-row items-center text-center mx-auto my-auto">
                            <TouchableOpacity className="bg-slate-800 h-12 pt-4 px-1 rounded" onPress={() => setYear(year - 1)}><ArrowDownIcon></ArrowDownIcon></TouchableOpacity>
                            <TextInput className="w-40 border mx-4 rounded border-slate-600 text-white text-center h-12">{year}</TextInput>
                            <TouchableOpacity className={`bg-slate-800 h-12 pt-4 px-1 rounded`} onPress={() => setYear(year + 1)}><ArrowUpIcon></ArrowUpIcon></TouchableOpacity>
                        </View>
                        <TouchableOpacity className="flex bg-slate-800 rounded py-1 w-[75px] items-center mb-[4%] mx-auto" onPress={() => { setViewYear(!year), setViewMonth(!viewMonth) }}><CheckIcon /></TouchableOpacity>
                    </View>


                    <View className={`${viewMonth ? '' : 'hidden'} w-full h-1/3 `}>
                        <View className="flex flex-row flex-wrap p-6 max-w-screen justify-between">
                            {meses.map((month, index) =>

                                <TouchableOpacity key={index} className="flex bg-slate-800 rounded py-1 w-[75px] items-center mb-[4%]" onPress={() => { setMonth(month.number), setViewMonth(!viewMonth), setViewDay(!viewDay) }}>
                                    <Text className="text-white text-xl">{month.number}</Text>
                                    <Text className="text-white">{month.name}</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>


                    <View className={`${viewDay ? '' : 'hidden'} flex flex-row gap-14 p-6 mx-auto items-start justify-start w-screen max-w-screen flex-wrap`}>
                        <View className="flex flex-row flex-wrap px-6 max-w-screen justify-between">
                            {daysMonthSelected.map(day =>
                                <TouchableOpacity key={day} className="flex bg-slate-800 rounded py-1 w-[55px] items-center mb-[4%]" onPress={() => { setDay(day), setViewMonth(false), setViewDay(false), setCalendarOpen(false) }}>
                                    <Text className="text-white pointer-events-none">{day}</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>



                </View>
            </View>

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
                <TouchableOpacity className="border rounded border-slate-500 w-full justify-between flex flex-row h-12 px-4 items-center mb-6" onPress={() => setCalendarOpen(!calendarOpen)}><Text>{dataTratada}</Text><CalendarIcon /></TouchableOpacity>
                <Link href={'/setupreward'} className="p-4 bg-black rounded text-white text-center mb-20">Continue to setup reward</Link>
            </View>
        </ScrollView>
    )
}
