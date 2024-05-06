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
  Linking,
} from 'react-native';
import {TouchableOpacity} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseURL } from './constants';
import { Colors } from './colors';
import { useData } from './datacontext';
import Clipboard from '@react-native-clipboard/clipboard';
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

const ClientProfile = ({ navigation }) => {
    const {wallet, setUserData, userData, setClickedItem, balance, setBalance, allBounties, setAllBounties, setSelectedBounty, setClientSelected, setTalentSelected, actionTaken, balanceASTR, setBalanceASTR, setIsTalent} = useData();
    const [showMenu, setShowMenu] = useState(false);

    const formatWalletAddress = (walletAddress) => {
      if (walletAddress?.length < 20) {
        return walletAddress; 
      }
    
      const first7 = walletAddress.slice(0, 7);
      const last7 = walletAddress.slice(-7);
      const dots = '...';
      const formattedAddress = `${first7}${dots}${last7}`;
    
      return formattedAddress;
    };

    const copyToClipboard = () => {
      Clipboard.setString(wallet);
      Alert.alert(wallet,'Copied')
    };

    const copyTwitter = () => {
      Clipboard.setString(userData?.client?.twitter);
      Alert.alert('Twitter username Copied')
    };
    const login = async () => {
      const sign = await axios.post(`${baseURL}/getProfile`, {
          walletAddress : wallet.toLowerCase()
      })
      if(sign.data){
          setUserData(sign.data.user);
      }
    }

  const fetchBalance = async () => {
    const balance = await axios.post(`${baseURL}/getBalance`, {
      walletAddress : userData?.walletAddress
    })
    if(balance){
      setBalance(balance.data.balance);
    }
  }

  const fetchTokenBalance = async () => {
    const balance = await axios.post(`${baseURL}/getASTRBalance`, {
      walletAddress : userData?.walletAddress
    })
    if(balance){
      setBalanceASTR(balance.data.resolvedBalance);
    }
  }

  const fetchBounties = async () => {
    const bounty = await axios.post(`${baseURL}/getAllBounties`)
    if(bounty.data){
      setAllBounties(bounty.data.bounties);
    }
  }
  
  useEffect(()=>{
    login()
    fetchBalance();
    fetchTokenBalance()
    fetchBounties()
  },[actionTaken])

  useEffect(()=>{
    login();
    fetchBounties()
  },[])

  useFocusEffect(
    React.useCallback(() => {
      fetchBounties();
    }, [])
  );

  const handleOpenURL = () => {
    if (userData?.client?.website) {
      Linking.canOpenURL(userData?.client?.website)
        .then(supported => {
          if (!supported) {
            return Linking.openURL(userData?.client?.website);
          } else {
            return Linking.openURL(userData?.client?.website);
          }
        })
        .catch(error => {
          console.error('Error occurred while checking URL support:', error);
        });
        }
      };

      console.log(allBounties)

    return (
            <TouchableOpacity style={styles.container} onPress={()=>{setShowMenu(false)}}>
            <TouchableOpacity onPress={()=>{setShowMenu(true)}}>
            <View style={{flexDirection : "row", alignItems : "flex-end", justifyContent : "flex-end", margin : 15, marginTop : 25}}>
                <Image source={require("../assets/Images/pp.png")}></Image>
            </View>
            </TouchableOpacity>

            <View style={{display : showMenu ? 'flex' : 'none', position : "absolute", width : "100%", height : 250, zIndex : 999, backgroundColor : "#fff", borderRadius : 20, alignItems : "center", justifyContent : "center"}}>
                <Text style={{fontFamily : "Inter-Regular", fontSize : 24, color : "#000", marginBottom : 20}}>My Sponsor Profile</Text>
                <TouchableOpacity onPress={()=>{
                    if(userData?.serviceProvider){
                    navigation.navigate('Profile')
                    setShowMenu(false)
                    } else {
                        setTalentSelected(true);
                        setClientSelected(false);
                        navigation.navigate('CreateProfile')
                        setShowMenu(false)
                    }
                    }} style={{backgroundColor : "#000", height : 50, width : "80%", borderRadius : 4, alignItems : "center", justifyContent : "center"}}>
                    <Text style={{color : "#fff", fontFamily : "Inter-Regular", fontSize : 18}}>Switch to Talent profile</Text>
                </TouchableOpacity>
                <View style={{borderWidth : 0.3, borderColor : "rgba(0,0,0,0.5)", margin: 20, width : "60%"}}></View>
                <TouchableOpacity onPress={()=>{navigation.navigate('Splash')}} style={{backgroundColor : "#FFE4E4", height : 50, width : "80%", borderRadius : 4, alignItems : "center", justifyContent : "center"}}>
                    <Text style={{color : "#FF4545", fontFamily : "Inter-Regular", fontSize : 18}}>Disconnect Wallet</Text>
                </TouchableOpacity>
            </View>

            {showMenu && (
          <TouchableOpacity style={styles.overlay} onPress={()=>{setShowMenu(false)}}>
          </TouchableOpacity>
        )}
          
            <View style={{justifyContent : "center", alignItems : "center", marginTop : 4}}>
            <Image
              source={{ uri: userData?.client?.logo }} style={{width : 150, height : 150, borderRadius : 100}}/>
                <Text style={{fontWeight : "500", fontSize : 18, color : "#000000", margin : 10, fontFamily : "Inter-Bold"}}>{userData?.client?.companyName}</Text>

                <TouchableOpacity onPress={copyToClipboard}>
                <View style={{flexDirection : 'row', alignItems : "center", fontFamily : "Inter-Regular"}}>
                <Text style={{fontWeight : "400", fontSize : 14, color : "#000000", margin : 10, fontFamily : "Inter-Regular"}}>{formatWalletAddress(userData?.walletAddress)}</Text>
                <Image source={require("../assets/Images/copy.png")} style={{width : 20, height : 20}}></Image>
                </View>
                </TouchableOpacity>
              

                <View style={{flexDirection : 'row', alignItems : "center"}}>
                <Text style={{fontWeight : "400", fontSize : 14, color : "#000000", margin : 10,fontFamily : "Inter-Regular"}}>Balance : {balance ? `${balance} GLMR` : 'Loading Balance ...'}</Text>
                </View>

                <View style={{flexDirection : 'row', alignItems : "center"}}>
                <Text style={{fontWeight : "400", fontSize : 14, color : "#000000", margin : 10,fontFamily : "Inter-Regular"}}>ASTR Balance : {balanceASTR ? `${balanceASTR} ASTR` : 'Loading Balance ...'}</Text>
                </View>

                <TouchableOpacity onPress={handleOpenURL} style={{flexDirection : 'row', alignItems : "center"}}>
                <Image source={require("../assets/Images/website.png")}/>
                <Text style={{fontWeight : "400", fontSize : 14, color : "#000000", margin : 10, fontFamily : "Inter-Regular"}}>{userData?.client?.website}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={copyTwitter} style={{flexDirection : 'row', alignItems : "center"}}>
                  <Image source={require("../assets/Images/twitter.png")}/>
                <Text style={{fontWeight : "400", fontSize : 14, color : "#000000", margin : 10, fontFamily : "Inter-Regular"}}>@{userData?.client?.twitter}</Text>
                </TouchableOpacity>
            </View>
            
            
            <View style={{borderBottomColor : "rgba(0,0,0,0.5)", borderBottomWidth : 1, flexDirection : "row", justifyContent : "space-between", paddingTop : 30, paddingBottom : -15, paddingHorizontal : 20, alignItems : "center"}}>
              <Text style={{color : "#000", borderBottomColor : "rgba(0,0,0,1)", borderBottomWidth : 2, paddingBottom : 25, fontSize : 18}}>Created Bounty</Text>
              <TouchableOpacity onPress={()=>{navigation.navigate('BountySetup')}} style={{borderRadius : 4, borderColor : "#000", borderWidth : 1, padding : 10, alignSelf : "center", marginBottom : 10}}>
                <Text style={{color : "#000"}}>+ New Listing</Text>
              </TouchableOpacity>
            </View>

            <ScrollView>
              {allBounties && allBounties.filter(item => item.bountyOwner === userData?.walletAddress).map((item, index) => (
                <TouchableOpacity onPress={()=>{setSelectedBounty(item); setIsTalent(false); navigation.navigate('BountyDetailClient')}} key={index} style={{borderRadius : 4, borderColor : "rgba(0,0,0,0.5)", borderWidth : 1, flexDirection : "row", margin : 10, justifyContent : "space-between", padding : 10, alignItems : "center"}}>
                  <View style={{flexDirection : "row", alignItems : "center"}}>
                  <Image source={{uri : item?.badge}} style={{width : 60, height : 60, borderRadius : 100}}/>
                  <View style={{flexDirection:"column", marginLeft : 15}}>
                  <Text style={{color : "#000", fontSize : 16, fontFamily : "Inter-Regular"}}>{item?.title}</Text>
                  <Text style={{color : "#000", fontSize : 12, fontFamily : "Inter-Regular"}}>by {item.createdBy}</Text>
                  <Text style={{color : "#000", fontSize : 10, fontFamily : "Inter-Regular"}}>Due Date {(item?.dueDate)}</Text>
                  </View>
                  </View>
                  <Text style={{color : "#000", fontSize : 14, fontFamily : "Inter-Bold"}}>{item?.reward} ASTR</Text>
                </TouchableOpacity>
                )) 
              }
            </ScrollView>
        </TouchableOpacity>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor : "#fff"
      },
      button : {
        color : "#000",
        backgroundColor : Colors.yellow,
        width : 300,
        height : 50,
        borderRadius : 5,
        alignItems : "center",
        justifyContent : "center",
        margin : 30
      },
      overlay: {
        ...StyleSheet.absoluteFillObject, 
        backgroundColor: '#D9D9D9', 
        zIndex : 0
      },
    });
    
    export default ClientProfile;
    