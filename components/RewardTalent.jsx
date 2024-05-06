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
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { baseURL } from './constants';


const RewardTalent = ({ navigation }) => {
    const { selectedSubmission, selectedBounty, userData, balance, balanceASTR } = useData();
    const [paymentLoader, setPaymentLoader] = useState(false);
    const [paymentDone, setPaymentDone] = useState(false);
    const [hash, setHash] = useState('');

    const makePayment = async () => {
      if(balance < 0.1 || balanceASTR < selectedBounty?.reward){
        Alert.alert("You don't have enough balance, please top up")
        return
      } else {
      setPaymentLoader(true);
      try {
          const key = await AsyncStorage.getItem('PrivateKey');
          const mint = await axios.post(`${baseURL}/sendASTR`, {
              senderAddress: userData?.walletAddress,
              privateKey: key,
              receiverAddress : selectedSubmission?.walletAddress,
              amount : selectedBounty?.reward
          });
  
          if (mint && mint.data) {
              console.log(mint.data);
              setPaymentLoader(false);
              setPaymentDone(true);
              setHash(`https://moonscan.io/tx/${mint.data.reponseObject.transactionHash}`)
          }
      } catch (error) {
          console.error("Error making payment:", error);
          setPaymentLoader(false);
      }
    }
  };

  const makePaymentXcm = async () => {
    if(balance < 0.1 || balanceASTR < selectedBounty?.reward){
      Alert.alert("You don't have enough balance, please top up")
      return
    } else {
    setPaymentLoader(true);
    try {
        const key = await AsyncStorage.getItem('PrivateKey');
        const mint = await axios.post(`${baseURL}/sendASTRxcm`, {
            privateKey: key,
            receiverAddress : selectedSubmission?.walletAddress,
            amount : selectedBounty?.reward.toString()
        });

        if (mint && mint.data) {
            console.log(mint.data);
            setPaymentLoader(false);
            setPaymentDone(true);
            setHash(`https://moonscan.io/tx/${mint.data.reponseObject.transactionHash}`)
            //navigation.navigate('SendBadge')
        }
    } catch (error) {
        console.error("Error making payment:", error);
        setPaymentLoader(false);
    }
  }
};

const continuenow = () => {
  navigation.navigate('SendBadge')
}

const handleOpenURL = () => {
  if (hash) {
    Linking.canOpenURL(hash)
      .then(supported => {
        if (!supported) {
          return Linking.openURL(hash);
        } else {
          return Linking.openURL(hash);
        }
      })
      .catch(error => {
        console.error('Error occurred while checking URL support:', error);
      });
      }
    };

    console.log('HASH ========== ', hash)

    return (
        <View style={styles.container}>
            <View style={{position : "absolute", top : "7%", left : "5%", width : "90%", height : "90%"}}>
            <TouchableOpacity onPress={()=>{navigation.navigate('BountyDetailClient')}}>
            <Text style={{color : "#000", fontSize : 14, marginBottom : 20}}>{'<- Back'}</Text>
            </TouchableOpacity>

                <Text style={{fontSize : 30, color : "#000", fontFamily : "Inter-Regular", marginLeft : "12%", marginTop : 50}}>Reward the talent</Text>
                <View style={{flexDirection : "row", alignItems : "center", marginLeft : "27%", marginTop : 30}}>
                <Text style={{fontSize : 30, color : "#000", fontFamily : "Inter-Regular", marginRight : 10}}>{selectedBounty?.reward} ASTR</Text>
                </View>

                <View style={{flexDirection : "row", width : "100%", justifyContent :selectedSubmission?.network === 'Astar' ? "space-between" : "center", alignItems : "center", padding : 30}}>
                <View style={{alignItems : "center"}}>
                <Image source={require("../assets/Images/moonbeam.png")} style={{width : 80, height : 80}}/>
                <Text style={{fontSize : 20, color : "#000", fontFamily : "Inter-Regular"}}>Moonbeam</Text>
                </View>
                {selectedSubmission?.network === 'Astar' && (
                <>
                <Image source={require("../assets/Images/Arrow2.png")} style={{width : 80, height : 30, marginTop : -30}}/>
                <View style={{alignItems : "center"}}>
                <Image source={require("../assets/Images/bountie.png")} style={{width : 80, height : 80}}/>
                <Text style={{fontSize : 20, color : "#000", fontFamily : "Inter-Regular"}}>Astar</Text>
                </View>
                </>
                )}
                </View>

                <TouchableOpacity onPress={()=>{
                  !paymentDone && selectedSubmission?.network === 'Astar' ? makePaymentXcm() 
                  : !paymentDone && selectedSubmission?.network !== 'Astar' ? makePayment()
                  : continuenow()
                }} style={{position : "absolute", width : "100%", height : 50, borderRadius : 4, backgroundColor : "#000", alignItems : "center", justifyContent : "center", bottom : 40}}>
                  {paymentLoader ? (
                    <ActivityIndicator/>
                  ) :paymentDone ? (
                    <Text style={{fontSize : 20, fontFamily : "Inter-Regular", color : "#fff"}}>Continue</Text>
                  ) : (
                    <Text style={{fontSize : 20, fontFamily : "Inter-Regular", color : "#fff"}}>Complete Payment</Text>
                  )}
                </TouchableOpacity>

                {paymentDone && (
                  <TouchableOpacity style={{position : "absolute", bottom : 15, alignItems : "center", width : "100%"}} onPress={handleOpenURL}>
                  <Text style={{fontSize : 14, fontFamily : "Inter-Regular", color : "#000", textDecorationLine : "underline", }}>Check Transfer on Explorer</Text>
                  </TouchableOpacity>
                )}

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
    
    export default RewardTalent;
    