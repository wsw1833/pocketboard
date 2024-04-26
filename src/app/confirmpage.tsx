import Icon from 'react-native-vector-icons/FontAwesome5';
import { View, Text, Image } from 'react-native';
import { Link } from 'expo-router';
import { useState } from 'react';


export default function ConfirmPage() {
    const ArrowIcon = () => <Icon name="long-arrow-alt-right" size={40} color="#000" className="mb-12" />;
    const [nameIn, setNameIn] = useState('Astar');
    const [nameOut, setNameOut] = useState('Moonbeam');
    const [value, setValue] = useState(100);
    const [type, setType] = useState('DOT');

    return (
        <View className="flex flex-col p-8 h-screen">
            <View className='my-auto'>
                <Text className="text4xl self-center text-5xl mb-14">Reward the talent</Text>
                <View className='flex flex-row self-center mb-14'>
                    <Text className="text-5xl">{value}</Text>
                    <Image className="rounded-full w-6 h-6 self-center ml-2" source={require('assets/images/pink-circle.png')} />
                    <Text className='self-end mb-2 text-xl'>{type}</Text>
                </View>
                <View className='flex flex-row self-center items-center mb-10 justify-between w-full px-4'>
                    <View className=''>
                        <Image className="rounded-full w-24 h-24 self-center " source={require('assets/images/bountie.png')} />
                        <Text className='self-center mt-4 text-xl'>{nameIn}</Text>
                    </View>
                    <ArrowIcon />
                    <View className=''>
                        <Image className="rounded-full w-24 h-24 self-center " source={require('assets/images/moonbeam.png')} />
                        <Text className='self-center mt-4 text-xl'>{nameOut}</Text>
                    </View>
                </View>
                
                <View className="w-full h-14 mb-4 mt-8">
                    <Link href={'/sendnft'} className="w-full h-14"></Link>
                    <View className="flex w-full h-full bg-black rounded text-center min-w-full -mt-[50px] pointer-events-none">
                        <Text className="self-center text-white mx-auto my-auto text-xl">Complete payment</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}