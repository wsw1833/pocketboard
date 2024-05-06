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
  KeyboardAvoidingView,
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


const BountyStep2 = ({ navigation }) => {
    const { title, setTitle, description, setDescription, fileUpload, setFileUpload, dueDate, interest} = useData()
    const {wallet, setUserData, userData, talentSelected, clientSelected, setImageuri} = useData()
    const [image, setImage] = useState('');
    const [imageUpload, setImageUpload] = useState('');
    const [tokenAmount, setTokenAmount] = useState();
    const [loadingImg, setLoadingImg] = useState(false);

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
        const options = {
          mediaType: 'mixed',
          maxHeight: 2000,
          maxWidth: 2000,
        };
    
        launchImageLibrary(options, async (response) => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('Image picker error: ', response.error);
          } else {
            setLoadingImg(true);
            const uri = response.assets?.[0]?.uri;

            setImage({
              uri: uri,
            })
            const randomName = generateRandomString(10);
            const fileContent = await RNFS.readFile(uri, 'base64');
            const { data, error } = await supabase
            .storage
            .from('unity')
            .upload(`${randomName}.png`, decode(fileContent), {
              contentType: 'image/png',
            });
            console.log(data)
            setImageUpload(`https://isikpgdobtvvdcfkrruy.supabase.co/storage/v1/object/public/unity/${data.path}`);
            setLoadingImg(false);
          }
        });
      };
    
      const postBounty = async () => {
        const post = await axios.post(`${baseURL}/createBounty`, {
            walletAddress : userData?.walletAddress,
            title,
            interest : interest,
            description,
            attachment : fileUpload,
            dueDate,
            badge : imageUpload,
            reward : tokenAmount,
        })
        if(post.data){
            navigation.navigate("ClientProfile")
        }
      }

  
    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
            <View style={{position : "absolute", top : "3%", left : "6%"}}>

            <TouchableOpacity onPress={()=>{navigation.navigate('BountySetup')}}>
            <Text style={{color : "#000", fontSize : 14, marginBottom : 20}}>{'<- Back'}</Text>
            </TouchableOpacity>

            <Text style={{fontWeight : "500", fontSize : 14, color : "#000000", marginBottom : 10, fontFamily : "Inter-Light"}}>You’re almost there</Text>
            <Text style={{fontWeight : "500", fontSize : 34, color : "#000000", marginBottom : 10, fontFamily : "Inter-Regular"}}>Bounty reward</Text>

            <Text style={{fontSize : 22, fontFamily : "Inter-Regular", textDecorationLine : "underline", color : "#000", marginBottom : 15}}>Work Badge</Text>
            <Text style={{fontSize : 12, fontFamily : "Inter-Light", color : "#000", marginBottom : 15, marginRight : 40}}>After this bounty is completed, work badge will be awarded to the talent as an achievement. 
                It will be a soul-bounded NFT which will be nested in the talent’s profile.</Text>
            </View>

            
            <View style={{position : "absolute", top : "40%", left : "5%"}}>
            <View style={{width : '90%'}}>
            <Text style={{marginLeft : 10, marginTop : 30}}>{'Badge Design'}</Text>
            <TouchableOpacity onPress={withPermission}>
              <View style={styles.choosefileview}>
              <Image source={image ? {uri: image.uri} : require("../assets/Images/black.png")} style={{width: 50, height: 50, borderRadius : 50}}/>
              <View>
                {loadingImg ? (
                  <ActivityIndicator/>
                ) : imageUpload ? (
                  <Text>Image Uploaded</Text>
                ) : (
                  <>
                <Text>Click to upload media</Text>
                <Text>Maximum size: 5MB</Text>
                </>
                )}
              </View>
              </View>
            </TouchableOpacity>
            </View>

            <Text style={{fontSize : 22, fontFamily : "Inter-Regular", textDecorationLine : "underline", color : "#000", marginBottom : 15}}>Token Reward</Text>
            <Text style={{fontSize : 12, fontFamily : "Inter-Light", color : "#000", marginBottom : 15, paddingRight : 20}}>After this bounty is completed, the token assets need to be awarded to the talent. 
            You can choose the amount of the specified token assets (on Moonbeam Network) as the reward for this bounty.</Text>
            

            <View style={{width : '90%'}}>
            <Text style={{marginLeft : 10, marginBottom : 10}}>{'Token Amount'}</Text>
            <View style={{borderRadius : 4, borderColor : "rgba(0,0,0,0.4)", borderWidth : 0.5, width : "100%", height : 70, flexDirection : "row", alignItems : "center"}}>
            <TextInput
            value={tokenAmount}
            onChangeText={(text)=>{setTokenAmount(text)}}
            placeholder={'Bounty reward'}
            placeholderTextColor={'rgba(0,0,0,0.5)'}
            style={{
                margin : 10,
                padding : 10,
                paddingHorizontal : 10,
                width : "50%",
                justifyContent : "center",
                alignItems : "center"
            }}
            />
            <View style={{width : 1, height : 70, borderColor : "rgba(0,0,0,0.4)", borderWidth : 0.5}}/>
            <View style = {{flexDirection : "row", alignItems : "center", justifyContent : "space-between", paddingHorizontal : 20, width : "40%"}}>
            <Text style={{fontSize : 20, fontFamily : "Inter-Bold", color : "#000"}}>ASTR</Text>
            <Image source={require("../assets/Images/Polygon.png")}/>
            </View>
            </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={postBounty}>
                <Text style={{fontWeight : "500", fontSize : 20, color : "#fff", fontFamily : "Inter-Regular"}} >Confirm the listing</Text>
            </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor : "#fff",
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
        height : 70,
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
    
    export default BountyStep2;
    