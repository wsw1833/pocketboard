import { View, Image, Text, TouchableOpacity, ScrollView } from "react-native"
import { useState } from "react";
import { Link } from "expo-router";
import Icon from 'react-native-vector-icons/AntDesign';
import IconC from 'react-native-vector-icons/Fontisto';


export default function Medal() {
    const [projectName, setProjectName] = useState('Create a dashboard');
    const [creator, setCreator] = useState('Astar');
    const [contract, setContract] = useState('Smart Contract');
    const [cronos, setCronos] = useState('6d:15h:1m');
    const [dot, setDot] = useState(100);
    const [openSubmission, setOpenSubmission] = useState(false);
    // const [submissions, setSubmissions] = useState(0);

    const submissions = [{
        name: "Jimmy Tan",
        date: "30 April 2024"
    }, {
        name: "John Wayne",
        date: "30 April 2024"
    }
    ]

    const BackIcon = () => <Icon name="arrowleft" size={16} color="#000" className="ml-2" />;
    const DownloadIcon = () => <Icon name="download" size={16} color="#000" className="ml-2" />;
    const CronosIcon = () => <IconC name="stopwatch" size={24} color="#000" className="ml-2" />;

    return (
        <ScrollView>
            <View className="px-8 py-20 flex flex-col">
                <Link href={'/companyprofile'} className="flex flex-row">
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
                    <View>
                        <Text className="text-lg">Detail Attachment</Text>
                        <View className="border w-[130px]"></View>
                    </View>
                    <TouchableOpacity className="flex flex-row border rounded-md mt-4 p-4 justify-between items-center text-center">
                        <Text className="">detail.pdf</Text>
                        <DownloadIcon />
                    </TouchableOpacity>
                </View>
                <View className="flex flex-row mt-6 items-end">
                    <TouchableOpacity className="flex flex-row" onPress={() => setOpenSubmission(!openSubmission)}>
                        <View>
                            <Text>Submission</Text>
                            <View className="border"></View>
                        </View>
                        <View className="ml-2 rounded-full bg-black w-6 h-6 text-center items-center">
                            <Text className="text-white my-auto">{submissions.length}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View className='w-full'>
                    {submissions.map((person, index) =>
                        <View key={index} className="w-full mt-4">
                            <Link href={'/acceptpage'} className="h-24"></Link>
                            <View className={`${index == 0 ? 'border-4' : 'border'} flex flex-row p-4 items-center rounded-lg w-full -mt-[87px] pointer-events-none`}>
                                <Image className="rounded-full w-14 h-14 self-center " source={require('assets/images/black.png')} />
                                <View className="ml-4 w-full">
                                    <Text className="text-xl">{person.name}</Text>
                                    <Text className="text-slate-400 text-sm">Submitted on {person.date}</Text>
                                </View>
                                <Text className={`${index == 1 ? 'hidden' : ''} -ml-28 text-4xl`}>🏅</Text>
                                <Image className={`${index == 1 ? '' : 'hidden'} -ml-28 w-10 h-12`} source={require('assets/images/baloom.png')} />
                            </View>
                        </View>
                    )}
                </View>
            </View>
        </ScrollView>
    )
}