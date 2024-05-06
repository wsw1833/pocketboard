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
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseURL } from './constants';
import { Colors } from './colors';
import { useData } from './datacontext';
import Clipboard from '@react-native-clipboard/clipboard';
import { check, PERMISSIONS, request } from 'react-native-permissions';
import Permissions, { openSettings} from 'react-native-permissions';
import { launchImageLibrary } from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import RNFS from "react-native-fs"
import { createClient } from '@supabase/supabase-js';
import { decode } from 'base64-arraybuffer';
import 'react-native-url-polyfill/auto'
import DateTimePicker from '@react-native-community/datetimepicker';


const BountySetup = ({ navigation }) => {
    const { title, setTitle, description, setDescription, fileUpload, setFileUpload, dueDate, setDueDate, interest, setInterest} = useData()
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [loadingDoc, setLoadingDoc] = useState(false);
    const handleDateChange = (event, selectedDate) => {
      const currentDate = selectedDate || dueDate;
      setShowDatePicker(Platform.OS === 'ios');
      setDueDate(currentDate);
    };
    const showDatepicker = () => {
      setShowDatePicker(true);
    };
    const [menuOpen, setMenuOpen] = useState(false);
    const {wallet, setUserData, userData, talentSelected, clientSelected, setImageuri} = useData()

    const types = [
      "⁠Infrastructure",
      "⁠DAOs",
      "⁠DeFi",
      "⁠DePIN",
      "⁠Consumer dApps",
      "⁠Wallet and Payment",
      "⁠NFTs",
      "⁠Gaming",
      "⁠Cross-Chain"
  ]


  function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  const supabaseUrl = "https://isikpgdobtvvdcfkrruy.supabase.co";
  const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlzaWtwZ2RvYnR2dmRjZmtycnV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk1NDUyOTUsImV4cCI6MjAxNTEyMTI5NX0.oOsSZCrmNwfnnpjBjwwMLcEfHdE6eNqtZ4lhkvTEiRY";
  const supabase = createClient(supabaseUrl, supabaseKey);

    let deniedPermissionArray = [
      Permissions.RESULTS.BLOCKED,
      Permissions.RESULTS.LIMITED,
    ];
    const withPermission = async () => {
      const storagePermission =
        Platform.Version >= 33
          ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
          : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
      const mediaPermission = Platform.select({
        ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
        android: storagePermission,
      });
    
      const hasPermissionToStorage = await Permissions.check(mediaPermission);
      if (hasPermissionToStorage == Permissions.RESULTS.GRANTED) {
        handleChooseFile()
        return true;
      }
      if (hasPermissionToStorage == Permissions.RESULTS.LIMITED) {
        return true;
      }
      if (hasPermissionToStorage == Permissions.RESULTS.DENIED) {
        const permissionRequest = await Permissions.request(mediaPermission);
    
        if (permissionRequest == Permissions.RESULTS.BLOCKED) {
          return Alert.alert(
            "You've previously disable Media permission on Blend. \n\nTo enable this, click App Settings below and activate Media under the permission menu.",
          );
        }
        if (permissionRequest == Permissions.RESULTS.DENIED) {
          return false;
        }
        return permissionRequest === Permissions.RESULTS.GRANTED;
      }
      if (deniedPermissionArray.includes(hasPermissionToStorage)) {
        return Alert.alert(
          "You've previously disable Media permission on Blend. \n\nTo enable this, click App Settings below and activate Media under the permission menu.",
        );
      }
    };
    const handleChooseFile = async () => {

      try {
        const pickedFile = await DocumentPicker.pickSingle({
          type: [DocumentPicker.types.allFiles],
        });
        setLoadingDoc(true);
        const randomName = generateRandomString(10);
        const { data, error } = await supabase
          .storage
          .from('unity')
          .upload(`${randomName}.pdf`, pickedFile, {
            cacheControl: '3600',
            upsert: false
          });
    
        if (error) {
          console.error('Error uploading document:', error.message);
          setLoadingDoc(false);
          Alert.alert("Error", error)
        } else {
          console.log('Document uploaded successfully:', data);
          setFileUpload(`https://isikpgdobtvvdcfkrruy.supabase.co/storage/v1/object/public/unity/${data.path}`);
          setLoadingDoc(false);
        }
      } catch (error) {
        console.error('Error picking document:', error);
      }
    };


  
    return (
        <View style={styles.container}>
            <View style={{display : menuOpen ? 'flex' : 'none', position : "absolute", bottom : 0, backgroundColor : "rgba(255,255,255,0.7)", borderColor : 'rgba(0,0,0,0.5)', borderWidth : 1, zIndex : 999, width : "100%", height : "20%", alignItems : "center", borderRadius : 10}}>
                    <TouchableOpacity onPress={() => setMenuOpen(!menuOpen)}></TouchableOpacity>
                    <ScrollView >
                        {types.map((type, index) =>
                            <TouchableOpacity key={index} onPress={() => { setMenuOpen(!menuOpen), setInterest(type) }}>
                                <Text style={{color : "#000", fontSize : 20, fontFamily : "Inter-Regular"}}>{type}</Text>
                            </TouchableOpacity>
                        )}
                    </ScrollView>
                </View>
            <View style={{position : "absolute", top : "7%", left : "6%"}}>

            <TouchableOpacity onPress={()=>{navigation.navigate('ClientProfile')}}>
            <Text style={{color : "#000", fontSize : 14, marginBottom : 20}}>{'<- Back'}</Text>
            </TouchableOpacity>

            <Text style={{fontWeight : "500", fontSize : 14, color : "#000000", marginBottom : 10, fontFamily : "Inter-Light"}}>Something Big is Cooking</Text>
            <Text style={{fontWeight : "500", fontSize : 34, color : "#000000", marginBottom : 10, fontFamily : "Inter-Regular"}}>Setup your bounty</Text>
            </View>

            <View style={{position : "absolute", top : "30%", left : "5%"}}>
            <View style={{width : '90%'}}>
            <Text style={{marginLeft : 10}}>Title</Text>
            <TextInput
            value={title}
            onChangeText={(text)=>{setTitle(text)}}
            placeholder={'Please a title for your bounty'}
            placeholderTextColor={'rgba(0,0,0,0.5)'}
            style={{
                margin : 10,
                padding : 10,
                paddingHorizontal : 40,
                borderRadius : 5,
                borderColor : '#B2B2B2',
                borderWidth : 1,
                width : "100%",
                justifyContent : "center",
                alignItems : "center"
            }}
            />
            </View>

            <View style={{width : '90%'}}>
            <Text style={{marginLeft : 10}} >Area of interest</Text>
            <TouchableOpacity style={{
              margin : 10,
              padding : 10,
              paddingHorizontal : 40,
              borderRadius : 5,
              borderColor : '#B2B2B2',
              borderWidth : 1,
              width : "100%",
              justifyContent : "space-between",
              alignItems : "center",
              flexDirection : "row"
            }}
            onPress={()=>{setMenuOpen(true)}}
            >
            <Text style={{fontSize : 20}}>{interest}</Text>
            <Image source={require("../assets/Images/Polygon.png")}/>
            </TouchableOpacity>
            </View>


            <View style={{width : '90%'}}>
            <Text style={{marginLeft : 10}}>{'Description'}</Text>
            <TextInput
            value={description}
            onChangeText={(text)=>{setDescription(text)}}
            placeholder={'Provide your bounty description'}
            placeholderTextColor={'rgba(0,0,0,0.5)'}
            style={{
                margin : 10,
                padding : 10,
                paddingHorizontal : 40,
                borderRadius : 5,
                borderColor : '#B2B2B2',
                borderWidth : 1,
                width : "100%",
                justifyContent : "center",
                alignItems : "center"
            }}
            />
            </View>

            <View style={{width : '90%'}}>
            <Text style={{marginLeft : 10}}>{'Detail Attachment'}</Text>
            <TouchableOpacity onPress={withPermission}>
              <View style={styles.choosefileview}>
                {loadingDoc ? (
                  <ActivityIndicator/>
                ) : fileUpload ? (
                  <Text>Document Uploaded.</Text>
                ) : (
                <Text>Click to upload document</Text>
                )}
              <Image source={require("../assets/Images/uplo.png")} style={{width: 20, height: 20}}/>
              </View>
            </TouchableOpacity>
            </View>

            <View style={{ width: '90%' }}>
              <Text style={{ marginLeft: 10 }}>{'Due Date'}</Text>
              <TouchableOpacity onPress={showDatepicker}>
                <View style={styles.inputContainer}>
                  <Text>{dueDate.toDateString()}</Text>
                  <Image source={require("../assets/Images/cal.png")} style={{width: 20, height: 20}}/>
                </View>
              </TouchableOpacity>
            </View>
            {showDatePicker && (
              <DateTimePicker
                value={dueDate}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={handleDateChange}
              />
            )}

            <TouchableOpacity style={styles.button} onPress={()=>{
              if(title === null || description === null || fileUpload === null || dueDate === null){
                Alert.alert("Fields can't be empty")
                return
              } else {
              navigation.navigate('BountyStep2')}
              }
            }>
                <Text style={{fontWeight : "500", fontSize : 20, color : "#fff", fontFamily : "Inter-Regular"}} >Continue to setup reward</Text>
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
        backgroundColor : "#fff"
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
        marginLeft : 30,
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
    
    export default BountySetup;
    