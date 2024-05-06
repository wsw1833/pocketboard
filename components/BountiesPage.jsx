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
} from 'react-native';
import {TouchableOpacity} from 'react-native';
import { useData } from './datacontext';
import { baseURL } from './constants';
import axios from 'axios';


const BountiesPage = ({ navigation }) => {
    const { allBounties, userData, setSelectedBounty, setAllBounties } = useData();
    const fetchBounties = async () => {
        const bounty = await axios.post(`${baseURL}/getAllBounties`)
        if(bounty.data){
          setAllBounties(bounty.data.bounties);
        }
      }
      
      useEffect(()=>{
        fetchBounties()
      },[])

    return (
        <View style={styles.container}>
            <View style={{position : "absolute", top : "7%", left : "6%"}}>
            <TouchableOpacity onPress={()=>{navigation.navigate('Profile')}}>
            <Text style={{color : "#000", fontSize : 14, marginBottom : 20}}>{'<- Back'}</Text>
            </TouchableOpacity>
            <Text style={{color : "#000", fontFamily : "Inter-Regular", fontSize : 14, marginBottom : 10}}>Unleash your talent</Text>
            <Text style={{color : "#000", fontFamily : "Inter-Regular", fontSize : 25, marginBottom : 10}}>Bounties Listing</Text>
            <ScrollView>
              {allBounties && allBounties.map((item, index) => (
                <TouchableOpacity onPress={()=>{setSelectedBounty(item); navigation.navigate('BountyDetailTalent')}} key={index} style={{borderRadius : 4, borderColor : "rgba(0,0,0,0.5)", borderWidth : 1, flexDirection : "row", margin : 10, justifyContent : "space-between", padding : 10, alignItems : "center"}}>
                  <View style={{flexDirection : "row", alignItems : "center"}}>
                  <Image source={{uri : item?.badge}} style={{width : 60, height : 60, borderRadius : 100}}/>
                  <View style={{flexDirection:"column", marginLeft : 15}}>
                  <Text style={{color : "#000", fontSize : 16, fontFamily : "Inter-Regular"}}>{item?.title}</Text>
                  <Text style={{color : "#000", fontSize : 12, fontFamily : "Inter-Regular"}}>by {item?.createdBy}</Text>
                  <Text style={{color : "#000", fontSize : 10, fontFamily : "Inter-Regular"}}>Due Date {(item?.dueDate)}</Text>
                  </View>
                  </View>
                  <Text style={{color : "#000", fontSize : 14, fontFamily : "Inter-Bold"}}>{item?.reward} ASTR</Text>
                </TouchableOpacity>
                )) 
              }
            </ScrollView>
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
    
    export default BountiesPage;
    