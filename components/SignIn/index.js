import { Text,View, StyleSheet,TouchableOpacity,Alert} from 'react-native';
// import {v4 as uuidv4} from "uuid"
// import {useForm,Controller} from "react-native-hook"
// import {NavigationContainer} from '@react-navigation/native';
import {useState,useEffect,useRef} from "react";
import {Checkbox,TextInput} from "react-native-paper"

export default function SignIn({navigation}) {
  const [checkbox,setCheckBox]=useState(false)
  const [emailErrMsg,setEmailErrMsg]=useState(false)
  const [passwordErrMsg,setPasswordErrMsg]=useState(false)
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const emailIntialRender=useRef(false)
  const passwordIntialRender=useRef(false)

  const [allUsersDetails,setAllUserDetails]=useState([{"email":"subbu@123","password":"subbu@123"}])
  
  const createAccount=()=>{
    console.log("user is ready to create account")
    navigation.navigate("Account")
  }

  const onSubmit=()=>{
    if(email !=='' && password!==""){
      const userInfo={
        email,
        password
      }
      const exitUser=allUsersDetails.find(each=>each["email"]===userInfo["email"])
      if(exitUser===undefined){
       Alert.alert("Please Create Account","After created please Sign in",[
        {text:"Ok",
         onPress:()=>{
          console.log("Ok pressed")
          createAccount()
         }
        },
        {text:"Cancle",
         onPress:()=>{
          console.log("Cancle pressed")
         }
        }
       ])
       //navigate to the create account page
       //after entered the details into create account page.Again show the alert message 
       //then go to the sign in page
      }
      else{
        console.log(exitUser)
        if(exitUser["email"]===userInfo["email"] && exitUser["password"]===userInfo["password"]){
          console.log("navigate to details page")
         
        }
      }
    }
    
  }


  useEffect(()=>{
    if(emailIntialRender.current){
    errorMsgCheck("email")
    }
    emailIntialRender.current=true
  },[email])

  useEffect(()=>{
   if(passwordIntialRender.current){
    errorMsgCheck("password")
   }
    
   passwordIntialRender.current=true
  },[password])

  const errorMsgCheck=(state)=>{
   
    if(state==="email"){
     
      if(email===""){
       
        setEmailErrMsg(true)
      }else{
       
        setEmailErrMsg(false)
      }
    }else if(state==="password"){
      if(password===""){
       
        setPasswordErrMsg(true)
      }else{
       
        setPasswordErrMsg(false)
      }
    }
  }
 
  const changeEmail=(email)=>{
    
    setEmail(email)
    
   
  }

  const changePassword=(password)=>{
    setPassword(password)
  }

  const emailFieldCheck=()=>{
    errorMsgCheck("email")
  }

  const passwordFieldCheck=()=>{
    errorMsgCheck("password")
  }

  

 
  return (
   
    <View style={styles.mainContainer}>
    <View style={styles.innerContainer}>
        <Text style={styles.signHeading}>
        Sign in
        </Text>
        <Text style={[styles.newUser,styles.commonProp]}>
        New User? <Text style={[styles.createAccount,styles.commonProp]} onPress={createAccount} > Create an account</Text>
        </Text>
        <TextInput style={styles.input} placeholder="Enter your email" onFocus={emailFieldCheck} onChangeText={changeEmail} value={email} keyboardType="email-address" />
        {emailErrMsg&&<Text style={styles.errMsg}>*Required</Text>}
        <TextInput style={styles.input} placeholder="Enter your password" onChangeText={changePassword} value={password} secureTextEntry= {!checkbox} onFocus={passwordFieldCheck}/>
        {passwordErrMsg&&<Text style={styles.errMsg}>*Required</Text>}
        <View style={styles.showPasswordContainer}>
        <Checkbox 
        disabled={password.length>0?false:true}
        value={checkbox}
        status={checkbox ? "checked":"unchecked"}  onPress={()=>{
        setCheckBox(!checkbox)
        }}/>
        <Text style={styles.showPasswordText}>Show password</Text>
        </View>
        <Text style={{marginBottom:15,textDecorationLine:"underline",textDecorationColor:"blue",marginLeft:"auto"}}>Forget password?</Text>
        <TouchableOpacity  style={[styles.button,(email.length!==0 && password.length!==0)?styles.enabledBtn:styles.disabledBtn]}  
        onPress={onSubmit}>
        <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
        
    </View>
    </View>
     
  );
}

const styles = StyleSheet.create({
  mainContainer:{
    height:"80%",
    width:"100%",
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    justifyContent:"center"
  },
  innerContainer:{
    height:"70%",
    width:"95%",
    display:"flex",
    flexDirection:"column", 
  },
  signHeading:{
    color:"black",
    fontSize:30,
    fontFamily:"Roboto",
    marginBottom:20,
  },
  commonProp:{
     fontSize:12,
    fontWeight:"bold",
    marginBottom:10,
  },
  newUser:{
    color:"gray",
  },
  createAccount:{
    color:"green",
  },
  input: {
  backgroundColor:"transparent",
  borderRadius:7,
  height: 50,
  marginTop: 20,
  marginLeft:0,
  borderWidth: 1,
},
errMsg:{
  color:"red",
  fontSize:8,
  fontFamily:"Roboto",
  marginBottom:10
},
showPasswordContainer:{
  width:"60%",
  display:"flex",
  flexDirection:"row",
  justifyContent:"space-between",
  alignItems:"center",
  marginBottom:20,
  padding:0,
},

showPasswordText:{
  fontSize:18,
  fontWeight:"bold"
},
button:{
  backgroundColor:'black',
  width:'100%',
  borderRadius:5,
  padding:10,
  
},
enabledBtn:{
  opacity:1,
},
disabledBtn:{
opacity:0.4
},
loginText:{
  color:"white",
  margin:"auto",
  fontFamily:"Roboto",
  fontSize:18
}
});
