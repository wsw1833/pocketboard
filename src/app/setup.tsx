import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native"
import { Link } from "expo-router";
import { useState } from "react";


export default function Teste() {
    const [choose, setChoose] = useState('setup');
    return (
        <ScrollView>
            <View className="flex py-10 px-8 gap-3 justify-between">
                <View className="my-auto">
                    <View className="my-auto">
                        <Text className="text-2xl">First time here?</Text>
                        <Text className="text-5xl mt-4 mb-12">Choose a role.</Text>
                    </View>
                    <View className="gap-5 my-auto">
                        <TouchableOpacity className={`${choose == 'sponsor' ? 'opacity-100' : 'opacity-50'} border border-black rounded-lg p-6`} onPress={() => setChoose('sponsor')}>
                            <Image className="w-22 h-18" source={require('assets/images/bulb.png')} />
                            <Text className="mb-4 text-xl">Looking for talent?</Text>
                            <Text className="text-[12px]">List bounties for your next project and find the next talent which fits your need. It is 100% free!</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className={`${choose == 'talent' ? 'opacity-100' : 'opacity-50'} border border-black rounded-lg p-6`} onPress={() => setChoose('talent')}>
                            <Image className="w-22 h-18" source={require('assets/images/pc.png')} />
                            <Text className="mb-4 text-xl ">Looking for work?</Text>
                            <Text className="text-[14px]">Access to bounties from top crypto projects in the space & build up your portfolio in Web3.0. Start earning with your preferred crypto.</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Link suppressHighlighting
                    className="fle text-2xl h-16 pt-4 items-center justify-center overflow-hidden rounded-md bg-gray-900 px-4 py-2 font-medium text-gray-50 web:shadow ios:shadow transition-colors hover:bg-gray-900/90 active:bg-gray-400/90 web:focus-visible:outline-none web:focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300 text-center"
                    href={`/${choose}`}
                >Setup my talent profile</Link>
            </View>
        </ScrollView>
    )
}