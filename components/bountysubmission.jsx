import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  Image,
  Alert,
  Touchable,
  Vibration,
  ActivityIndicator,
  Platform,
  ScrollView,
  Linking
} from 'react-native';
import {TouchableOpacity} from 'react-native';
import { useData } from './datacontext';
import axios from 'axios';
import { baseURL } from './constants';


const BountySubmission = ({ navigation }) => {
    const { selectedBounty, userData } = useData();
    const [link, setLink] = useState('');
    const [comments, setComments] = useState('');
    const networks = [
        "Moonbeam",
        "Astar"
    ]
    const [network, setNetwork] = useState(networks[0])
    const [menuOpen, setMenuOpen] = useState(false);

    const makeSubmission = async () => {
        const submit = await axios.post(`${baseURL}/makeSubmission`, {
            id : selectedBounty?._id, 
            walletAddress : userData?.walletAddress, 
            link, 
            network, 
            comment : comments
        })
        if(submit.data){
            navigation.navigate('Profile')
        }
    }

    return (
        <View style={styles.container}>
            <View style={{display : menuOpen ? 'flex' : 'none', position : "absolute", bottom : 0, backgroundColor : "rgba(255,255,255,1)", borderColor : 'rgba(0,0,0,0.5)', borderWidth : 1, zIndex : 999, width : "100%", height : "20%", alignItems : "center", borderRadius : 10}}>
                    <TouchableOpacity onPress={() => setMenuOpen(!menuOpen)}></TouchableOpacity>
                    <ScrollView >
                        {networks.map((type, index) =>
                            <TouchableOpacity key={index} onPress={() => { setMenuOpen(!menuOpen), setNetwork(type) }}>
                                <Text style={{color : "#000", fontSize : 20, fontFamily : "Inter-Regular"}}>{type}</Text>
                            </TouchableOpacity>
                        )}
                    </ScrollView>
                </View>

            <View style={{position : "absolute", top : "7%", left : "5%"}}>
            <TouchableOpacity onPress={()=>{navigation.navigate('Profile')}}>
            <Text style={{color : "#000", fontSize : 14, marginBottom : 20}}>{'<- Back'}</Text>
            </TouchableOpacity>

            <Text style={{fontFamily : "Inter-Regular", fontSize : 12, color : "#000"}}>Great Job!</Text>
            <Text style={{fontFamily : "Inter-Regular", fontSize : 30, color : "#000"}}>Bounty Submission</Text>

            <View style={{width : '90%', marginTop : 20}}>
            <Text style={{marginLeft : 10}}>Link to Submission</Text>
            <TextInput
            value={link}
            onChangeText={(text)=>{setLink(text)}}
            placeholder='Provide link for submission'
            placeholderTextColor={'rgba(0,0,0,0.5)'}
            style={{
                margin : 10,
                padding : 10,
                paddingHorizontal : 40,
                borderRadius : 5,
                borderColor : '#B2B2B2',
                borderWidth : 1,
                width : "100%",
                justifyContent : "center",
                alignItems : "center"
            }}
            />
            </View>

            <View style={{width : '90%'}}>
            <Text style={{marginLeft : 10}}>Comments</Text>
            <TextInput
            value={comments}
            onChangeText={(text)=>{setComments(text)}}
            placeholder='Provide Comments'
            placeholderTextColor={'rgba(0,0,0,0.5)'}
            style={{
                margin : 10,
                padding : 10,
                paddingHorizontal : 40,
                borderRadius : 5,
                borderColor : '#B2B2B2',
                borderWidth : 1,
                height : 60,
                width : "100%",
            }}
            />
            </View>

            <Text style={{fontFamily : "Inter-Regular", fontSize : 20, color : "#000", textDecorationLine : "underline", marginTop : 20}}>Token Assets for Bounty</Text>
            <Text style={{fontFamily : "Inter-Regular", fontSize : 12, color : "#000", marginTop : 20, paddingRight : 30, marginBottom : 20}}>When creating the bounty, sponsor will always fund their task with token assets on Moonbeam Network. 
                However, if you’re want to receive it on another chain, it is possible on Pocket Board. Thanks to the XCM technology!</Text>

            <View style={{width : '90%'}}>
            <Text style={{marginLeft : 10}} >Network</Text>
            <TouchableOpacity style={{
              margin : 10,
              padding : 10,
              paddingHorizontal : 40,
              borderRadius : 5,
              borderColor : '#B2B2B2',
              borderWidth : 1,
              width : "100%",
              justifyContent : "space-between",
              alignItems : "center",
              flexDirection : "row"
            }}
            onPress={()=>{setMenuOpen(true)}}
            >
            <Text style={{fontSize : 20}}>{network}</Text>
            <Image source={require("../assets/Images/Polygon.png")}/>
            </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.button} onPress={makeSubmission}>
                <Text style={{fontWeight : "500", fontSize : 20, color : "#fff", fontFamily : "Inter-Regular"}} >Submit my work</Text>
            </TouchableOpacity>
            </View>

        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor  : "#fff"
      },
      button : {
        backgroundColor : "#000",
        width : '92%',
        height : 50,
        borderRadius : 5,
        alignItems : "center",
        justifyContent : "center",
        marginTop : 30
      },
      choosefileview : {
        width : "95%",
        height : 40,
        margin : 10,
        marginLeft : 10,
        borderRadius : 5,
        backgroundColor : "rgba(0,0,0,0)",
        justifyContent : "space-evenly",
        alignSelf : "center",
        alignItems : "center",
        zIndex : 999,
        borderColor : "rgba(0,0,0,0.4)",
        borderWidth : 0.5,
        flexDirection : "row",
        
      },
      inputContainer: {
        margin: 10,
        padding: 10,
        paddingHorizontal: 40,
        borderRadius: 5,
        borderColor: '#B2B2B2',
        borderWidth: 1,
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection : "row"
      },
    });
    
    export default BountySubmission;
    