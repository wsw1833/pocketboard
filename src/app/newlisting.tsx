import React, { useEffect, useState } from "react"
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView} from "react-native"
import { Link } from "expo-router";
import Icon from 'react-native-vector-icons/AntDesign';
import RNPickerSelect from 'react-native-picker-select';
import * as DocumentPicker from 'expo-document-picker';




export default function NewListing() {
    const [textArea, setTextArea] = useState('');
    const [networkChoose, setNetworkChoose] = useState('');
    const [date, setDate] = useState('');
    const [show, setShow] = useState(true);
    const [file, setFile] = React.useState(null);


    const BackIcon = () => <Icon name="arrowleft" size={16} color="#000" className="ml-2" />;
    const CaretDownIcon = () => <Icon name="caretdown" size={16} color="#000" className="-ml-8 my-auto pointer-events-none" />;
    const CalendarIcon = () => <Icon name="calendar" size={16} color="#000" className="-ml-8 my-auto pointer-events-none" />;
    const UploadIcon = () => <Icon name="upload" size={16} color="#000" className="-ml-8 my-auto" />;


    async function selectPDF() {
        let result = await DocumentPicker.getDocumentAsync({
            type: 'application/pdf',
            // Can set other types
        });
    }


    return (
        <ScrollView className="px-8 mt-10">
            <Link href={'/joblisting'} className="flex flex-row mt-2">
                <BackIcon />
                <Text className="ml-1">Back</Text>
            </Link>
            <Text className="my-6 text-xl">Something big is cooking</Text>
            <Text className="mb-8 text-[36px]">Setup your bounty</Text>
            <Text className="text-slate-500 mb-4">Title</Text>
            <TextInput className="px-4 h-12 rounded border border-slate-400 focus:border-black"></TextInput>
            <Text className="text-slate-500 mb-2 mt-6">Area of Interest</Text>
            <View className="flex flex-row h-12 ">
                <View className='flex items-center h-12 border-slate-400 rounded mb-4 w-full'>
                    <RNPickerSelect

                        onValueChange={(networChoose) => setNetworkChoose(networChoose)}
                        items={[
                            { label: 'Smart contract', value: 'Smart contract' },
                        ]}
                        style={pickerSelectStyles}
                        useNativeAndroidPickerStyle={false}
                        placeholder={{ label: "select", value: null }}
                    />
                </View>
                <CaretDownIcon />
            </View>
            <Text className="text-slate-500 mb-2 mt-6">Short Description</Text>
            <TextInput className="px-4 h-40 border border-slate-400 focus:border-black rounded" multiline numberOfLines={8} onChangeText={(text) => setTextArea(text)}></TextInput>
            <Text className="mt-6 text-slate-500">Detail Attachment</Text>
            <TouchableOpacity className="h-12 w-full flex flex-row border border-slate-400 mt-4 rounded px-4 justify-between text-center items-center" onPress={selectPDF} ><Text className="text-slate-500">Click to upload document</Text><UploadIcon /></TouchableOpacity>
            <View className="flex flex-col items-start mt-6 mb-10">
                <Text className="text-sm mb-2 text-slate-500">Due Date</Text>
                <View className="flex flex-row h-12">
                    <TextInput placeholder="01/01/2024" className="border rounded border-slate-400 focus:border-black h-12 mb-8 w-full px-4" ></TextInput>
                    <CalendarIcon />
                </View>
            </View>
            <Link href={'/setupreward'} className="p-4 bg-black rounded text-white text-center mb-20">Continue to setup reward</Link>
        </ScrollView>
    )
}

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // para garantir que o texto não seja cortado em alguns dispositivos iOS
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // para garantir que o texto não seja cortado em alguns dispositivos Android
    },
});