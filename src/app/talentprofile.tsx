import { useState } from 'react';
import { ScrollView, View, TextInput, Text, Image, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Iconf from 'react-native-vector-icons/FontAwesome6';
import Iconh from 'react-native-vector-icons/FontAwesome5';


export default function TalentProfile() {
    const [name, setName] = useState("Person Name");
    const [code, setCode] = useState("0x43aqwwn12an13ed4f");
    const [twitter, setTwitter] = useState("@t2x0318");
    const [goodIn, setGoodIn] = useState("Smart Contract");
    const [handShakes, setHandShakes] = useState(0);
    const [colorHandShakes, setColorHandShakes] = useState('border-black');
    const [openHandShakes, setOpenHandShakes] = useState(false);
    const [hall, setHall] = useState(false);
    const [openSearch, setOpenSearch] = useState(false);
    const [openAboutBadge, setOpenAboutBadge] = useState(false);
    const [creator, setCreator] = useState('');
    const [dot, setDot] = useState(0);
    const [stats, setStats] = useState('');
    const [whatDo, setWhatDo] = useState('');
    const imageProfile = 'assets/images/black.png'
    // const [bounties, setBounties] useState<[]>([]);

    const CopyIcon = () => <Icon name="content-copy" size={16} color="#000" className="ml-2" />;
    const GlassIcon = () => <Iconf name="magnifying-glass" size={30} color="#000" className="ml-2" />;
    const HomeIcon = () => <Iconh name="home" size={30} color="#000" className="ml-2" />;


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


    function ShakeHand() {
        if (handShakes == 0) {
            setHandShakes(1);
            setColorHandShakes('border-yellow-500');
        } else {
            setOpenHandShakes(true);
        }
    }

    const peoplesShakes = [{
        name: "John Wayne",
        whenShakes: "30 April 2024",
    },
    {
        name: "John Wayne",
        whenShakes: "30 April 2024",
    },
    {
        name: "John Wayne",
        whenShakes: "30 April 2024",
    },
    {
        name: "John Wayne",
        whenShakes: "30 April 2024",
    }, {
        name: "John Wayne",
        whenShakes: "30 April 2024",
    },
    {
        name: "John Wayne",
        whenShakes: "30 April 2024",
    },
    {
        name: "John Wayne",
        whenShakes: "30 April 2024",
    },
    {
        name: "John Wayne",
        whenShakes: "30 April 2024",
    }, {
        name: "John Wayne",
        whenShakes: "30 April 2024",
    },
    {
        name: "John Wayne",
        whenShakes: "30 April 2024",
    },
    {
        name: "John Wayne",
        whenShakes: "30 April 2024",
    },
    {
        name: "John Wayne",
        whenShakes: "30 April 2024",
    }
    ]

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
    },
    {
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
    }, {
        whatDo: "Create a dashboard",
        creator: "Astar",
        stats: "Completed on 30 April 2024",
        dot: 100
    }
    ]

    return (
        <View className='flex h-screen'>
            <View className={`${openSearch ? 'flex' : 'hidden'} absolute h-full w-full z-10`}>

                <TouchableOpacity className='self-center mt-4 absolute opacity-50 h-full w-full' onPress={() => setOpenSearch(!openSearch)}></TouchableOpacity>
                <View className='my-auto self-center bg-white rounded-lg p-8 w-full m-8'>
                    <View className='my-auto self-center bg-white rounded-lg p-8 w-full m-8'>
                        <Text>Paste Talent's Wallet Address Here</Text>
                        <TextInput className='border rounded h-10 mt-2 mb-6 px-4'></TextInput>
                        <TouchableOpacity className='bg-black p-2 rounded'><Text className='self-center text-white text-xl'>Search Talent Profile</Text></TouchableOpacity>
                    </View>
                </View>
            </View>

            <View className={`${openHandShakes ? 'flex' : 'hidden'} absolute h-full w-full z-10`}>
                <TouchableOpacity className='self-center mt-4 absolute opacity-50 h-full w-full' onPress={() => setOpenHandShakes(!openHandShakes)}></TouchableOpacity>
                <View className='my-auto self-center rounded-lg h-3/4 bg-white w-full m-8'>
                    <View className='my-auto self-center rounded-lg px-8 p-2 h-full bg-white w-full m-8'>
                        <Text className='text-xl'>{name}</Text>
                        <Text className='text-4xl mb-4 mt-4'>{handShakes} Handshakes 🤝</Text>
                        <ScrollView className=''>
                            {peoplesShakes.map((person, index) =>
                                <View key={index} className='flex flex-row rounded-lg border p-4 items-center mb-4'>
                                    <Image className="rounded-full w-14 h-14 self-center " source={require('assets/images/black.png')} />
                                    <View className='ml-4'>
                                        <Text className='text-2xl mb-2'>{person.name}</Text>
                                        <Text>Handshake on {person.whenShakes}</Text>
                                    </View>
                                </View>)}
                        </ScrollView>
                    </View>
                </View>
            </View>

            <View className={`${openAboutBadge ? 'flex' : 'hidden'} absolute h-full w-full z-10`}>
                <TouchableOpacity className='self-center mt-4 absolute opacity-50 h-full w-full' onPress={() => setOpenAboutBadge(!openAboutBadge)}></TouchableOpacity>
                <View className='my-auto self-center bg-white rounded-xl p-8 w-full'>
                    <Text className='text-4xl self-center mt-10 mb-10'>About this badge</Text>
                    <Image className="rounded-full w-32 h-32 self-center mb-4" source={require('assets/images/bountie.png')} />
                    <TouchableOpacity className='p-2 rounded'>
                        <Text className='self-center text-lg'>View on SubScan</Text>
                        <View className='border-b w-36 self-center'></View>
                    </TouchableOpacity>
                    <Text className='mt-8'>Related Bounty</Text>
                    <View className='p-4 mt-2 flex flex-row border border-slate-500 rounded items-center justify-between'>
                        <View className='flex flex-row gap-4'>
                            <Image className="rounded-full w-14 h-14" source={require('assets/images/bountie.png')} />
                            <View>
                                <Text className='text-md'>{whatDo}</Text>
                                <Text className='mt-1'>by {creator}</Text>
                                <Text className='text-[10px] mt-1'>{stats}</Text>
                            </View>
                        </View>
                        <View className='h-full'>
                            <Text className=''>{dot} DOT</Text>
                        </View>
                    </View>
                </View>


            </View>
            <View className={`${openSearch ? 'opacity-30' : openAboutBadge ? 'opacity-30' : openHandShakes ? 'opacity-30' : 'opacity-100'} flex flex-col px-10 mt-6`}>
                <View className='flex flex-row justify-between mt-10 mb-2'>
                    <Link href="/bountylisting"><HomeIcon /></Link>
                    <TouchableOpacity onPress={() => setOpenSearch(!openSearch)}><GlassIcon /></TouchableOpacity>
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
                    <TouchableOpacity className={`${colorHandShakes} border-2 rounded-full px-4 py-2`} onPress={() => ShakeHand()}>
                        <Text>{handShakes} hand shakes 🤝</Text>
                    </TouchableOpacity>
                </View>
                <View className='flex flex-row mb-2 justify-around mt-10 border-b border-slate-300'>
                    <TouchableOpacity className={`${hall ? '' : 'border-b'} p-2`} onPress={() => setHall(false)}>
                        <Text>Completed bounty</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className={`${hall ? 'border-b' : ''} p-2`} onPress={() => setHall(true)}>
                        <Text className=''>Hall of Badge</Text>
                    </TouchableOpacity>
                </View>
                {hall ?
                    <ScrollView className='my-auto'>
                        <View className='flex flex-row flex-wrap justify-between'>
                            {bounties.map((bountie, index) =>
                                <TouchableOpacity key={index} className='p-6 border border-slate-300 rounded mt-6' onPress={() => { setCreator(bountie.creator), setDot(bountie.dot), setStats(bountie.stats), setWhatDo(bountie.whatDo), setOpenAboutBadge(!openAboutBadge) }}>
                                    <Image className="rounded-full w-14 h-14" source={require('assets/images/bountie.png')} />
                                </TouchableOpacity>
                            )}
                        </View>
                    </ScrollView>


                    :

                    bounties.length == 0 ?
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