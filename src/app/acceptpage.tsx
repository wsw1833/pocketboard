import { View, Text, Image, ScrollView } from "react-native"
import { Link } from "expo-router"
import { useState } from "react";


export default function AcceptPage() {
    const [nSub, setNsub] = useState(0);
    const [sName, setSName] = useState('Jimy Tan');
    const [subOn, setSubOn] = useState('30 April 2024');
    const [linkSub, setLinkSub] = useState('www.exemple.com');
    const [comments, setComments] = useState('Here are some sample comments.');
    const [network, setNetwork] = useState('Moonbeam');

    return (
        <ScrollView>
            <View className="p-10">
                <Text className="text-4xl">Submission #{nSub}</Text>
                <Text className="mt-4 mb-2 text-slate-400">Author</Text>
                <View className="flex flex-row items-center rounded border p-4">
                    <Image className="rounded-full w-14 h-14 self-center " source={require('assets/images/black.png')} />
                    <View className="ml-4 flex justify-between">
                        <Text>{sName}</Text>
                        <Text>Submitted on {subOn}</Text>
                    </View>
                </View>
                <Text className="mt-6 mb-2 text-slate-400">Link to submission</Text>
                <View className="p-4 rounded border">
                    <Text>{linkSub}</Text>
                </View>
                <Text className="mt-6 mb-2 text-slate-400">Comments</Text>
                <View className="border rounded p-4 h-36">
                    <Text>{comments}</Text>
                </View>
                <Text className="mt-6 mb-2 text-slate-400">Reward receiving network</Text>
                <View className="border rounded p-4">
                    <Text className="">{network}</Text>
                </View>
                <Link href={'/confirmpage '} className="h-14 mt-6 mb-4">
                    <View className="flex w-full h-full bg-green-200 rounded mx-auto my-auto min-w-full">
                        <Text className="self-center text-green-900 mx-auto my-auto">Approve the work</Text>
                    </View>
                </Link>
                <Link href={'/bountypage'} className="w-full h-14">
                    <View className="flex w-full h-full bg-red-200 rounded text-center min-w-full">
                        <Text className="self-center text-red-700  mx-auto my-auto">Reject the work</Text>
                    </View>
                </Link>
            </View>
        </ScrollView>
    )
}