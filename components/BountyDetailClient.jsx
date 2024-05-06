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


const BountyDetailClient = ({ navigation }) => {
    const { selectedBounty, userData, setSelectedSubmission, isTalent } = useData()
    const [countdown, setCountdown] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const dueDate = new Date(selectedBounty.dueDate);
      const difference = dueDate - now;

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      const countdownString = `${days}d:${hours}h:${minutes}m:${seconds}s`;

      setCountdown(countdownString);

      if (difference < 0) {
        clearInterval(interval);
        setCountdown('Expired');
      }
    }, 1000);

    return () => clearInterval(interval); 
  }, [selectedBounty]);

  const handleOpenURL = () => {
    if (selectedBounty?.attachment) {
      Linking.canOpenURL(selectedBounty?.attachment)
        .then(supported => {
          if (!supported) {
            // If the URL is not supported, attempt to open it anyway
            return Linking.openURL(selectedBounty?.attachment);
          } else {
            return Linking.openURL(selectedBounty?.attachment);
          }
        })
        .catch(error => {
          console.error('Error occurred while checking URL support:', error);
        });
        }
      };

      console.log(isTalent)
    return (
        <View style={styles.container}>
            <View style={{position : "absolute", top : "7%", left : "6%"}}>

            <TouchableOpacity onPress={()=>{isTalent ? navigation.navigate('Profile') : navigation.navigate('ClientProfile')}}>
            <Text style={{color : "#000", fontSize : 14, marginBottom : 20}}>{'<- Back'}</Text>
            </TouchableOpacity>
            <Image source={{uri : selectedBounty?.badge}} style={{width : 100, height : 100, borderRadius : 100}}/>
            <Text style={{fontFamily : "Inter-Regular", fontSize : 30, color : "#000"}}>{selectedBounty?.title}</Text>
            <Text style={{fontFamily : "Inter-Regular", fontSize : 12, color : "#000"}}>By {userData?.client.companyName}</Text>
            <View style={{backgroundColor : "#D7FFD3", marginTop : 20, marginBottom : 20, padding : 10}}>
                <Text style={{fontFamily : "Inter-Regular", fontSize : 14, color : "#000"}}>{selectedBounty?.interest}</Text>
            </View>

            <View style={{flexDirection : "row"}}>
                <View style={{flexDirection : "row", alignItems : "center"}}>
                    <Image source={require("../assets/Images/mb.png")} style={{width : 40, height : 40}}/>
                    <Text style={{fontFamily : "Inter-Regular", fontSize : 20, color : "#000", marginLeft : 10}}>{selectedBounty?.reward}</Text>
                    <Text style={{fontFamily : "Inter-Regular", fontSize : 14, color : "#000", marginLeft : 5}}>ASTR</Text>
                </View>
                <View style={{flexDirection : "row", alignItems : "center", marginLeft : 20}}>
                    <Image source={require("../assets/Images/clock.png")} style={{width : 30, height : 30}}/>
                    <Text style={{fontFamily : "Inter-Regular", fontSize : 20, color : "#000", marginLeft : 10}}>{countdown}</Text>
                </View>
            </View>

            <Text style={{fontFamily : "Inter-Regular", fontSize : 20, color : "#000", textDecorationLine : "underline", marginTop : 10}}>Bounty Description</Text>
            <Text style={{fontFamily : "Inter-Regular", fontSize : 14, color : "#000",}}>{selectedBounty?.description}</Text>

            <Text style={{fontFamily : "Inter-Regular", fontSize : 20, color : "#000", textDecorationLine : "underline", marginTop : 10}}>Detail Attachment</Text>
            <TouchableOpacity onPress={handleOpenURL}>
              <View style={styles.choosefileview}>
                <Text>Download Attachment</Text>
              <Image source={require("../assets/Images/down.png")} style={{width: 20, height: 20}}/>
              </View>
            </TouchableOpacity>
            <View style={{flexDirection : "column", alignItems : "flex-start"}}>
            <View style={{flexDirection : "row"}}>
            <Text style={{fontFamily : "Inter-Regular", fontSize : 20, color : "#000", textDecorationLine : "underline", marginTop : 10}}>Submissions</Text>
            <Text style={{fontFamily : "Inter-Regular", fontSize : 20, color : "#fff", backgroundColor : "#000", borderRadius : 60, paddingHorizontal : 10, marginTop : 12, height : 30, marginLeft : 10}}>{selectedBounty?.submission ? selectedBounty?.submission?.length : '0'}</Text>
            </View>

            <ScrollView style={{height : "25%", width : "100%"}}>
              {selectedBounty?.submission && selectedBounty?.submission.map((item, index) => (
                <TouchableOpacity onPress={()=>{
                  if(!isTalent)
                  {setSelectedSubmission(item); 
                  navigation.navigate('SubmissionPage')}
                  else {
                    
                  }
                  
                  }} key={index} style={{borderRadius : 4, borderColor : selectedBounty?.awarded === item?._id ? '#000' : "rgba(0,0,0,0.5)", borderWidth : selectedBounty?.awarded === item?._id ? 2 : 1, flexDirection : "row", margin : 10, justifyContent : "space-between", padding : 10, alignItems : "center",}}>
                  <View style={{flexDirection : "row", alignItems : "center"}}>
                  <Image source={{uri : item?.profileImage}} style={{width : 60, height : 60, borderRadius : 100}}/>
                  <View style={{flexDirection:"column", marginLeft : 15}}>
                  <View style={{flexDirection : "row", justifyContent : "space-between"}}>
                  <Text style={{color : "#000", fontSize : 16, fontFamily : "Inter-Regular"}}>{item?.author}</Text>
                  <Image source={selectedBounty?.awarded === item?._id ? require("../assets/Images/award.png") : require("../assets/Images/sad.png")} style={{width : 20, height : 40}}/>
                  </View>
                  <Text style={{color : "#000", fontSize : 10, fontFamily : "Inter-Regular"}}>Submitted on {(item?.submissionDate)}</Text>
                  </View>
                  </View>
                </TouchableOpacity>
                )) 
              }
            </ScrollView>
            </View>
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
    
    export default BountyDetailClient;
    