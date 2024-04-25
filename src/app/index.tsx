import { Link } from "expo-router";
import React from "react";
import { Text, View, Image } from "react-native";
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
                <Text className="text-md">Welcome to Pocket Board</Text>
                <Text className="text-4xl mt-8">Where Talents</Text>
                <Text className="text-4xl mt-2">Without Borders.</Text>
            </View>
            <Image className="self-center h-960" source={require('assets/images/hand.png')} />
            <View className="my-auto flex ">
                <Link
                    suppressHighlighting
                    className="flex h-16 pt-4 text-2xl items-center justify-center overflow-hidden rounded-md bg-gray-900 px-4 py-2 font-medium text-gray-50 web:shadow ios:shadow transition-colors hover:bg-gray-900/90 active:bg-gray-400/90 web:focus-visible:outline-none web:focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300 text-center"
                    href="/setup"
                >
                    {/* <Image className="h-5" source={require('assets/images/logo-button.png')} /> */}
                <Text>Connect to Astar</Text></Link>
                <Text className="self-center mt-4 opacity-50">Powered by Wallet Conenct</Text>
            </View>
            
        </View>
    );
}
