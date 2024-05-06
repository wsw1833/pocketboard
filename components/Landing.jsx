import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text, Animated, Easing } from 'react-native';
import { StackActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { check } from 'react-native-permissions';
import { Colors } from './colors';
import { baseURL } from './constants';
import { useData } from './datacontext';
import axios from 'axios';

const Landing = ({ navigation }) => {
  const [blinkAnimation] = useState(new Animated.Value(0));
  const [checkWallet, setCheckWallet] = useState(false)
  const {setWallet, wallet, setUserData, userData} = useData();
  const login = async () => {
    const sign = await axios.post(`${baseURL}/getProfile`, {
        walletAddress : wallet.toLowerCase()
    })
    if(sign.data){
        setUserData(sign.data.user);
    }
}
  useEffect(()=>{
    const check = async () => {
      const check = await AsyncStorage.getItem('WalletAddress');
      if(check !== null) {
        setCheckWallet(true);
        setWallet(check);
      } else {
        setCheckWallet(false);
      }
    }
   check();
  },[])

  useEffect(()=>{
    login()
  },[wallet]);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(blinkAnimation, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
      Animated.timing(blinkAnimation, {
        toValue: 0,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
    ]).start(({ finished }) => {
      if (finished) {
        if(checkWallet){
          if(userData && userData?.serviceProvider !== null) {
          navigation.dispatch(StackActions.replace('Profile')); 
          } else if(userData && userData?.client !== null) {
            navigation.dispatch(StackActions.replace('ClientProfile'));
          } else {
            navigation.dispatch(StackActions.replace('Splash')); 
          }
        } else {
        navigation.dispatch(StackActions.replace('Splash')); 
        }
      }
    });
    return () => {
      blinkAnimation.removeAllListeners(); 
    };
  }, [blinkAnimation, navigation, checkWallet, userData]);

  const loadImage = () => {
    try {
      return <View style={{width : 70, height : 70, alignItems : "center", justifyContent : "center", borderRadius : 5}}>
      <Image source={require("../assets/Images/splash.png")}/>
  </View>;
    } catch (error) {
      console.error('Error loading image:', error);
    }
  };

  return (
    <View style={styles.container}>
        {loadImage()}
      <Animated.View
        style={[
          styles.blinkingDot,
          {
            opacity: blinkAnimation,
          },
        ]}
      />
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
  blinkingDot: {
    width: 16,
    height: 16,
    backgroundColor: '#FBECD7', 
    borderRadius: 8,
    marginTop: 20,
  },
});

export default Landing;
