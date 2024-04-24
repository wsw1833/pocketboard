import { useState } from 'react';
import { View, TextInput, Text, Image, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Iconf from 'react-native-vector-icons/FontAwesome6';


export default function TalentProfile() {
    const [name, setName] = useState("Person Name");
    const [code, setCode] = useState("0x43aqwwn12an13ed4f");
    const [twitter, setTwitter] = useState("@t2x0318");
    const [goodIn, setGoodIn] = useState("Smart Contract");
    const [handShakes, setHandShakes] = useState(0);
    const imageProfile = 'assets/images/black.png'

    const CopyIcon = () => <Icon name="content-copy" size={16} color="#000" className="ml-2" />;


    function fatiar(code: string) {
        let tratado = []
        const fatiado = code.slice()
        for (let x = 0; x < fatiado.length; x++) {
            if (x == 0 || x == 1 || x == 2 || x == 3 || x == 4 || x == 5 || x == fatiado.length - 1 || x == fatiado.length - 2 || x == fatiado.length - 3 || x == fatiado.length - 4) {
                if (x == 5) {
                    tratado.push('...')
                } else {
                    tratado.push(fatiado[x])
                }
            }
        }

        code.split('');

        return tratado
    }


    return (
        <View className='flex p-10 h-screen'>
            <View className='flex flex-row justify-between mt-10 mb-2'>
                <TouchableOpacity><Image className="rounded-full w-10 h-10" source={require('assets/images/home.png')} /></TouchableOpacity>
                <TouchableOpacity><Image className="rounded-full w-10 h-10" source={require('assets/images/magnifying-glass.png')} /></TouchableOpacity>
            </View>
            <View className='flex flex-col items-center'>
                <Image className="rounded-full w-32 h-32" source={require(imageProfile)} />
                <Text className='text-2xl mt-8 mb-2'>{name}</Text>
                <TouchableOpacity className='flex flex-row'><Text>{code.length > 10 ? fatiar(code) : code}</Text><CopyIcon /></TouchableOpacity>
                <Text className='mt-8'>This is my one-line bio.</Text>
                <View className='flex flex-row items-center mt-4'><Iconf name="x-twitter" size={18} color="#000" brand /><Text className='ml-2'>{twitter}</Text></View>
                <View className='bg-green-100 p-3 mt-4 mb-8 rounded'>
                    <Text className='text-[#052000]'>Hey I'm good in {goodIn}</Text>
                </View>
                <View className='border rounded-full px-4 py-2 '>
                    <Text>{handShakes} hand shakes 🤝</Text>
                </View>
            </View>
            <View>
                
            </View>
        </View>
    )
}