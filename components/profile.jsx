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

const Profile = ({ navigation }) => {
    const {wallet, setUserData, userData, setClickedItem, balance, setBalance, allBounties, setAllBounties, setTalentSelected, setClientSelected, actionTaken, privateKey,  balanceASTR, setBalanceASTR, setSelectedBounty, setIsTalent, selectedBounty} = useData();
    const [selectedTab, setSelectedTab] = useState('bounty');
    const [showMenu, setShowMenu] = useState(false);
    const [id, setId] = useState();
    const [action, setAction] = useState(false);
    const [showHandshake, setShowHandshake] = useState(false);
    const [showBadge, setShowBadge] = useState(false);
    const [mintLoader, setMintLoader] = useState(false);
    const [handshakeLoader, setHandshakeLoader] = useState(false);

    const formatWalletAddress = (walletAddress) => {
      if (walletAddress?.length < 20) {
        return walletAddress; 
      }
    
      const first7 = walletAddress?.slice(0, 7);
      const last7 = walletAddress?.slice(-7);
      const dots = '...';
      const formattedAddress = `${first7}${dots}${last7}`;
    
      return formattedAddress;
    };

    const copyToClipboard = () => {
      Clipboard.setString(wallet);
      Alert.alert(wallet,'Copied')
    };

    const copyTwitter = () => {
      Clipboard.setString(userData?.serviceProvider?.twitter);
      Alert.alert('Twitter username Copied')
    };

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
  const getToken = async () => {
    const token = await axios.post(`${baseURL}/getToken`)
    if(token.data){
      setId(token.data.tokenIds);
    }
  }
  
  useEffect(()=>{
    fetchBalance();
    fetchTokenBalance();
    fetchBounties();
    getToken();
  },[actionTaken])

  useEffect(()=>{
    getToken();
  },[])

  useFocusEffect(
    React.useCallback(() => {
      fetchBounties();
    }, [])
  );

  const login = async () => {
    const sign = await axios.post(`${baseURL}/getProfile`, {
        walletAddress : wallet.toLowerCase()
    })
    if(sign.data){
        setUserData(sign.data.user);
    }
  }

  useEffect(()=>{
    login()
  },[action])

  const handleOpenURL = () => {
    if (selectedBounty?.badgeHash) {
      Linking.canOpenURL(selectedBounty?.badgeHash)
        .then(supported => {
          if (!supported) {
            return Linking.openURL(selectedBounty?.badgeHash);
          } else {
            return Linking.openURL(selectedBounty?.badgeHash);
          }
        })
        .catch(error => {
          console.error('Error occurred while checking URL support:', error);
        });
        }
      };

  
  const mintProfile = async () => {
   
    if(balance < 0.1){
      Alert.alert("You don't have enough balance, please top up")
      return
    } else {
    setMintLoader(true);
    try {
        const key = await AsyncStorage.getItem('PrivateKey');
        getToken();
        const mint = await axios.post(`${baseURL}/mintToken`, {
            senderAddress: wallet,
            privateKey: key,
            URI: "https://ipfs.io/ipfs/QmNVuH75Ecmy5S4oPwSysxHanT74qiEQQgjAwfEFFqvPdB/",
            tokenId: id + 1
        });

        if (mint && mint.data) {
            const updateTokenRequest = axios.post(`${baseURL}/updateToken`);
            const profileMintedRequest = axios.post(`${baseURL}/profileMinted`, {
                walletAddress: userData?.walletAddress,
                id: id + 1
            });

            // Execute batch requests concurrently
            await Promise.all([updateTokenRequest, profileMintedRequest]);

            console.log(mint.data);
            setMintLoader(false);
        }
    } catch (error) {
        console.error("Error minting profile:", error);
        // Handle error, maybe retry or show a user-friendly message
        setMintLoader(false);
    }
  }
};


  const emoteProfile = async () => {
    if (userData?.serviceProvider?.isMinted === false) {
      Alert.alert("Please mint the profile first")
      return
    }
    if(balance < 0.1){
      Alert.alert("You don't have enough balance, please top up")
      return
    } else {
    setHandshakeLoader(true);
    const key = await AsyncStorage.getItem('PrivateKey')
    const emote = await axios.post(`${baseURL}/emoteToken`, {
      senderAddress : wallet, 
      privateKey : key,
      tokenId : id + 1
    })
    if(emote.data){
      console.log(emote.data)
      await axios.post(`${baseURL}/giveHandshake`, {
        id : userData?._id,
        walletAddress : userData?.walletAddress
      })
      setAction(!action)
      setHandshakeLoader(false);
    }
  }
  }

  const show = async () => {
    if (userData?.serviceProvider?.isMinted === false) {
      Alert.alert("Please mint the profile first")
      return
    }
    setShowHandshake(true);
  }

  console.log(selectedBounty?.badgeHash)


    return (
      <>
      {showHandshake && <View style={{width : "70%", height : "60%", position : "absolute", marginLeft : "15%", top : "20%", zIndex : 999999999, backgroundColor : "#fff", borderRadius : 10}}>
              <ScrollView>
                <View style={{margin : 10}}>
                <Text style={{fontSize : 16, color : "#000", fontFamily : "Inter-Regular"}}>{userData?.serviceProvider?.name} got</Text>
                <View style={{flexDirection : "row", alignItems : "center"}}>
                <Text style={{fontSize : 24, color : "#000", fontFamily : "Inter-Regular"}}>{userData?.serviceProvider?.handshakes.length} Handshakes</Text>
                <Image source={require("../assets/Images/shake.png")} style={{width : 30, height : 30}}/>
                </View>
                </View>
                {userData?.serviceProvider?.handshakes.map((item, index)=>(
                   <View key={index} style={{ flexDirection: "row", alignItems: "center", marginHorizontal : 10, marginVertical : 5, borderRadius : 4, borderWidth : 0.5, borderColor : "rgba(0,0,0,0.5)", padding : 10 }}>
                   <Image
                     source={{ uri: item?.image }}
                     style={{ width: 60, height: 60, borderRadius : 100 }}
                   />
                   <View style={{ flexDirection: "column", marginLeft: 15 }}>
                     <Text style={{ color: "#000", fontSize: 16, fontFamily: "Inter-Regular" }}>{item?.name}</Text>
                     <Text style={{ color: "#000", fontSize: 8, fontFamily: "Inter-Regular" }}>Handshake on {item?.date}</Text>
                   </View>
                 </View>
                ))}
              </ScrollView>
            </View>}

            {showBadge && <View style={{width : "80%", height : "60%", position : "absolute", marginLeft : "10%", top : "20%", zIndex : 999999999, backgroundColor : "#fff", borderRadius : 10}}>
                <View style={{margin : 10, alignItems : "center"}}>
                <Text style={{fontSize : 30, color : "#000", fontFamily : "Inter-Regular", marginVertical : 20}}>About the Badge</Text>
                <Image source={{uri : selectedBounty?.badge}} style={{width : 100, height : 100, borderRadius : 100}}/>
                <TouchableOpacity onPress={handleOpenURL}>
                <Text style={{fontSize : 14, textDecorationLine : "underline", color : "#000", fontFamily : "Inter-Regular", marginVertical : 20}}>View on Moonscan</Text>
                </TouchableOpacity>
                </View>
                  <>
                  <Text style={{fontSize : 12, color : "#000", fontFamily : "Inter-Regular", marginHorizontal : 18}}>Related Bounty</Text>
                   <View  style={{ flexDirection: "row", alignItems: "center", marginHorizontal : 5, marginVertical : 5, borderRadius : 4, borderWidth : 0.5, borderColor : "rgba(0,0,0,0.5)", padding : 10 }}>
                   <Image
                     source={{ uri: selectedBounty?.badge }}
                     style={{ width: 60, height: 60, borderRadius : 100 }}
                   />
                   <View style={{ flexDirection: "column", marginLeft: 15 }}>
                   <Text style={{ color: "#000", fontSize: 14, fontFamily: "Inter-Regular" }}>{selectedBounty?.title}</Text>
                <Text style={{ color: "#000", fontSize: 10, fontFamily: "Inter-Regular" }}>by {selectedBounty?.createdBy}</Text>
                <Text style={{ color: "#000", fontSize: 6, fontFamily: "Inter-Regular" }}>Completed on {selectedBounty?.dueDate}</Text>
                   </View>
                   <Text style={{ color: "#000", fontSize: 12, fontFamily: "Inter-Bold" , marginLeft : 20}}>{selectedBounty?.reward} ASTR</Text>
                 </View>
                 </>
                
            </View>}
        <View  style={styles.container}>
          <View style={{flexDirection : "row", justifyContent : "space-between"}}>
            <TouchableOpacity onPress={()=>{navigation.navigate('BountiesPage')}} style={{flexDirection : "row", alignItems : "center", margin : 15, marginTop : 25}}>
                <Image source={require("../assets/Images/home.png")}></Image>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{setShowMenu(true)}} style={{flexDirection : "row", alignItems : "center", margin : 15, marginTop : 25}}>
                <Image source={require("../assets/Images/pp.png")}></Image>
            </TouchableOpacity>
          </View>

          {(showMenu || showHandshake || showBadge) && (
          <TouchableOpacity style={styles.overlay} onPress={()=>{setShowMenu(false); setShowHandshake(false); setShowBadge(false);}}>
          </TouchableOpacity>
        )}

          {/* MENU ITEMS */}
          <View style={{display : showMenu ? 'flex' : 'none', position : "absolute", width : "100%", height : 250, zIndex : 999, backgroundColor : "#fff", borderRadius : 20, alignItems : "center", justifyContent : "center"}}>
                <Text style={{fontFamily : "Inter-Regular", fontSize : 24, color : "#000", marginBottom : 20}}>My Talent Profile</Text>
                <TouchableOpacity onPress={()=>{
                  if(userData?.client){
                    navigation.navigate('ClientProfile')
                    } else {
                        setTalentSelected(false);
                        setClientSelected(true);
                        navigation.navigate('CreateProfile')
                    }
                }} style={{backgroundColor : "#000", height : 50, width : "80%", borderRadius : 4, alignItems : "center", justifyContent : "center"}}>
                    <Text style={{color : "#fff", fontFamily : "Inter-Regular", fontSize : 18}}>Switch to Sponser profile</Text>
                </TouchableOpacity>
                <View style={{borderWidth : 0.3, borderColor : "rgba(0,0,0,0.5)", margin: 20, width : "60%"}}></View>
                <TouchableOpacity onPress={()=>{navigation.navigate('Splash')}} style={{backgroundColor : "#FFE4E4", height : 50, width : "80%", borderRadius : 4, alignItems : "center", justifyContent : "center"}}>
                    <Text style={{color : "#FF4545", fontFamily : "Inter-Regular", fontSize : 18}}>Disconnect Wallet</Text>
                </TouchableOpacity>
            </View>

          
            <View style={{justifyContent : "center", alignItems : "center", marginTop : 4}}>
            <Image
              source={{ uri: userData?.serviceProvider?.ImageURL }} style={{width : 150, height : 150, borderRadius : 100}}/>
                <Text style={{fontWeight : "500", fontSize : 16, color : "#000000", margin : 10, fontFamily : "Inter-Regular"}}>{userData?.serviceProvider?.name}</Text>

                <TouchableOpacity onPress={copyToClipboard}>
                <View style={{flexDirection : 'row', alignItems : "center", fontFamily : "Inter-Regular"}}>
                <Text style={{fontWeight : "400", fontSize : 14, color : "#000000", margin : 10, fontFamily : "Inter-Regular"}}>{formatWalletAddress(userData?.walletAddress)}</Text>
                <Image source={require("../assets/Images/copy.png")} style={{width : 20, height : 20}}></Image>
                </View>
                </TouchableOpacity>

                <View style={{flexDirection : 'row', alignItems : "center"}}>
                <Text style={{fontWeight : "400", fontSize : 14, color : "#000000", margin : 5,fontFamily : "Inter-Regular"}}>Balance : {balance ? `${balance} GLMR` : 'Loading Balance ...'}</Text>
                </View>

                <View style={{flexDirection : 'row', alignItems : "center"}}>
                <Text style={{fontWeight : "400", fontSize : 14, color : "#000000", margin : 5,fontFamily : "Inter-Regular"}}>ASTR Balance : {balanceASTR ? `${balanceASTR} ASTR` : 'Loading Balance ...'}</Text>
                </View>

                <View style={{flexDirection : 'row', alignItems : "center"}}>
                <Text style={{fontWeight : "400", fontSize : 14, color : "#000000", margin : 5,fontFamily : "Inter-Regular"}}>{userData?.serviceProvider?.bio}</Text>
                </View>

                <TouchableOpacity onPress={copyTwitter} style={{flexDirection : 'row', alignItems : "center"}}>
                  <Image source={require("../assets/Images/twitter.png")}/>
                <Text style={{fontWeight : "400", fontSize : 14, color : "#000000", margin : 5, fontFamily : "Inter-Regular"}}>@{userData?.serviceProvider?.twitter}</Text>
                </TouchableOpacity>

                <View style={{flexDirection : 'row', alignItems : "center", backgroundColor : "#D7FFD3"}}>
                <Text style={{fontWeight : "400", fontSize : 14, color : "#000000", margin : 5, fontFamily : "Inter-Regular"}}>Hey, Im good in {userData?.serviceProvider?.interest}</Text>
                </View>

                <TouchableOpacity onPress={() => {
                                  const hasMatchingId = userData?.serviceProvider?.handshakes?.some(handshake => handshake.id === userData?._id);
                                  hasMatchingId ? show() : emoteProfile();
                              }}

                  style={{flexDirection : 'row', alignItems : "center", borderRadius : 30, borderWidth : userData?.serviceProvider?.handshakes.length>0 ? 2 : 1, borderColor :userData?.serviceProvider?.handshakes.length>0 ? "#FFD700" : '#000', margin : 10, paddingHorizontal : 10}}>
                  {handshakeLoader ? (
                    <ActivityIndicator/>
                  ) : (
                <Text style={{fontWeight : "400", fontSize : 14, color : "#000000", margin : 10, fontFamily : "Inter-Regular"}}>{userData?.serviceProvider?.handshakes.length} handshakes</Text>
                )}
                <Image source={require("../assets/Images/shake.png")}/>
                </TouchableOpacity>

                <TouchableOpacity onPress={mintProfile} style={{backgroundColor : "#000", display : userData?.serviceProvider?.isMinted === true ? 'none' : 'flex', padding : 10, borderRadius : 4}}>
                {mintLoader ? (
                    <ActivityIndicator/>
                  ) : (
                  <Text style={{color : "#FFF", fontSize : 14, fontFamily : "Inter-Regular"}}>MINT PROFILE</Text>
                  )}
                </TouchableOpacity>

            </View>
            
            
            <View style={{borderBottomColor : "rgba(0,0,0,0.5)", borderBottomWidth : 1, flexDirection : "row", justifyContent : "space-evenly", paddingTop : 10}}>
              <Text onPress={()=>{setSelectedTab('bounty')}} style={{color : "#000", borderBottomColor : "rgba(0,0,0,1)", borderBottomWidth : selectedTab === 'bounty' ? 2 : 0, paddingBottom : 10}}>Completed Bounty</Text>
              <Text onPress={()=>{setSelectedTab('badge')}} style={{color : "#000", borderBottomColor : "rgba(0,0,0,1)", borderBottomWidth : selectedTab === 'badge' ? 2 : 0, paddingBottom : 10}}>Hall of Badge</Text>
            </View>

            <ScrollView>
            {selectedTab === 'bounty' ? (
  <View>
    {allBounties &&
      allBounties
        .filter((item) => item?.awardedAddress === userData?.walletAddress)
        .map((item, index) => (
          <TouchableOpacity
            key={index}
            style={{
              borderRadius: 4,
              borderColor: "rgba(0,0,0,0.5)",
              borderWidth: 1,
              flexDirection: "row",
              margin: 10,
              justifyContent: "space-between",
              padding: 10,
              alignItems: "center"
            }}
            onPress={() => {
              setSelectedBounty(item);
              setIsTalent(true);
              navigation.navigate('BountyDetailClient');
            }} 
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={{ uri: item?.badge }}
                style={{ width: 60, height: 60, borderRadius: 100 }}
              />
              <View style={{ flexDirection: "column", marginLeft: 15 }}>
                <Text style={{ color: "#000", fontSize: 14, fontFamily: "Inter-Regular" }}>{item?.title}</Text>
                <Text style={{ color: "#000", fontSize: 10, fontFamily: "Inter-Regular" }}>by {item?.createdBy}</Text>
                <Text style={{ color: "#000", fontSize: 8, fontFamily: "Inter-Regular" }}>Completed on {item?.dueDate}</Text>
              </View>
            </View>
            <Text style={{ color: "#000", fontSize: 12, fontFamily: "Inter-Regular" }}>{item?.reward} ASTR</Text>
          </TouchableOpacity>
        ))}
  </View>
) : (
  <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: '100%' }}>
    {allBounties &&
      allBounties
        .filter((item) => item?.awardedAddress === userData?.walletAddress)
        .map((item, index) => (
          <TouchableOpacity onPress={()=>{setShowBadge(true); setSelectedBounty(item)}} key={index}>
            <View style={{ padding: 20, borderRadius: 4, borderColor: "rgba(0,0,0,0.5)", borderWidth: 1, margin: 10 }}>
              <Image source={{ uri: item?.badge }} style={{ width: 60, height: 60, borderRadius: 100 }} />
            </View>
          </TouchableOpacity>
        ))}
  </View>
)}

            </ScrollView>
        </View>
        </>
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
    
    export default Profile;
    