import { View, TextInput, Text, Image, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Link } from "expo-router";
import { Picker } from '@react-native-picker/picker';
import react, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import RNPickerSelect from 'react-native-picker-select';
import { Navigator } from 'expo-router';

export default function LookingTalent() {
    const [selectedLanguage, setSelectedLanguage] = useState();

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



    return (
        <View className="p-10 h-screen">
            <View className='my-auto'>
                <Image className="h-9 w-10" source={require('assets/images/splash.png')} />
                <Text className='text-2xl mt-4'>Youre almost there</Text>
                <Text className='text-4xl mt-5 mb-8'>Setup your profile</Text>

                <View className='mb-8'>
                    <Text className='opacity-40'>Company Name</Text>
                    <TextInput className='border rounded h-12 mb-4 mt-2 px-4 border-slate-400 focus:border-black'></TextInput>
                    <Text className='opacity-40'>Website</Text>
                    <TextInput className='border rounded h-12 mb-4 mt-2 px-4 border-slate-400 focus:border-black'></TextInput>
                    <Text className='mb-2 opacity-40'>Company Logo</Text>
                    <TouchableOpacity className='border rounded p-4 flex flex-row items-center border-slate-400 focus:border-black' onPress={pickImage}>
                        <Image className="rounded-full w-14 h-14" source={require('assets/images/black.png')} />
                        <View className='ml-4'>
                            <Text className='mb-1 text-xl'>Click to upload media</Text>
                            <Text className='text-sm'>Maximum size: 5MB</Text>
                        </View>
                    </TouchableOpacity>

                    <Text className='mt-4 mb-2 opacity-40'>Area of Interest</Text>
                    <View className='flex items-center h-12 border-slate-400 rounded'>
                        <RNPickerSelect

                            onValueChange={(interest) => console.log(interest)}
                            items={[
                                { label: 'Smart Contract', value: 'Smart Contract' },
                            ]}
                            style={pickerSelectStyles}
                            useNativeAndroidPickerStyle={false}
                            placeholder={{ label: "", value: null }}
                        />
                    </View>
                    <Text className='mt-4 mb-2 opacity-40'>Company Twitter</Text>
                    <TextInput className='border rounded h-12 mb-6 px-4 border-slate-400 focus:border-black'>@</TextInput>
                </View>
                <Link suppressHighlighting className="flex h-16 pt-4 text-2xl items-center justify-center overflow-hidden rounded-md bg-gray-900 px-4 py-2 font-medium text-gray-50 web:shadow ios:shadow transition-colors hover:bg-gray-900/90 active:bg-gray-400/90 web:focus-visible:outline-none web:focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300 text-center" href="/companyprofile">Complete my profile</Link>
                {/* <TouchableOpacity className='flex bg-black text-white h-14 rounded mb-4'>
                    <Text className='text-white text-2xl self-center my-auto'>Complete my profile</Text>
                </TouchableOpacity> */}
            </View>
        </View>
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
