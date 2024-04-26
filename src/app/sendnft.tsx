import { View, Text, Image, ScrollView } from "react-native"
import { Link } from "expo-router"
import { useState } from "react";


export default function SendNFT() {
    return (
        <View className="flex flex-col p-8 h-screen">
            <View className='my-auto'>
                <Text className="text4xl self-center text-4xl mb-14">Send talent a badge</Text>
                <Image className="rounded-full w-34 h-34 self-center mb-14" source={require('assets/images/bountie.png')} />
                <Link href={'/'} className="w-full h-14">
                    <View className="flex w-full h-full bg-black rounded text-center min-w-full">
                        <Text className="self-center text-white text-2xl mx-auto my-auto">Complete payment</Text>
                    </View>
                </Link>
                <View className="mt-4 self-center">
                    <Text className="text-slate-300">Badge will be minted on Astar and </Text>
                    <Text className="text-slate-300">directly nested to the talent profile </Text>
                </View>
            </View>
        </View>
    )
}