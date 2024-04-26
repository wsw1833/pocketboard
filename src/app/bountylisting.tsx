import { Link } from "expo-router";
import { useState } from "react"
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native"
import IconU from 'react-native-vector-icons/FontAwesome'

export default function BountyList() {
    const [openProfile, setOpenProfile] = useState(false);
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
    }
]

    return (
        <View className="flex">
            <View className={`${openProfile ? 'flex' : 'hidden'} absolute h-screen w-full z-10 p-8`}>
                <TouchableOpacity className='self-center mt-4 absolute opacity-50 h-full w-full' onPress={() => setOpenProfile(!openProfile)}></TouchableOpacity>
                <View className='my-auto self-center bg-white rounded-lg p-8 w-full'>
                    <Text className="text-4xl mb-6 mt-6">My Talent Profile</Text>
                    <Link href={'/talentprofile'} className="border rounded h-12 text-center p-2 mb-4"><Text className="mt-4 text-xl">View My Profile</Text></Link>
                    <Link href={'/companyprofile'} className="border rounded h-12 text-center p-2 bg-black"><Text className="mt-4 text-xl text-white">Switch to Sponsor Profile</Text></Link>
                    <View className="border mx-10 m-6 border-slate-200"></View>
                    <Link href={'/'} className="rounded h-12 text-center p-2 mb-4 bg-red-200"><Text className="mt-4 text-xl text-red-600">Disconect Wallet</Text></Link>
                </View>
            </View>
            <View className={`${openProfile ? 'opacity-30' : 'opacity-100'} pt-16 px-6`}>
                <View className="flex flex-row justify-between">
                    <View></View>
                    <TouchableOpacity onPress={() => setOpenProfile(!openProfile)}><IconU name="user-circle-o" size={30} color="#000" brand /></TouchableOpacity>
                </View>
                <Text className="mt-8 text-2xl">Unleash your talent</Text>
                <Text className="text-5xl mt-6">Bounties Listing</Text>
                {bounties.length == 0 ?
                    <View className='flex flex-col items-center my-auto gap-10'>
                        <Image className="rounded-full w-32 h-40" source={require('assets/images/baloom.png')} />
                        <Text className='text-slate-400'>Nothing here... Just a sad balloon</Text>
                    </View>
 
                    :
                    <ScrollView className='my-auto w-full'>
                        {bounties.map((bountie, index) =>
                            <View key={index} className='mt-8'>
                                <Link href={'/joblisting'} className='h-24'></Link>
                                <View className='p-4 flex flex-row border border-slate-500 rounded flex-wrap items-center justify-between min-w-full -mt-[87px] pointer-events-none'>
                                    <View className='flex flex-row gap-4 my-auto items-center'>
                                        <Image className="rounded-full w-14 h-14 my-auto" source={require('assets/images/bountie.png')} />
                                        <View className=''>
                                            <Text className='text-md'>{bountie?.whatDo}</Text>
                                            <Text className='mt-1'>by {bountie?.creator}</Text>
                                            <Text className='text-[10px] mt-1'>{bountie?.stats}</Text>
                                        </View>
                                    </View>
                                    <View className='h-full'>
                                        <Text className=''>{bountie?.dot} DOT</Text>
                                    </View>
                                </View>
                            </View>

                        )}
                    </ScrollView>
                }
            </View>
        </View>
    )
}

