import { useState } from 'react';
import { View, ScrollView, TextInput, Text, Image, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Iconf from 'react-native-vector-icons/FontAwesome6';
import IconU from 'react-native-vector-icons/FontAwesome'


export default function TalentProfile() {
    const [name, setName] = useState("Person Name");
    const [code, setCode] = useState("0x43aqwwn12an13ed4f");
    const [twitter, setTwitter] = useState("@t2x0318");
    const [interestedIn, setInterestedIn] = useState("Smart Contract");
    const [openProfile, setOpenProfile] = useState(false);
    const imageProfile = 'assets/images/black.png'
    // const [bounties, setBountie] = useState([]);

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
    const bounties = [{
        whatDo: "Create a dashboard",
        creator: "Astar",
        stats: "Completed on 30 April 2024",
        dot: 100
    }, {
        whatDo: "Create a dashboard",
        creator: "Astar",
        stats: "Completed on 30 April 2024",
        dot: 100
    }, {
        whatDo: "Create a dashboard",
        creator: "Astar",
        stats: "Completed on 30 April 2024",
        dot: 100
    }, {
        whatDo: "Create a dashboard",
        creator: "Astar",
        stats: "Completed on 30 April 2024",
        dot: 100
    }, {
        whatDo: "Create a dashboard",
        creator: "Astar",
        stats: "Completed on 30 April 2024",
        dot: 100
    }
    ]

    return (
        <View>
            <View className={`${openProfile ? 'flex' : 'hidden'} absolute h-screen w-full z-10 bg-slate-200 px-8`}>
                <View className='my-auto self-center bg-white rounded-lg p-8 w-full'>
                    <Text className="text-3xl mb-10 mt-6">My Talent Profile</Text>
                    <Link href={'/talentprofile'} className="border h-12 text-center p-2 bg-black"><Text className="mt-4 text-xl text-white">Switch to Talent Profile</Text></Link>
                    <View className="border border-slate-200 mx-10 m-6"></View>
                    <Link href={'/'} className=" rounded h-12 text-center p-2 mb-4 bg-red-200"><Text className="mt-4 text-2xl text-red-600">Disconect Wallet</Text></Link>
                    <TouchableOpacity className='self-center mt-4' onPress={() => setOpenProfile(!openProfile)}><Text className='text-red-700'>Cancel</Text></TouchableOpacity>
                </View>
            </View>

            <View className='flex py-10 px-6 h-full'>
                <View className='flex flex-row mt-10 mb-2 justify-between'>
                    <View></View>
                    <TouchableOpacity onPress={()=>setOpenProfile(!openProfile)}><IconU name="user-circle-o" size={30} color="#000" brand /></TouchableOpacity>
                </View>
                <View className='flex flex-col items-center'>
                    <Image className="rounded-full w-32 h-32" source={require(imageProfile)} />
                    <Text className='text-2xl mt-8 mb-2'>{name}</Text>
                    <TouchableOpacity className='flex flex-row'><Text>{code.length > 10 ? fatiar(code) : code}</Text><CopyIcon /></TouchableOpacity>
                    <Text className='mt-8'>This is my one-line bio.</Text>
                    <View className='flex flex-row items-center mt-4'><Iconf name="x-twitter" size={18} color="#000" brand /><Text className='ml-2'>{twitter}</Text></View>
                    <View className='bg-green-100 p-3 mt-4 mb-8 rounded'>
                        <Text className='text-[#052000]'>Hey we're interested in {interestedIn}</Text>
                    </View>
                    <View className='flex flex-row border-b justify-between w-full mt-10 border-slate-200'>
                        <View className='flex border-b text-center items-center border-black p-4'>
                            <Text className='mt-1'>Created bounty</Text>
                        </View>
                        <TouchableOpacity className='border rounded px-6 py-4 mb-4'>
                            <Text>+ New Listing</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {bounties.length == 0 ?
                    <View className='flex flex-col items-center my-auto gap-10'>
                        <Image className="rounded-full w-32 h-40" source={require('assets/images/baloom.png')} />
                        <Text className='text-slate-400'>Nothing here... Just a sad balloon</Text>
                    </View>

                    :
                    <ScrollView className='my-auto'>
                        {bounties.map((bountie, index) =>

                            <View key={index} className='p-4 mt-8 flex flex-row border border-slate-500 rounded flex-wrap items-center justify-between'>

                                <View className='flex flex-row gap-4'>
                                    <Image className="rounded-full w-14 h-14" source={require('assets/images/bountie.png')} />
                                    <View>
                                        <Text className='text-md'>{bountie?.whatDo}</Text>
                                        <Text className='mt-1'>by {bountie?.creator}</Text>
                                        <Text className='text-[10px] mt-1'>{bountie?.stats}</Text>
                                    </View>
                                </View>
                                <View className='h-full'>
                                    <Text className=''>{bountie?.dot} DOT</Text>
                                </View>
                            </View>

                        )}
                    </ScrollView>
                }
            </View>
        </View>
    )
}