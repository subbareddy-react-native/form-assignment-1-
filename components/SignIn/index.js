import { Text,View,TouchableOpacity,Alert,useWindowDimensions,SafeAreaView,ScrollView} from 'react-native';
import {useForm,Controller} from "react-hook-form"
import AsyncStorage from '@react-native-async-storage/async-storage'
import {Entypo} from 'react-native-vector-icons';
import {useState} from "react";
import {TextInput} from "react-native-paper"
import SideImage from "../SideImage"
import styles from "./styles"
// import {useMediaQuery} from "../Hooks/useMediaQuery"
const SignIn=({navigation})=>{
	const {width,height}=useWindowDimensions()
    const isLg = width >=800 ;
  const {handleSubmit,control}=useForm();

  const fetchDataFromStorage=async()=>{
    try{
    const usersList=await AsyncStorage.getItem("usersList")
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
  let usersList;
  fetchDataFromStorage()
      .then((response)=>{
        return response
      })
      .then((data)=>{
        usersList=data
        
      })
      .catch(error=>console.log(`error happend while fetch the data from async storage :${error.message}`))
     
 

  const showAndHidePassword=()=>{
    setShowPassWord(!showPassword)
  }

  const createAccount=()=>{
    navigation.navigate("Account")
  }

  const goToUserDetails=()=>{
    navigation.navigate("UserDetails")
  }

  const onSubmit=(data)=>{
   const {useremail,userpassword}=data
   if(useremail!=="" && userpassword!==""){
    const user=JSON.parse(usersList).find(each=>
      each['useremail']===data['useremail'] && each['userpassword']==data['userpassword'])
    if(user===undefined){
      const wrongPassword=JSON.parse(usersList).some(each=>
        each['useremail']===data['useremail'] && each['userpassword']!==data['userpassword'])
      const wrongEmailId=JSON.parse(usersList).some(each=>
        each['useremail']!==data['useremail'] && each['userpassword']===data['userpassword'])
      if(wrongPassword===true && wrongEmailId===false){
        Alert.alert("WRONG PASSWORD","Enter correct password",[{
          text:"Ok"
        }])
      }
      if(wrongEmailId===true && wrongPassword==false){
        Alert.alert("WRONG EMAIL","Enter correct email address",[{
          text:"Ok"
        }])
      }
      else if(wrongEmailId===false && wrongPassword===false){
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
      }      
    }else{
      goToUserDetails()
    }
   }
    
  }

  return(
    <SafeAreaView>
		<View>
			<ScrollView nestedScrollEnabled scrollEnabled bounces={false}>
				<View style={[styles.innerContainer,{flexDirection:isLg?"row":"column",height:height}]}>
					<View style={[styles.imageContainer,{display:isLg?"flex":"none"}]}>
						<SideImage/>
					</View>
					<View style={{width:isLg?"48%":"95%"}}>
						<Text style={styles.signHeading}>
							Sign in
						</Text>
						<Text style={[styles.newUser,styles.commonProp]}>
							New User? <Text style={[styles.createAccount,styles.commonProp]} onPress={createAccount} > Create an account</Text>
						</Text>
						<View style={{marginBottom:20}} >
							<Controller
                control={control}
                name={"useremail"}
                rules={{required:"user email is required"}}
                render={({field:{value,onChange,onBlur},fieldState:{error}})=>(
                <View>
                    <TextInput 
                    style={styles.input} 
                    placeholder="Enter your email" 
                    onBlur={onBlur}
                    onChangeText={onChange} 
                    value={value}
                    keyboardType="email-address" />
                    {error&&<Text style={styles.errMsg}>{error.message}</Text>}
                </View>
							)}/>
						</View>
						<View style={{marginBottom:20}}>
							<Controller
							control={control}
							name={"userpassword"}
							rules={{required:"user password is required"}}
							render={({field:{value,onChange,onBlur},fieldState:{error}})=>(
							<>
							<View style={styles.passwordContainer}>
								<TextInput  
								value={value} 
								onBlur={onBlur}
								onChangeText={onChange}
								placeholder="Password"
								secureTextEntry={!showPassword}
								style={[styles.input,styles.passwordEle]} 
								/>
								<Entypo name={showPassword?"eye":"eye-with-line"} size={25} color="#000" onPress={showAndHidePassword}/>
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
