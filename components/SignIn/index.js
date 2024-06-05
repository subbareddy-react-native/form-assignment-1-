import { Text,View,TouchableOpacity,Alert,SafeAreaView,ScrollView} from 'react-native';
import {useForm,Controller} from "react-hook-form"
import AsyncStorage from '@react-native-async-storage/async-storage'
import {Entypo} from 'react-native-vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import {useState} from "react";
import {TextInput,FAB} from "react-native-paper"
import SideImage from "../SideImage"
import styles from "./styles"
import {useKeyboard} from "../Hooks/useKeyboard"
import {useMediaQuery} from "../Hooks/useMediaQuery"
const SignIn=({navigation})=>{
  const {isXl,width,height}=useMediaQuery()
  const isLg = width >=800 ;
  const {handleSubmit,control}=useForm();
  const {isKeyboardVisible}=useKeyboard()
  const [selectedLoginOption,setSelectedLoginOption]=useState(true)
  let usersList;

  const fetchDataFromStorage=async()=>{
    try{
    const usersList=await AsyncStorage.getItem('usersList')
    if(usersList===null){
      return []
    }else{
      return usersList
    }
  }catch(error){
    console.log("error happend while fetch from async storage",error.message)
  }
  }

  const [showPassword,setShowPassWord]=useState(false)
  const showAndHidePassword=()=>{
    setShowPassWord(!showPassword)
  }

  const createAccount=()=>{
    navigation.navigate("Account")
  }

  const goToUserDetails=()=>{
    navigation.navigate("UserDetails")
  }

  const alertMsgForCreateAccount=()=>{
    return(
      Alert.alert("Create account","You don't have an account please create account",[
        {
          text:"CREATE",
          onPress:()=>{
            createAccount()
          }
        },
        {
          text:"CANCLE"
        }
        
      ])
    )
  }
  const alertMsgForWrongPassword=()=>{
    return(
      Alert.alert("WRONG PASSWORD","Enter correct password",[{
        text:"Ok"
    }])
    )
  }

  const iconsContainer=(device)=>{
    return(<View style={[styles.iconsContainer,{display:device==="small"?(isLg||isXl)?"none":"flex":((isLg||isXl)?"flex":"none"),margin:device==="small"?"auto":""}]}>
            <FAB
              icon="email"
              size={"small"}
              rippleColor="#022a6b"
              style={{borderRadius:50}}
              color={selectedLoginOption?"#03358c":"gray"}
              onPress={()=>{setSelectedLoginOption(true)}}
            />
            <FAB
              icon="phone"
              size={"small"}
              rippleColor="#022a6b"
              style={{borderRadius:50}}
              color={selectedLoginOption?"gray":"#03358c"}
              onPress={()=>{setSelectedLoginOption(false)}}
            />
       </View>)
  }

  const emailAndPasswordFields=(name,errorMsg,placeholder,keyboardType)=>{

    return(
      (<View style={{marginBottom:20}} >
        <Controller
          control={control}
          name={name}
          rules={{required:errorMsg}}
          render={({field:{value,onChange,onBlur},fieldState:{error}})=>(
          <>
            <View style={styles.passwordContainer}>
              {name==="phoneNumber"?
              (<Entypo name="mobile" size={24} color="block"/>):
              ( <Fontisto name="email" size={25} color="black"/>)}
                <TextInput 
                style={[styles.input,{width:"95%"}]} 
                placeholder={placeholder} 
                onBlur={onBlur}
                onChangeText={onChange} 
                value={()=>{
                  if(selectedLoginOption){
                    return value
                  }
                }}
                keyboardType={keyboardType} />
            </View>
            {error&&<Text style={styles.errMsg}>{error.message}</Text>}
          </>
            
        )}/>
      </View>)
    )
  }


  const onSubmit=async (data)=>{
    usersList=await fetchDataFromStorage()
    // console.log(usersList)
  if(usersList.length!==0){
   let {useremail,userpassword,phoneNumber}=data
      useremail=useremail.toLowerCase()
      userpassword=userpassword.toLowerCase()
    let user; 
    if(selectedLoginOption){
      //selected option is email for login
        user=JSON.parse(usersList).find(each=>
          each['useremail']===useremail && each['userpassword']==userpassword)
    }
    if(selectedLoginOption===false){
      //selected option is phone number for login
      try{
        user=JSON.parse(usersList).find(each=>
          each['phoneNumber']===phoneNumber && each['userpassword']==userpassword) 
      }
     catch(error){
      console.log(error.message)
     }
    }
    if(user===undefined){
      if(selectedLoginOption){
        const personObj=JSON.parse(usersList).find(each=>each.useremail===useremail)
        const Password=personObj!==undefined?personObj.userpassword===userpassword:JSON.parse(usersList).some(each=>each.userpassword===userpassword)
        if(Password===true && personObj===undefined){
            Alert.alert("WRONG EMAIL","Enter correct email address",[{
              text:"Ok"
          }])
        }
        else if(Password===false && personObj!==undefined){
          alertMsgForWrongPassword()
        }
        else{
          alertMsgForCreateAccount()
        } 
      }
      else if(selectedLoginOption===false){
        const personObj=JSON.parse(usersList).find(each=>each.phoneNumber===phoneNumber)
        const Password=personObj!==undefined?personObj.userpassword===userpassword:JSON.parse(usersList).some(each=>each.userpassword===userpassword)
        if(personObj===undefined && Password===true){
          Alert.alert("WRONG PHONENUMBER","Enter registered phonenumber.If u dont register your number sign with email and update the phone number and try with number",[{
            text:"Ok"
          }])
        }
        else if(personObj!==undefined && Password===false){
          alertMsgForWrongPassword()
        }else{
          alertMsgForCreateAccount()
        }
      }
    }
    else{
      goToUserDetails()
    }
  }else{
    alertMsgForCreateAccount()
  }
  }

  return(
    <SafeAreaView>
		<View>
			<ScrollView nestedScrollEnabled scrollEnabled bounces={false}>
				<View style={[styles.innerContainer,{flexDirection:isLg?"row":"column",height:(isLg||isXl)?height/1.1:height/2.1,marginBottom:(isXl||isLg)?(isKeyboardVisible?height/3:0):0,marginTop:(isLg||isXl)?0:isKeyboardVisible?height/4:height/2.3}]}>
					<View style={[styles.imageContainer,{display:isLg?"flex":"none"}]}>
						<SideImage/>
					</View>
					<View style={{width:isLg?"48%":"95%"}}>
             {/* Icons for small devices */}
             {iconsContainer("small")}
            <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                <View>
                  <Text style={{fontSize:22,marginBottom:10,color:"#03358c",fontWeight:"bold"}}>WELCOME</Text>
                  <Text style={styles.signHeading}>
                    Sign in with {selectedLoginOption?"email":"phone number"}
                  </Text>
                  <Text style={[styles.newUser,styles.commonProp]}>
                    New User? <Text style={[styles.createAccount,styles.commonProp]} onPress={createAccount} > Create an account</Text>
                  </Text>
                </View>
                {/* show icons for large device */}
                {iconsContainer("large")}
            </View>
           {selectedLoginOption?
              emailAndPasswordFields("useremail","user email is required","Enter your email","email-address")
           :
              emailAndPasswordFields("phoneNumber","phone number is required","Enter registered phone number","numeric")
          }
           
						<View style={{marginBottom:20}}>
							<Controller
							control={control}
							name={"userpassword"}
							rules={{required:"user password is required"}}
							render={({field:{value,onChange,onBlur},fieldState:{error}})=>(
							<>
							<View style={[styles.passwordContainer]}>
                <MaterialIcons name="password" size={24} color="black" />
                  <TextInput  
                  value={value} 
                  onBlur={onBlur}
                  onChangeText={onChange}
                  placeholder="Password"
                  secureTextEntry={!showPassword}
                  style={[styles.input,styles.passwordEle]} 
                  />
                  <Entypo name={showPassword?"eye":"eye-with-line"} size={18} color="#000" onPress={showAndHidePassword}/>
								</View>
								{error&&<Text style={styles.errMsg}>{error.message}</Text>}
							</>
							)}/>
						</View>
						<TouchableOpacity  style={styles.button}  
							onPress={handleSubmit(onSubmit)}>
							<Text style={styles.loginText}>Login</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
		</View>
    </SafeAreaView>
  )

}
export default SignIn
