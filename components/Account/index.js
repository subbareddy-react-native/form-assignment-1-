import {View,Text,StyleSheet,TouchableOpacity,Alert,ScrollView,SafeAreaView,useWindowDimensions} from "react-native"
import { TextInput } from "react-native-paper"
import {Entypo} from 'react-native-vector-icons';
import {useForm,Controller} from "react-hook-form"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState } from "react";
import SideImage from "../SideImage";



const Account=({navigation})=>{
    const {width,height}=useWindowDimensions()
    const isLg = width >=800;
    const {handleSubmit,control}=useForm()

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
            const list=[{...newUser,id:1}]
            await AsyncStorage.setItem("usersList",JSON.stringify(list))
            
        }else{
        
            const finalList=JSON.parse(usersList);
            await AsyncStorage.setItem("usersList",JSON.stringify([...finalList,{...newUser,id:finalList.length+1}]))

        }

    }

    const createNewUser=async()=>{
        if(((newAccount.firstName!==undefined)&& (newAccount.lastName!==undefined)&& (newAccount.useremail!==undefined) && (newAccount.userpassword!==undefined))){
            const newUser={
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
        }else{
            Alert.alert("Enter Required Details","Please Fill All Input Fields",[
                {
                    title:"Ok",
                    
                }
            ])
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
                                <View style={Styles.firstNameContainer}>
                                    <Controller
                                        control={control}
                                        name={"firstName"}
                                        render={()=>
                                            (<>
                                                <TextInput
                                                    placeholder="First Name"
                                                    value={newAccount.firstName!==undefined ? newAccount.firstName:""}
                                                    onChangeText={(firstName)=>setNewAccount({...newAccount,firstName:firstName})}
                                                    style={[Styles.nameInput,Styles.accountCommonInput]}
                                                />
                                                {newAccount.firstName==="" && <Text style={Styles.errMsg}>{"* First name required"}</Text>}
                                            </>
                                        )
                                        }
                                    />
                                </View>
                                <View style={Styles.firstNameContainer}>
                                    <Controller
                                        control={control}
                                        name={"lastName"}
                                        // rules={{required:"* Last name required"}}
                                        render={()=>
                                            (<>
                                                <TextInput
                                                    placeholder="Last Name"
                                                    value={newAccount.lastName!==undefined ? newAccount.lastName:""}
                                                    onChangeText={(lastName)=>setNewAccount({...newAccount,lastName:lastName})}
                                                    style={[Styles.nameInput,Styles.accountCommonInput]}
                                                />
                                                {newAccount.lastName==="" && <Text style={Styles.errMsg}>{"* Last name required"}</Text>}
                                            </>
                                        )
                                        }
                                    />
                                </View>
                            </View>
                            <View >
                                {/* It is a account email field */}
                                <Controller
                                    name={"accountEmail"}
                                    control={control}
                                    // rules={{required:"* Email required"}}
                                    render={()=>
                                        <View >
                                            <TextInput
                                                value={newAccount.useremail!==undefined ? newAccount.useremail:""}
                                                onChangeText={(email)=>setNewAccount({...newAccount,useremail:email})} 
                                                keyboardType="email-address"
                                                style={[Styles.accountEmail,Styles.accountCommonInput]} 
                                                placeholder="Email address"/>
                                                {newAccount.useremail==="" && <Text style={Styles.errMsg}>{"* Email required"}</Text>}
                                        </View>
                                    }
                                />

                            </View>
                            <View style={Styles.passwordContainer}>
                                {/* It is a account password field */}
                                <Controller
                                    name={"accountPassword"}
                                    control={control}
                                    render={()=>
                                        <View style={{display:"flex",flexDirection:"column"}}>
                                            <View style={Styles.passwordAndEyeContainer}>
                                                <TextInput
                                                    value={newAccount.userpassword!==undefined ? newAccount.userpassword:""} 
                                                    onChangeText={(password)=>setNewAccount({...newAccount,userpassword:password})} 
                                                    style={Styles.passwordInput} 
                                                    secureTextEntry={!showPassword}
                                                    placeholder="Password"/>
                                                    <Entypo name={showPassword?"eye":"eye-with-line"} size={30} color="#000" onPress={showAndHiddePassword}/>
                                            </View>
                                            {newAccount.userpassword==="" && <Text style={Styles.errMsg}>{"* Password required"}</Text>}
                                        </View>
                                        
                                    }
                                    
                                />
                                
                                
                            </View>
                            <TouchableOpacity color="#ffffff" style={Styles.createAccountBtn} onPress={handleSubmit(createNewUser)}>
                                    <Text style={Styles.createAccountBtnText} onPress={handleSubmit(createNewUser)}>Create Account</Text>
                            </TouchableOpacity>
                            
                        </View>
                    </View>
                </View>
            </ScrollView>
            </View>
        </SafeAreaView>

    )


}

const Styles=StyleSheet.create({
   
    
    innerContainer:{
        display:"flex",
       justifyContent:"space-around",
       alignItems:"center",
    
      },
      imageContainer:{
        borderWidth:1,
        borderStyle:"solid",
        borderColor:"blue",
        width:"48%",
        height:"48%"
      },
    accountFormContainer:{
        height:"48%"
    },
    accountHeading:{
        color:"black",
        fontSize:23,
        fontWeight:"bold",
        marginBottom:10,
        fontFamily:"Roboto"
    },
    accountcommonProp:{
        fontSize:15,
       fontWeight:"bold",
     },
     signin:{
       color:"green",
     },
     alreadyAccount:{
       color:"gray",
     },
     formContainer:{
        width:"100%",
        height:"70%",
        display:"flex",
        flexDirection:"column",
        alignItems:"flex-start",
       
     },
     namesContainer:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        width:"100%",
        height:80,
        marginBottom:20, 
     },
     firstNameContainer:{
        width:"48%", 
        height:40,
     },
     accountCommonInput:{
        backgroundColor:"transparent",
        borderWidth:1,
        borderStyle:"solid",
        borderColor:"gray",
        borderRadius:5,
        textDecorationLine:"none",
     },
     nameInput:{
        width:"100%",
     },
     accountEmail:{
        minWidth:"100%",
     },
     passwordInput:{
        minWidth:"90%",
        backgroundColor:"transparent",
       
       
     },
     passwordContainer:{
        width:"100%",
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        marginTop:20,
        
     },
     passwordAndEyeContainer:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        borderWidth:1,borderColor:"gray",borderStyle:"solid",
        borderRadius:8,
        paddingLeft:10,
        paddingRight:10,
        minWidth:"100%"
    },
     createAccountBtn:{
        backgroundColor:'black',
        width:'100%',
        borderRadius:5,
        padding:10,
        marginTop:20
      },
      createAccountBtnText:{
        color:"white",
        margin:"auto",
        fontWeight:"bold",
        fontFamily:"Roboto",
        fontSize:18
      },
      errMsg:{
        color:"red",
        fontSize:8,
        fontFamily:"Roboto",
        marginBottom:10
      },
      
})

export default Account;