import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native"
import { Link } from "expo-router";
import { useState } from "react";


export default function Setup() {
    const [choose, setChoose] = useState('setup');
    return (
        
            <View className="flex px-8 h-screen">
                <View className="my-auto ">
                    <View className="">
                        <Text className="text-2xl">First time here?</Text>
                        <Text className="text-5xl mt-4 mb-12">Choose a role.</Text>
                    </View>
                    <View className="gap-5">
                        <TouchableOpacity className={`${choose == 'talent' ? 'opacity-100' : 'opacity-50'} border border-black rounded-lg p-6`} onPress={() => setChoose('talent')}>
                            <Image className="w-22 h-18 mb-2" source={require('assets/images/bulb.png')} />
                            <Text className="mb-4 text-xl">Looking for talent?</Text>
                            <Text className="text-sm">List bounties for your next project and find the next talent which fits your need. It is 100% free!</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className={`${choose == 'sponsor' ? 'opacity-100' : 'opacity-50'} border border-black rounded-lg p-6`} onPress={() => setChoose('sponsor')}>
                            <Image className="w-22 h-18 mb-2" source={require('assets/images/pc.png')} />
                            <Text className="mb-4 text-xl ">Looking for work?</Text>
                            <Text className="text-sm">Access to bounties from top crypto projects in the space & build up your portfolio in Web3.0. Start earning with your preferred crypto.</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                    <Link href={`/${choose}`} className="w-full h-14 mt-6"></Link>
                    <View className="flex flex-1 w-full h-full rounded text-center min-w-full">
                        <View className="flex flex-row my-auto h-14 -mt-14 z-100 bg-black rounded-lg pointer-events-none">
                            <Text className="flex flex-row mx-auto text-white my-auto text-xl">Setup my talent profile</Text>
                        </View>
                    </View>
                </View>
                </View>
            </View>
        
    )
}

