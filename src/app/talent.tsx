
import { View, TextInput, Text, Image, Button, StyleSheet, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { Link } from "expo-router";
import { Picker } from '@react-native-picker/picker';
import react, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import RNPickerSelect from 'react-native-picker-select';
import { Navigator } from 'expo-router';
import Icon from 'react-native-vector-icons/AntDesign';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function LookingTalent() {
    const [interest, setInterest] = useState('select');
    const [twitter, setTwitter] = useState('@');
    const [selectMenuOpen, setSelectMenuOpen] = useState(true);
    const CaretDownIcon = () => <Icon name="caretdown" size={16} color="#000" className="my-auto ml-auto pointer-events-none" />;


    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        })();

        function findAt(twitter) {
            console.log('chamando')
            const at = twitter.slice();
            let out = [];
            if (at[0] != '@') {
                for (let x = 0; x < at.length; x++) {
                    if (x == 0) {
                        const first = at[0].toLowerCase();
                        out.push('@');
                        out.push(first)

                    } else {
                        out.push(at[x + 1]);
                    }
                }
            } else {
                for (let x = 0; x < at.length; x++) {
                    out.push(twitter[x]);
                }
            }
            console.log("out", out)
            const output = out.join('')
            setTwitter(output)
        }
        findAt(twitter);
    }, [twitter]);

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
        "Smart Contract",
        "teste 1",
        "teste 2",
        ""
    ]

    return (
        <KeyboardAwareScrollView>
            <ScrollView className='min-h-screen'>
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
                <View className="px-10 pt-20 pb-20 mb-20 h-screen">
                    <View className='my-auto'>
                        <Image className="h-9 w-10" source={require('assets/images/splash.png')} />
                        <Text className='text-xl mt-6'>Youre almost there</Text>
                        <Text className='text-4xl mt-5 mb-8'>Setup your profile</Text>

                        <View className=''>
                            <Text className='opacity-40'>Name</Text>
                            <TextInput className='border rounded h-12 mb-4 mt-2 px-4 border-slate-400 focus:border-black'></TextInput>
                            <Text className='opacity-40'>Online Bio</Text>
                            <TextInput className='border rounded h-12 mb-4 mt-2 px-4 border-slate-400 focus:border-black'></TextInput>
                            <Text className='mb-2 opacity-40'>Profile Picture</Text>
                            <TouchableOpacity className='border rounded p-4 flex flex-row items-center border-slate-400 focus:border-black' onPress={pickImage}>
                                <Image className="rounded-full w-14 h-14" source={require('assets/images/black.png')} />
                                <View className='ml-4'>
                                    <Text className='mb-1 text-xl'>Click to upload media</Text>
                                    <Text className='text-sm'>Maximum size: 5MB</Text>
                                </View>
                            </TouchableOpacity>

                            <Text className='mt-4 mb-2 opacity-40'>Area of Interest</Text>
                            <TouchableOpacity className='flex flex-row px-4 items-center h-12 border border-slate-400 rounded' onPress={() => setSelectMenuOpen(!selectMenuOpen)}>
                                <Text>{interest}</Text>
                                <CaretDownIcon />
                            </TouchableOpacity>
                            <Text className='mt-4 mb-2 opacity-40'>Twitter</Text>
                            <TextInput className='border rounded h-12 mb-6 px-4 border-slate-400 focus:border-black' value={twitter} onChangeText={(e) => setTwitter(e)}></TextInput>
                        </View>


                        <View>
                            <Link href={'/talentprofile'} className="w-full h-14"></Link>
                            <View className="flex flex-1 w-full h-full rounded text-center min-w-full">
                                <View className="flex flex-row my-auto h-14 -mt-14 z-100 bg-black rounded-lg pointer-events-none">
                                    <Text className="flex flex-row mx-auto text-white my-auto text-xl">Complete my profile</Text>
                                </View>
                            </View>
                        </View>

                        {/* <TouchableOpacity className='flex bg-black text-white h-14 rounded mb-4'>
                    <Text className='text-white text-2xl self-center my-auto'>Complete my profile</Text>
                </TouchableOpacity> */}
                    </View>
                </View>
            </ScrollView>
        </KeyboardAwareScrollView>
    )
}
