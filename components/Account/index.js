import {View,Text,TouchableOpacity,Alert,ScrollView,SafeAreaView,useWindowDimensions} from "react-native"
import {useForm} from "react-hook-form"
import AsyncStorage from '@react-native-async-storage/async-storage'
import 'react-native-get-random-values';
import {v4 as uuidv4} from "uuid"
import { useState } from "react";

import SideImage from "../SideImage";
import FirstNameComponent from "../InputFields/FirstNameComponent";
import LastNameComponent from "../InputFields/LastNameComponent";
import EmailComponent from "../InputFields/EmailComponent";
import PasswordComponent from "../InputFields/PasswordComponent";
import Styles from "./accountstyles";

const Account=({navigation})=>{
    const {width,height}=useWindowDimensions()
    const isLg = width >=800;
    const {handleSubmit}=useForm()

    const [newAccount,setNewAccount]=useState({})

    const [showPassword,setShowPassword]=useState(false)

    const showAndHiddePassword=()=>{
        setShowPassword((prev)=>!prev)
    }

    const backToSign=()=>{
        navigation.navigate("SignIn")
    }

    const setUserIntoStorage=async(newUser)=>{
        const usersList= await AsyncStorage.getItem("usersList");
        if(usersList===null){
            const list=[newUser]
            await AsyncStorage.setItem("usersList",JSON.stringify(list))
            
        }else{
            const finalList=JSON.parse(usersList);
            await AsyncStorage.setItem("usersList",JSON.stringify([...finalList,newUser]))

        }

    }

    const createNewUser=async()=>{
        try{
            if(((newAccount.firstName!==undefined)&& (newAccount.lastName!==undefined)&& (newAccount.useremail!==undefined) && (newAccount.userpassword!==undefined))){
                const newUser={
                    id:uuidv4(),
                    firstName:newAccount.firstName,
                    lastName:newAccount.lastName,
                    useremail:newAccount.useremail,
                    userpassword:newAccount.userpassword
                }
               
            const usersList= await AsyncStorage.getItem("usersList");
             const userexit=(usersList!==null) && JSON.parse(usersList).some(each=>each.useremail===newUser.useremail)
             
             if(userexit===true){
                    Alert.alert("Already userexist","With is email already userexist.Please try againg with another email address",[
                        {
                            text:"Ok"
                        }
                    ])
                }
                else{
                    await setUserIntoStorage(newUser)
                    Alert.alert("You Have Account now","Please Sign In",[
                        {
                            text:"Ok",
                            onPress:()=>{
                                backToSign()
                            }
                        },
                        {
                        text:"CANCEL"
                        }
                    ])

                }
            }
            else{
                Alert.alert("Enter Required Details","Please Fill All Input Fields",[
                    {
                        title:"Ok",
                        
                    }
                ])
            }
    }
    catch(error){
        console.log(`error at creating user :${usererror.message}`)
    }
    }

    return(
        <SafeAreaView>
            <View>
            <ScrollView nestedScrollEnabled scrollEnabled bounces={false}>
                <View style={[Styles.innerContainer,{flexDirection:isLg?"row":"column",height:height}]}>
                    <View style={[Styles.imageContainer,{display:isLg?"flex":"none"}]}>
                        <SideImage/>
                    </View>
                    <View style={[Styles.accountFormContainer,{width:isLg?"48%":"95%"}]}>
                        <Text style={Styles.accountHeading}>Get Started absolutely free</Text>
                        <Text style={[Styles.accountcommonProp,Styles.alreadyAccount]}>Already have an account? <Text style={[Styles.accountcommonProp,Styles.signin]} onPress={backToSign}>Sign in</Text></Text>
                        <View style={Styles.formContainer}>
                            <View style={Styles.namesContainer}>
                                <FirstNameComponent newAccount={newAccount} updateFirstName={setNewAccount}/>
                                <LastNameComponent newAccount={newAccount} updateLastName={setNewAccount}/>
                            </View>
                            <EmailComponent newAccount={newAccount} updateEmailText={setNewAccount}/>
                            <PasswordComponent newAccount={newAccount} updatePassword={setNewAccount} showAndHiddePassword={showAndHiddePassword} showPassword={showPassword}/>
                            <TouchableOpacity color="#ffffff" style={Styles.createAccountBtn} onPress={handleSubmit(createNewUser)}>
                                    <Text style={Styles.createAccountBtnText} onPress={createNewUser}>Create Account</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
            </View>
        </SafeAreaView>

    )


}

export default Account;