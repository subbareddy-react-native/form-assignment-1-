import {View,Text,StyleSheet,TouchableOpacity,Alert} from "react-native"
import { TextInput } from "react-native-paper"
// import MaterialIcons from '@react-native-vector-icons/material-icons';
import { useState,useEffect,useRef } from "react"

const Account=({navigation})=>{
const [firstName,setFirstName]=useState("")
const [lastName,setLastName]=useState("")
const[firstNameErrMsg,setFirstNameErrMsg]=useState(false)
const[lastNameErrMsg,setLastNameErrMsg]=useState(false)

const [accountEmail,setAccountEmail]=useState("")
const [accountEmailErrMsg,setAccountEmailErrMsg]=useState(false)

const [accountPassword,setAccountPassword]=useState("")
const [accountPasswordErrMsg,setAccountPasswordErrMsg]=useState(false)

const [showPassword,setShowPassword]=useState(false)
const [usersList,setUsersList]=useState([])

const initialFirstName=useRef(false)
const initialLastName=useRef(false)
const initialEmail=useRef(false)
const initialPassword=useRef(false)

useEffect(()=>{
    if(initialFirstName.current){
        inputFieldsFocused("firstName")
    }
    initialFirstName.current=true
  },[firstName])

  useEffect(()=>{
   if(initialLastName.current){
    inputFieldsFocused("lastName")
   }
    
   initialLastName.current=true
  },[lastName])

  useEffect(()=>{
   if(initialEmail.current){
    inputFieldsFocused("email")
   }
    
   initialEmail.current=true
  },[accountEmail])

  useEffect(()=>{
   if(initialPassword.current){
    inputFieldsFocused("password")
   }
    
   initialPassword.current=true
  },[accountPassword])



const backToSign=()=>{
    navigation.navigate("SignIn")
}

const inputFieldsFocused=(state)=>{
    if(state==="firstName"){
        if(firstName===""){
            setFirstNameErrMsg(true)
        }else{
            setFirstNameErrMsg(false)
        }
    }else if(state==="lastName"){
        if(lastName===""){
            setLastNameErrMsg(true)
        }else{
            setLastNameErrMsg(false)
        }
    }else if(state==="email"){
        if(accountEmail===""){
            setAccountEmailErrMsg(true)
        }else{
            setAccountEmailErrMsg(false)
        }
    }else if(state==="password"){
        if(accountPassword===""){
            setAccountPasswordErrMsg(true)
        }else{
            setAccountPasswordErrMsg(false)
        }
        
    }
    
}

const firstNameFieldFocused=()=>{
    inputFieldsFocused("firstName")
}

const lastNameFieldFocused=()=>{
    inputFieldsFocused("lastName")
}

const emailFieldFocused=()=>{
    inputFieldsFocused("email")
}

const passwordFieldFocused=()=>{
    inputFieldsFocused("password")
}

const firstNameFun=(firstName)=>{
    setFirstName(firstName)
    
}

const lastNameFun=(lastName)=>{
    setLastName(lastName)
}

const emailEnterFun=(emailText)=>{
    setAccountEmail(emailText)
}

const passwordEnterFun=(passwordText)=>{
    setAccountPassword(passwordText)
}

const showAndHiddePassword=()=>{
    setShowPassword((prev)=>!prev)
}


const createNewUser=()=>{
    console.log("newuser")
    if(firstName !=="" && lastName!=="" && accountEmail!=="" && accountPassword!==""){
        const newUser={
            firstName,
            lastName,
            email:accountEmail,
            password:accountPassword
        }
        setUsersList([...usersList,newUser])
        console.log(usersList)
        Alert.alert("You Have Account now","Please Sign In",[
            {
                title:"Ok",
                onPress:()=>{
                    backToSign()
                }
            }
        ])
    }else{
        Alert.alert("Enter Required Details","Please Fill All Input Fields",[
            {
                title:"Ok",
                
            }
        ])
    }
}

return (
    <View style={Styles.accountMainContainer}>
        <View style={Styles.accountInnerContainer}>
            <Text style={Styles.accountHeading}>Get Started absolutely free</Text>
            <Text style={[Styles.accountcommonProp,Styles.alreadyAccount]}>Already have an account? <Text style={[Styles.accountcommonProp,Styles.signin]} onPress={backToSign}>Sign in</Text></Text>
            <View style={Styles.formContainer}>

                <View style={Styles.namesContainer}>
                    <View style={Styles.firstNameContainer}>
                        <TextInput onFocus={firstNameFieldFocused} value={firstName} onChangeText={firstNameFun} style={[Styles.nameInput,Styles.accountCommonInput]} placeholder="First name"/>
                        {firstNameErrMsg&&<Text style={Styles.errMsg}>*Required</Text>}
                    </View>
                    <View style={Styles.firstNameContainer}>
                        <TextInput onFocus={lastNameFieldFocused} value={lastName} onChangeText={lastNameFun}  style={[Styles.nameInput,Styles.accountCommonInput]} placeholder="Last name"/>
                        {lastNameErrMsg&&<Text style={Styles.errMsg}>*Required</Text>}
                    </View>   
                </View>

                <TextInput onFocus={emailFieldFocused} value={accountEmail} onChangeText={emailEnterFun} keyboardType="email-address" style={[Styles.accountEmail,Styles.accountCommonInput]} placeholder="Email address"/>
                {accountEmailErrMsg&&<Text style={Styles.errMsg}>*Required</Text>}
                <View style={Styles.passwordContainer}>
                    <TextInput  onFocus={passwordFieldFocused} value={accountPassword} onChangeText={passwordEnterFun} style={Styles.passwordInput} placeholder="Password" secureTextEntry={!showPassword} />
                    {/* <MaterialIcons name={showPassword?"eye":"eye-with-line"} size={20} color="#000" onPress={showAndHiddePassword}/> */}
                </View>
                {accountPasswordErrMsg&&<Text style={Styles.errMsg}>*Required</Text>}
                <TouchableOpacity color="#ffffff" style={Styles.createAccountBtn}>
                    <Text style={Styles.createAccountBtnText} onPress={createNewUser}>Create Account</Text>
                </TouchableOpacity>
                <Text style={Styles.termsAndConditions}>
                    By Signing up, I agree  to 
                    <Text style={Styles.termsAndPrivacy}> Terms of Service </Text>
                     and 
                    <Text style={Styles.termsAndPrivacy}> Privacy Policy</Text></Text>
            </View>
        </View>
    </View>
)

}

const Styles=StyleSheet.create({
    accountMainContainer:{
    // borderWidth:1,
    // borderStyle:"solid",
    // borderColor:"red",
    width:"100%",
    height:"95%" ,
    display:"flex",
    justifyContent:"center",
    alignItems:"center" 

    },
    accountInnerContainer:{
    // borderWidth:1,
    // borderStyle:"dashed",
    // borderColor:"red",
    width:"95%",
    height:"95%",
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
       marginBottom:20,
     },
     signin:{
       color:"green",
     },
     alreadyAccount:{
       color:"gray",
     },
     formContainer:{
        // borderWidth:1,
        // borderStyle:"dashed",
        // borderColor:"blue",
        width:"100%",
        height:"80%",
        display:"flex",
        flexDirection:"column",
        // justifyContent:"space-around",
        alignItems:"flex-start",
        paddingTop:10,
       
     },
     namesContainer:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        // borderWidth:1,
        // borderStyle:"solid",
        // borderColor:"green",
        width:"100%",
        height:80,
        marginBottom:20
        
        
     },
     firstNameContainer:{
        width:"48%",
        // borderWidth:1,
        // borderStyle:"solid",
        // borderColor:"yellow",
        
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
        width:"100%",
     },
     passwordInput:{
        width:"90%",
        backgroundColor:"transparent",
       
     },
     passwordContainer:{
        borderWidth:1,
        borderStyle:"solid",
        borderColor:"gray",
        borderRadius:8,
        width:"100%",
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        marginTop:20
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
      termsAndConditions:{
        fontSize:10,
        fontFamily:"Roboto",
        fontWeight:"bold",
        marginTop:20
      },
      termsAndPrivacy:{
        fontSize:11,
        textDecorationLine:'underline'
      },
      errMsg:{
        color:"red",
        fontSize:8,
        fontFamily:"Roboto",
        marginBottom:10
      }
})

export default Account;