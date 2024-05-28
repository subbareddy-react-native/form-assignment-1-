import { Text,View, StyleSheet,TouchableOpacity,Alert,useWindowDimensions,SafeAreaView,ScrollView} from 'react-native';
import {useForm,Controller} from "react-hook-form"
import AsyncStorage from '@react-native-async-storage/async-storage'
import {Entypo} from 'react-native-vector-icons';
import {useState} from "react";
import {TextInput} from "react-native-paper"
import SideImage from "../SideImage"
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



const styles = StyleSheet.create({
 
  innerContainer:{
	display:"flex",
   justifyContent:"space-around",
   alignItems:"center",
  },
  imageContainer:{
	width:"48%",
	height:"48%"
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
  marginLeft:0,
  borderWidth: 1,
},
errMsg:{
  color:"red",
  fontSize:8,
  fontFamily:"Roboto",
 
},
passwordContainer:{
display:"flex",
flexDirection:"row",
justifyContent:"space-between",
alignItems:"center",
borderWidth:1,
borderColor:"gray",
borderStyle:"solid",
borderRadius:8,
paddingLeft:10,
paddingRight:10
},
passwordEle:{
  width:"93%",
  borderWidth:0
},
button:{
  backgroundColor:'black',
  width:'100%',
  borderRadius:5,
  padding:10,
  
},
loginText:{
  color:"white",
  margin:"auto",
  fontFamily:"Roboto",
  fontSize:18
}
});
