import { useState, useEffect } from "react"
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native"
import { Link } from "expo-router";
import Icon from 'react-native-vector-icons/AntDesign';
import RNPickerSelect from 'react-native-picker-select';
import * as ImagePicker from 'expo-image-picker';


export default function BountySubmition() {
    const [textArea, setTextArea] = useState('');
    const [networkChoose, setNetworkChoose] = useState('');
    const [interest, setInterest] = useState('select');
    const [selectMenuOpen, setSelectMenuOpen] = useState(true);

    const BackIcon = () => <Icon name="arrowleft" size={16} color="#000" className="ml-2 pointer-events-none" />;
    const CaretDownIcon = () => <Icon name="caretdown" size={16} color="#000" className="my-auto ml-auto pointer-events-none" />;


    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        // Logic to handle the selected image
    };

    const types = [
        "DOT",
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
            
            <View className="py-20 px-8">
                <Link href={'/newlisting'} className="flex flex-row mt-2">
                    <BackIcon />
                    <Text className="ml-1">Back</Text>
                </Link>
                <Text className="my-8 text-xl">You're almost there</Text>
                <Text className="mb-8 text-5xl">Bounty Reward</Text>
                <View className="mb-4">
                    <Text className="text-2xl">Work Badge</Text>
                    <View className="w-32 border border-black "></View>
                </View>
                <Text className="text-sm">After this bounty is completed, work badge will be awarded to the talent as an achievement. It will be a soul-bounded NFT which will be nested in the talent's profile.</Text>
                <Text className="mt-6 mb-4 text-slate-500">Badge Design</Text>
                <TouchableOpacity className='border rounded p-4 flex flex-row items-center border-slate-400 focus:border-black' onPress={pickImage}>
                    <Image className="rounded-full w-14 h-14" source={require('assets/images/black.png')} />
                    <View className='ml-4'>
                        <Text className='mb-1 text-xl'>Click to upload media</Text>
                        <Text className='text-sm'>Maximum size: 5MB</Text>
                    </View>
                </TouchableOpacity>
                <View className="">
                    <Text className="text-2xl mt-6">Token Reward</Text>
                    <View className="w-[130px] border border-black "></View>
                </View>
                <Text className="text-sm mt-4">After this bounty is completed, the token assets need to be awarded to the talent. You can choose the amount of the specified token assets (on Astar Network) as the reward for this bounty.</Text>
                <Text className="text-slate-400 mt-8 mb-4">Token Amount</Text>
                <View className="flex flex-row mb-8">
                    <TextInput className="h-12 w-8/12 border border-slate-400 rounded-l px-4"></TextInput>
                    <TouchableOpacity className='flex flex-row px-4 items-center h-12 border border-slate-400 rounded w-4/12' onPress={() => setSelectMenuOpen(!selectMenuOpen)}>
                        <Text>{interest}</Text>
                        <CaretDownIcon />
                    </TouchableOpacity>
                </View>
                <Link href={'/companyprofile'} className="p-4 bg-black rounded text-white text-center text-xl">Confirm the listing</Link>
            </View>
        </ScrollView>
    )
}

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        paddingRight: 30,
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        paddingRight: 30,
    },
});