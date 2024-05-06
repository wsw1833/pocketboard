import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  Animated,
  Easing,
  Vibration,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Colors } from './colors';
import { baseURL } from './constants';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useData } from './datacontext';

const Welcome = ({navigation}) => {

    const {wallet, setWallet, userData, setUserData, tokenIds, setTokenIds, talentSelected, setTalentSelected, clientSelected, setClientSelected} = useData()
    const [loading, setLoading] = useState(false);

    const fetchWallet = async () => {
        const wallet = await AsyncStorage.getItem('WalletAddress');
        if(wallet){
            setWallet(wallet)
        }
    }
    const login = async () => {
      const sign = await axios.post(`${baseURL}/getProfile`, {
          walletAddress : wallet.toLowerCase()
      })
      if(sign.data){
          setUserData(sign.data.user);
      }
  }

    const signup = async () => {
        const sign = await axios.post(`${baseURL}/signup`, {
            walletAddress : wallet
        })
        if(sign.data){
            console.log("signup", sign.data.user);
            setUserData(sign.data.user);
        } else {
          login()
        }
    }

    useEffect(()=>{
        fetchWallet();
    },[])

    useEffect(()=>{
        signup()
    },[wallet]);


    const handleClick = () => {
        if(!talentSelected && !clientSelected){
            Alert.alert('Please select one option')
            return
        } else {
        navigation.navigate('CreateProfile')
        }
    }
  return (
    <View style={styles.container}>
        <Text style={{fontWeight : "500", fontSize : 16, color : "#000000", marginTop : 10, fontFamily : 'Inter-Light', position : "absolute", left : '10%', top : '4%'}}>First time here?</Text>
        <Text style={{fontWeight : "500", fontSize : 34, color : "#000000", marginTop : 10, fontFamily : 'Inter-Regular', marginVertical : 20, position : "absolute", left : '10%', top : '8%'}}>Choose a role.</Text>
        <TouchableOpacity onPress={()=>{setTalentSelected(false); setClientSelected(true)}} style={[styles.box, clientSelected ? {borderColor : "#000", borderWidth : 2} : {borderColor : 'rgba(0,0,0,0.5)'}]}>
            <Image source={require("../assets/Images/bulb.png")}/>
            <Text style={{fontSize : 22, fontFamily : "Inter-Regular", marginBottom : 5, marginTop : 5}}>Looking for Talent?</Text>
            <Text style={{fontSize : 12, fontFamily : "Inter-Regular"}}>List bounties for your next project and find the next talent which fits your need. It is 100% free!</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{setTalentSelected(true); setClientSelected(false)}} style={[styles.box2, talentSelected ? {borderColor : "#000", borderWidth : 2} : {borderColor : 'rgba(0,0,0,0.5)'}]}>
            <Image source={require("../assets/Images/pc.png")}/>
            <Text style={{fontSize : 22, fontFamily : "Inter-Regular", marginBottom : 5, marginTop : 5}}>Looking for Work?</Text>
            <Text style={{fontSize : 12, fontFamily : "Inter-Regular"}}>Access to bounties from top crypto projects in the space & build up your portfolio in Web3.0. Start earning with your preferred crypto.</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleClick}>
                <Text style={{fontWeight : "500", fontSize : 18, color : "#fff", fontFamily : 'Inter-Regular'}}>Setup My Profile</Text>
        </TouchableOpacity>
        
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor : "#fff"
  },
  button : {
    backgroundColor : "#000",
    width : 300,
    height : 50,
    borderRadius : 5,
    alignItems : "center",
    justifyContent : "center",
    margin : "10%",
    top : '7%'
  },
  box : {
    borderRadius : 5,
    borderColor : "#000",
    borderWidth : 1,
    width : '75%',
    padding : 20,
    marginBottom : 10,
    top : '7%'
  },
  box2 : {
    borderRadius : 5,
    borderColor : "#000",
    borderWidth : 1,
    width : '75%',
    padding : 20,
    marginBottom : 10,
    top : '7%'
  }
});

export default Welcome;
