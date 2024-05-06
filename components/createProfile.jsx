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
  KeyboardAvoidingView
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
import RNFS from "react-native-fs"
import { createClient } from '@supabase/supabase-js';
import { decode } from 'base64-arraybuffer';
import 'react-native-url-polyfill/auto'


const CreateProfile = ({ navigation }) => {
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [website, setWebsite] = useState('');
    const [image, setImage] = useState("");
    const [imageUpload, setImageUpload] = useState();
    const [twitter, setTwitter] = useState("");
    const [interest, setInterest] = useState('');
    const [loading, setLoading] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const {wallet, setUserData, userData, talentSelected, clientSelected, setImageuri} = useData()
    const [profileLoader, setProfileLoader] = useState(false);
    const [imageLoader, setImageLoader] = useState(false);

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
            setImageLoader(true);
            const uri = response.assets?.[0]?.uri;
            const type = response.assets?.[0]?.type;
            const fileName = response.assets?.[0]?.fileName;
            const size = response.assets?.[0]?.fileSize;
    
            setSelectedFile({
              uri: uri,
          type: type,
          fileName: fileName,
            });

            setImage({
              uri: uri,
            })
    
            setImageuri({
              name : fileName,
              uri : uri
            });

            const randomName = generateRandomString(10);
            const fileContent = await RNFS.readFile(selectedFile.uri, 'base64');
            const { data, error } = await supabase
            .storage
            .from('unity')
            .upload(`${randomName}.png`, decode(fileContent), {
              contentType: 'image/png',
            });
            console.log(data)
            setImageUpload(`https://isikpgdobtvvdcfkrruy.supabase.co/storage/v1/object/public/unity/${data.path}`);
            setImageLoader(false);
          }
        });
      };
    
      const updateProfile = async () => {
        if(name === '' || bio === '' || imageUpload === '' || interest === '' || twitter === ''){
          Alert.alert("Fields can't be empty")
          return
        } else {
        setProfileLoader(true);
        const upload = await axios.post(`${baseURL}/createProfileService`, {
          walletAddress : userData?.walletAddress, 
          name, 
          bio, 
          ImageURL : imageUpload, 
          interest, 
          twitter
        })
        if(upload.data){
          setUserData(upload.data.user);
          navigation.navigate('Profile');     
          setProfileLoader(false);
        }
      }
    }

      const updateProfileCompany = async () => {
        if(companyName === '' || website === '' || imageUpload === '' || interest === '' || twitter === ''){
          Alert.alert("Fields can't be empty")
          return
        } else {
        setProfileLoader(true);
        const upload = await axios.post(`${baseURL}/createProfileClient`, {
          walletAddress : userData?.walletAddress, 
          companyName, 
          website, 
          logo : imageUpload, 
          interest, 
          twitter
        })
        if(upload.data){
          setUserData(upload.data.user);
          navigation.navigate('ClientProfile');  
          setProfileLoader(false);
        }
      }
      }

  
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
            <Image source={require("../assets/Images/splash.png")} style={{width : 45, height : 40, marginBottom : 10}}/>
            <Text style={{fontWeight : "500", fontSize : 14, color : "#000000", marginBottom : 10, fontFamily : "Inter-Light"}}>You're almost there</Text>
            <Text style={{fontWeight : "500", fontSize : 34, color : "#000000", marginBottom : 10, fontFamily : "Inter-Regular"}}>Setup your profile</Text>
            </View>
            
            <View style={{position : "absolute", top : "30%", left : "5%"}}>
            <View style={{width : '90%'}}>
            <Text style={{marginLeft : 10}}>{talentSelected ? 'Name' : 'Company Name'}</Text>
            <TextInput
            value={talentSelected ? name : companyName}
            onChangeText={(text)=>{talentSelected ? setName(text) : setCompanyName(text)}}
            placeholder={talentSelected ? 'Provide a name for your profile' : 'Please provide your company name'}
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
            <Text style={{marginLeft : 10}}>{talentSelected ? 'One-Line Bio' : 'Company Website'}</Text>
            <TextInput
            value={talentSelected ? bio : website}
            onChangeText={(text)=>{talentSelected ? setBio(text) : setWebsite(text)}}
            placeholder={talentSelected ? 'Provide a one line bio for your profile' : 'Provide your company website'}
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
            <Text style={{marginLeft : 10}}>{talentSelected ? 'Profile Picture' : 'Company Logo'}</Text>
            <TouchableOpacity onPress={withPermission}>
              <View style={styles.choosefileview}>
              <Image source={image ? {uri: image.uri} : require("../assets/Images/black.png")} style={{width: 50, height: 50, borderRadius : 50}}/>
              <View>
                {imageLoader ? (
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
            <Text style={{marginLeft : 10}}>Twitter</Text>
            <TextInput
            value={twitter}
            onChangeText={(text)=>{setTwitter(text)}}
            placeholder='Provide your twitter username'
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
            <TouchableOpacity style={styles.button} onPress={()=>{talentSelected ? updateProfile() : updateProfileCompany()}}>
                {profileLoader ? (
                    <ActivityIndicator size={'large'} color={'white'}/>
                ) : (
                    <Text style={{fontWeight : "500", fontSize : 20, color : "#fff", fontFamily : "Inter-Regular"}} >Complete my Profile</Text>
                )}
               
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
        height : 60,
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
    });
    
    export default CreateProfile;
    