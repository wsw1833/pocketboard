import React from 'react';
import { Button, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function App() {
    const navigation = useNavigation();

    return (
        <View>
            <Button title="Connect to Astar" color="" onPress={() => navigation.navigate('two')} />
        </View>
    );
}