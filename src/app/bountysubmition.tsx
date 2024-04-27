import { useState } from "react"
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { Link } from "expo-router";
import Icon from 'react-native-vector-icons/AntDesign';



export default function BountySubmition() {
    const [textArea, setTextArea] = useState('');
    const [networkChoose, setNetworkChoose] = useState('');
    const [interest, setInterest] = useState('select');
    const [selectMenuOpen, setSelectMenuOpen] = useState(true);

    const CaretDownIcon = () => <Icon name="caretdown" size={16} color="#000" className="my-auto ml-auto pointer-events-none" />;
    const BackIcon = () => <Icon name="arrowleft" size={16} color="#000" className="ml-2 pointer-events-none" />;

    const types = [
        "Smart Contract",
        "teste 1",
        "teste 2",
        ""
    ]

    return (
        <ScrollView>
            <View className={`${selectMenuOpen ? 'hidden' : 'absolute'} h-full w-full z-10`}>
                <TouchableOpacity className='h-1/2' onPress={() => setSelectMenuOpen(!selectMenuOpen)}></TouchableOpacity>
                <ScrollView className='bg-slate-900 mt-auto h-1/2 rounded-t-3xl p-8'>
                    {types.map((type, index) =>
                        <TouchableOpacity key={index} className='items-center mb-4' onPress={() => { setSelectMenuOpen(!selectMenuOpen), setInterest(type) }}>
                            <Text className='text-white text-2xl mb-1'>{type}</Text>
                        </TouchableOpacity>
                    )}
                </ScrollView>
            </View>
            <View className="py-10 px-8">
                <Link href={'/joblisting'} className="flex flex-row mt-2">
                    <BackIcon />
                    <Text className="ml-1">Back</Text>
                </Link>
                <Text className="my-8 text-xl">Great Job!</Text>
                <Text className="mb-8 text-4xl">Bounty Submission</Text>
                <Text className="text-slate-400 mb-4">Link to submission</Text>
                <TextInput className="px-4 h-12 rounded border border-slate-400 focus:border-black"></TextInput>
                <Text className="text-slate-400 mb-4 mt-8">Comments</Text>
                <TextInput className="px-4 h-40 border border-slate-400 focus:border-black rounded" multiline numberOfLines={8} onChangeText={(text) => setTextArea(text)}></TextInput>
                <View className="bg-4">
                    <Text className="text-2xl mt-10">Token Assets for Bounty</Text>
                    <View className="w-64 border border-black "></View>
                </View>
                <Text className="text-sm mt-4">When creating the bounty, sponsor will always fund their task with token assets on Astar Network. However, if you’re want to receive it on another chain, it is possible on Pocket Board. Thanks to the XCM technology!</Text>
                <Text className="text-slate-400 mt-8 mb-4">Choose you're network</Text>
                <TouchableOpacity className='flex flex-row px-4 items-center h-12 border border-slate-400 rounded mb-6' onPress={() => setSelectMenuOpen(!selectMenuOpen)}>
                    <Text>{interest}</Text>
                    <CaretDownIcon />
                </TouchableOpacity>
                <Link href={'/bountylisting'} className="p-4 bg-black rounded text-white text-center text-xl">Submit my work</Link>
            </View>
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