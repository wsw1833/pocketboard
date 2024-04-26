import { View, Image, Text, TouchableOpacity, ScrollView } from "react-native"
import { useState } from "react";
import { Link } from "expo-router";
import Icon from 'react-native-vector-icons/AntDesign';
import IconC from 'react-native-vector-icons/Fontisto';


export default function JobListing() {
    const [projectName, setProjectName] = useState('Create a dashboard');
    const [creator, setCreator] = useState('Astar');
    const [contract, setContract] = useState('Smart Contract');
    const [cronos, setCronos] = useState('6d:15h:1m');
    const [dot, setDot] = useState(100)


    const BackIcon = () => <Icon name="arrowleft" size={16} color="#000" className="ml-2" />;
    const DownloadIcon = () => <Icon name="download" size={16} color="#000" className="ml-2" />;
    const CronosIcon = () => <IconC name="stopwatch" size={24} color="#000" className="ml-2" />;

    return (
        <ScrollView>
            <View className="px-8 py-20 flex flex-col">
                <Link href={'/bountylisting'} className="flex flex-row">
                    <BackIcon />
                    <Text className="ml-1">Back</Text>
                </Link>
                <Image className="rounded-full w-14 h-14 mt-10 mb-10" source={require('assets/images/bountie.png')} />
                <Text className="text-3xl">{projectName}</Text>
                <Text className="text-sm mt-2">By {creator}</Text>
                <View className="flex flex-row">
                    <View className="p-2 bg-green-100 mt-4 mb-4 justify-between">
                        <Text className="text-sm">{contract}</Text>
                    </View>
                </View>
                <View className="flex flex-row mb-8">
                    <View className="flex flex-row">
                        <Image className="rounded-full w-5 h-5 self-center " source={require('assets/images/bountie.png')} />
                        <View className="flex flex-row items-end gap-1">
                            <Text className="text-2xl ml-2">{dot}</Text>
                            <Text className="text-sm text-slate-400">DOT</Text>
                        </View>
                    </View>
                    <View className="flex flex-row items-center ml-8">
                        <CronosIcon />
                        <Text className="text-2xl ml-2">{cronos}</Text>
                    </View>
                </View>
                <View className="mb-8">
                    <View className="mb-4">
                        <Text className="text-lg">Bounty Description</Text>
                        <View className="border w-40"></View>
                    </View>
                    <Text className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
                </View>
                <View>
                    <Text className="text-lg">Detail Attachment</Text>
                    <TouchableOpacity className="flex flex-row border rounded-md mt-4 p-4 justify-between items-center text-center">
                        <Text className="">detail.pdf</Text>
                        <DownloadIcon />
                    </TouchableOpacity>
                </View>
                <Link href={'/bountysubmition'} className="bg-black text-white items-center text-center p-4 rounded mt-8">Complete bounty submission</Link>
            </View>
        </ScrollView>
    )
}