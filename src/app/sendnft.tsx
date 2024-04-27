import { View, Text, Image, ScrollView } from "react-native"
import { Link } from "expo-router"
import { useState } from "react";


export default function SendNFT() {
    return (
        <View className="flex flex-col p-8 h-screen">
            <View className='my-auto'>
                <Text className="text4xl self-center text-4xl mb-14">Send talent a badge</Text>
                <Image className="rounded-full w-34 h-34 self-center mb-14" source={require('assets/images/bountie.png')} />


                <View className="w-full h-14 mb-4 mt-8">
                    <Link href={'/medal'} className="w-full h-14"></Link>
                    <View className="flex w-full h-full bg-black rounded text-center min-w-full -mt-[50px] pointer-events-none">
                        <Text className="self-center text-white mx-auto my-auto text-xl">Send NFT Badge to talent</Text>
                    </View>
                </View>


                <View className="mt-4 self-center">
                    <Text className="text-slate-400">Badge will be minted on Astar and </Text>
                    <Text className="text-slate-400">directly nested to the talent profile </Text>
                </View>
            </View>
        </View>
    )
}