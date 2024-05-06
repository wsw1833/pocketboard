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
import AsyncStorage from '@react-native-async-storage/async-storage';


const SendBadge = ({ navigation }) => {
    const { selectedSubmission, userData, selectedBounty, setActionTaken, actionTaken, balance } = useData();
    const [mintLoader, setMintLoader] = useState(false);
    const [id, setId] = useState();
    const [hash, setHash] = useState('');
    const getToken = async () => {
      const token = await axios.post(`${baseURL}/getToken`)
      if(token.data){
        setId(token.data.tokenIds);
      }
    }
    const approvesubmission = async () => {
        const approve = await axios.post(`${baseURL}/approveSubmission`, {
            id : selectedBounty?._id, 
            submissionId : selectedSubmission?._id, 
            walletAddress : userData?.walletAddress,
            hash : hash
        })
        if(approve.data){
            setActionTaken(!actionTaken)
            navigation.navigate('BountyDetailClient')
            console.log(approve.data)
        }
    }

  const mintBadge = async () => {
    if(balance < 0.1){
      Alert.alert("You don't have enough balance, please top up")
      return
    } else {
    setMintLoader(true);
    try {
        const key = await AsyncStorage.getItem('PrivateKey');
        getToken();
        const mint = await axios.post(`${baseURL}/mintBadge`, {
            senderAddress: userData?.walletAddress,
            privateKey: key,
            receiverAddress : selectedSubmission?.walletAddress,
            URI: selectedBounty.badge,
            tokenId: id + 1
        });

        if (mint && mint.data) {
          const updateTokenRequest = axios.post(`${baseURL}/updateToken`);
          await Promise.all([updateTokenRequest]);
          console.log(mint.data);
          setHash(`https://moonscan.io/tx/${mint.data?.reponseObject?.transactionHash}`)
          setMintLoader(false);
          approvesubmission();
        }
    } catch (error) {
        console.error("Error minting profile:", error);
        setMintLoader(false);
    }
  }
};

    return (
        <View style={styles.container}>
            <View style={{position : "absolute", top : "7%", left : "5%", width : "90%", height : "90%"}}>
            <TouchableOpacity onPress={()=>{navigation.navigate('BountyDetailClient')}}>
            <Text style={{color : "#000", fontSize : 14, marginBottom : 20}}>{'<- Back'}</Text>
            </TouchableOpacity>

                <Text style={{fontSize : 34, color : "#000", fontFamily : "Inter-Regular", alignSelf : "center", marginTop : 50}}>Send talent a badge</Text>

                <Image source={{uri : selectedBounty?.badge}} style={{width : 150, height : 150, borderRadius : 100, alignSelf : "center", marginTop : 30}}/>

                <TouchableOpacity onPress={mintBadge} style={{ width : "100%", height : 50, borderRadius : 4, backgroundColor : "#000", alignItems : "center", justifyContent : "center", marginTop : 120}}>
                  {mintLoader ? (
                    <ActivityIndicator/>
                  ) : (
                    <Text style={{fontSize : 20, fontFamily : "Inter-Regular", color : "#fff"}}>Send NFT Badge to talent</Text>
                  )}        
                </TouchableOpacity>

                <Text style={{paddingHorizontal : 30, color : "#888888", fontFamily : "Inter-Regular", marginTop : 10, textAlign : "center"}}>
                Badge will be minted on Moonbeam and directly nested to the talent profile
                </Text>

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
        width : '95%',
        height : 50,
        borderRadius : 5,
        alignItems : "center",
        justifyContent : "center",
        marginTop : 30
      },
      choosefileview : {
        width : "100%",
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
    
    export default SendBadge;
    