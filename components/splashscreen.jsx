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
} from 'react-native';
import { Colors } from './colors';

const SplashScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
        <Text style={{ fontSize : 20, color : "#000000", left : 30, fontFamily : 'Inter-Light', position : 'absolute', top : '13%'}}>Welcome to Pocket Board</Text>
        <Text style={{ margin : 20, left : 10, fontSize : 38, color : "#000000", fontFamily : 'Inter-Regular', position : 'absolute', top : "17%"}}>Where Talents Without Borders.</Text>
        <View style={{marginTop : '50%'}}>
        <Image source={require("../assets/Images/hand.png")}/>
        </View>
        <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate('CreateWallet')}}>
            <Text style={{fontSize : 18, color : "#fff", fontFamily : "Inter-Medium"}}>Connect to MoonBeam</Text>
        </TouchableOpacity>
        <Text style={{fontSize : 12, color : "#000000", fontFamily : 'Inter-Light'}}>Powered by WEB3</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily : 'SpaceMono-Regular'
  },
  button : {
    color : "#fff",
    backgroundColor : "#000",
    width : 250,
    height : 50,
    borderRadius : 5,
    marginTop : 100,
    alignItems : "center",
    justifyContent : "center",
    margin :10
  }
});

export default SplashScreen;
