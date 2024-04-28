import { Link } from "expo-router";
import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Page() {
    return (
        <View className="flex h-screen p-10">
            <Content />
        </View>
    );
}

function Content() {
    return (
        <View className="flex my-auto justify-between h-full">
            <View className="my-auto">
                <Text className="text-xl">Welcome to Pocket Board</Text>
                <Text className="text-5xl mt-8">Where Talents</Text>
                <Text className="text-5xl mt-4">Without Borders.</Text>
            </View>
            <Image className="self-center h-960" source={require('assets/images/hand.png')} />
            <View className="">
                <View>
                    <Link href={'/setup'} className="w-full h-14 mt-8"></Link>
                    <View className="flex flex-1 w-full h-full rounded text-center min-w-full">
                        <View className="flex flex-row my-auto h-14 -mt-14 z-100 bg-black rounded-lg pointer-events-none">
                            <View className="flex flex-row mx-auto">
                                <Image className="h-5 my-auto mr-4" source={require('assets/images/logo-button.png')} />
                                <Text className="self-center text-white text-xl ">Connect to Astar</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <Text className="self-center mt-4 opacity-50">Powered by Wallet Conenct</Text>
            </View>
        </View>
    );
}


