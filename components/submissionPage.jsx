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


const SubmissionPage = ({ navigation }) => {
    const { selectedSubmission, userData } = useData()
    const handleOpenURL = () => {
    if (selectedSubmission?.link) {
      Linking.canOpenURL(selectedSubmission?.link)
        .then(supported => {
          if (!supported) {
            return Linking.openURL(selectedSubmission?.link);
          } else {
            return Linking.openURL(selectedSubmission?.link);
          }
        })
        .catch(error => {
          console.error('Error occurred while checking URL support:', error);
        });
        }
      };
    return (
        <View style={styles.container}>
            <View style={{position : "absolute", top : "7%", left : "5%", width : "90%"}}>
            <TouchableOpacity onPress={()=>{navigation.navigate('BountyDetailClient')}}>
            <Text style={{color : "#000", fontSize : 14, marginBottom : 20}}>{'<- Back'}</Text>
            </TouchableOpacity>

                <Text style={{fontSize : 14, color : "#000", fontFamily : "Inter-Regular"}}>Author</Text>
                <TouchableOpacity style={{borderRadius : 4, borderColor : "rgba(0,0,0,0.5)", borderWidth : 1, flexDirection : "row", margin : 10, justifyContent : "space-between", padding : 10, alignItems : "center"}}>
                  <View style={{flexDirection : "row", alignItems : "center"}}>
                  <Image source={{uri : selectedSubmission?.profileImage}} style={{width : 60, height : 60, borderRadius : 100}}/>
                  <View style={{flexDirection:"column", marginLeft : 15}}>
                  <Text style={{color : "#000", fontSize : 16, fontFamily : "Inter-Regular"}}>{selectedSubmission?.author}</Text>
                  <Text style={{color : "#000", fontSize : 10, fontFamily : "Inter-Regular"}}>Submitted on {(selectedSubmission?.submissionDate)}</Text>
                  </View>
                  </View>
                </TouchableOpacity>

                <Text style={{fontSize : 14, color : "#000", fontFamily : "Inter-Regular"}}>Link to submission</Text>
                <TouchableOpacity onPress={handleOpenURL} style={{height : 50, borderRadius : 4, borderColor : "rgba(0,0,0,0.5)", borderWidth : 1, alignItems : "flex-start", justifyContent : "center", margin : 10, }}>
                    <Text style={{color : "#000", fontSize : 16, fontFamily : "Inter-Regular", marginLeft : 10}}>{selectedSubmission?.link}</Text>
                </TouchableOpacity>

                <Text style={{fontSize : 14, color : "#000", fontFamily : "Inter-Regular"}}>Comments</Text>
                <View style={{maxHeight : 200, minHeight : 50, borderRadius : 4, borderColor : "rgba(0,0,0,0.5)", borderWidth : 1, alignItems : "flex-start", marginLeft : 5, justifyContent : "center", margin : 10}}>
                    <Text style={{color : "#000", fontSize : 16, fontFamily : "Inter-Regular", marginLeft : 10}}>{selectedSubmission?.comment}</Text>
                </View>

                <Text style={{fontSize : 14, color : "#000", fontFamily : "Inter-Regular"}}>Reward receiving network</Text>
                <View style={{height : 50, borderRadius : 4, borderColor : "rgba(0,0,0,0.5)", borderWidth : 1, alignItems : "center", justifyContent : "center", margin : 10}}>
                    <Text style={{color : "#000", fontSize : 16, fontFamily : "Inter-Regular"}}>{selectedSubmission?.network}</Text>
                </View>

                <TouchableOpacity onPress={()=>{navigation.navigate('RewardTalent')}} style={{width : "100%", height : 50, borderRadius : 4, backgroundColor : "#D7FFD3", alignItems : "center", justifyContent : "center", marginVertical : 20}}>
                    <Text style={{fontSize : 20, fontFamily : "Inter-Regular", color : "#00210B"}}>Approve the work</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>{navigation.navigate('BountyDetailClient')}} style={{width : "100%", height : 50, borderRadius : 4, backgroundColor : "#FFE4E4", alignItems : "center", justifyContent : "center"}}>
                    <Text style={{fontSize : 20, fontFamily : "Inter-Regular", color : "#FF4545"}}>Reject the work</Text>
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
    
    export default SubmissionPage;
    