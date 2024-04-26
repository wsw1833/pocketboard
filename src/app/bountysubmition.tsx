import { useState } from "react"
import { View, Text, TextInput, StyleSheet, ScrollView } from "react-native"
import { Link } from "expo-router";
import Icon from 'react-native-vector-icons/AntDesign';
import RNPickerSelect from 'react-native-picker-select';

export default function BountySubmition() {
    const [textArea, setTextArea] = useState('');
    const [networkChoose, setNetworkChoose] = useState('');

    const BackIcon = () => <Icon name="arrowleft" size={16} color="#000" className="ml-2 pointer-events-none" />;
    const CaretDownIcon = () => <Icon name="caretdown" size={16} color="#000" className="-ml-8 my-auto pointer-events-none" />;


    return (
        <ScrollView>
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
                <View className="flex flex-row h-12 mb-8">
                    <View className='flex items-center h-12 border-slate-400 rounded mb-4 w-full'>
                        <RNPickerSelect

                            onValueChange={(networChoose) => setNetworkChoose(networChoose)}
                            items={[
                                { label: 'Moonbeam', value: 'Moonbeam' },
                            ]}
                            style={pickerSelectStyles}
                            useNativeAndroidPickerStyle={false}
                            placeholder={{ label: "select", value: null }}
                        />
                    </View>
                    <CaretDownIcon />
                </View>
                <Link href={'/bountylisting'} className="p-4 bg-black rounded text-white text-center">Submit my work</Link>
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