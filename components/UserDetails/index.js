import {Text, View,StyleSheet,Modal,Button,useWindowDimensions,ScrollView, Alert} from "react-native"
import * as React from "react"
import { DataTable, TextInput } from "react-native-paper"
import {Entypo} from 'react-native-vector-icons';

import {useState} from "react"
import { useForm,Controller } from "react-hook-form"
import TableRow from "../TableRow"
import { SafeAreaView } from "react-native-safe-area-context";


const allUsers=[{id:1,"firstName":"subba","lastName":"reddy","useremail":"suhash1234@gmail.com","userpassword":"subbu@1234"},{id:2,"firstName":"suhash","lastName":"reddy","useremail":"subba.reddy@smartfoodsafe.com","userpassword":"subbu@1234"}]
let editableUser;

const UserDetails=({navigation})=>{
    const {handleSubmit,control}=useForm()

    const [editPopup,setEditPopup]=useState(false)
    const {width,height}=useWindowDimensions()

    // Its is a pass word show and hide code
    const [showPassword,setShowPassword]=useState(false)
    const showAndHiddePassword=()=>{
        setShowPassword((prev)=>!prev)
    }

    //Its a edit firstname code
    const [firstName,setFirstName]=useState("")

   

    const saveChanges=(changedUserdata)=>{
        console.log(changedUserdata)
        console.log("change the user details")
    }

    const hidePopUp=()=>{
        setEditPopup(!editPopup)
    }

    const editableForm=()=>{
       console.log(firstName)
        return (
        <>
            <View style={Styles.namesContainer}>
                <View style={Styles.firstNameContainer}>
                    <Controller
                        control={control}
                        name={"editfirstName"}
                        rules={{required:"* First name required"}}
                        render={({field:{value,onChange},fieldState:{error}})=>
                            (<>
                                <TextInput
                                    placeholder="First Name"
                                    value={value}
                                    onChangeText={onChange}
                                    style={[Styles.nameInput,Styles.accountCommonInput]}
                                />
                                {error && <Text style={Styles.errMsg}>{error.message}</Text>}
                            </>
                        )
                        }
                    />
                </View>
                <View style={Styles.firstNameContainer}>
                    <Controller
                        control={control}
                        name={"editlastName"}
                        rules={{required:"* Last name required"}}
                        render={({field:{value,onChange},fieldState:{error}})=>
                            (<>
                                <TextInput
                                    placeholder="Last Name"
                                    value={value}
                                    onChangeText={onChange}
                                    style={[Styles.nameInput,Styles.accountCommonInput]}
                                />
                                {error && <Text style={Styles.errMsg}>{error.message}</Text>}
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
                    rules={{required:"* Email required"}}
                    render={({field:{value,onChange},fieldState:{error}})=>
                        <View >
                            <TextInput
                                value={value} 
                                onChangeText={onChange} 
                                keyboardType="email-address"
                                style={[Styles.accountEmail,Styles.accountCommonInput]} 
                                placeholder="Email address"/>
                                {error && <Text style={Styles.errMsg}>{error.message}</Text>}
                        </View>
                    }
                />

            </View>
            <View style={Styles.passwordContainer}>
                {/* It is a account password field */}
                <Controller
                    name={"accountPassword"}
                    rules={{required:"* Password required"}}
                    control={control}
                    render={({field:{value,onChange},fieldState:{error}})=>
                        <View style={{display:"flex",flexDirection:"column"}}>
                            <View style={Styles.passwordAndEyeContainer}>
                                <TextInput
                                    value={value} 
                                    onChangeText={onChange} 
                                    style={Styles.passwordInput} 
                                    secureTextEntry={!showPassword}
                                    placeholder="Enter Password"/>
                                    <Entypo name={showPassword?"eye":"eye-with-line"} size={30} color="#000" onPress={showAndHiddePassword}/>
                            </View>
                            {error && <Text style={Styles.errMsg}>{error.message}</Text>}
                        </View>
                        
                    }
                    
                />
                
                
            </View>
            </>
       )

    }

    const showPopup=()=>{
        console.log("in pop up----",editableUser)
        return (
            <SafeAreaView>
                <Modal visible={true} transparent={true} >
                        <View style={[Styles.popup,{height:height-((height/100)*60),width:width<768?width-((width/100)*5):width-((width/100)*30)}]}>
                            <View style={{margin:"auto"}}>
                                <ScrollView scrollEnabled nestedScrollEnabled bounces={false}>
                                    <View  style={{marginBottom:20}}>
                                        {editableForm()}
                                    </View>
                                    <View style={{display:"flex",flexDirection:"row",justifyContent:"space-around",alignItems:"center"}}>
                                        <Button title="SAVE" onPress={handleSubmit(saveChanges)}/>
                                        <Button title="CANCEL" onPress={hidePopUp}/>
                                    </View>
                                    
                                </ScrollView>
                            </View>
                        
                        </View>
                </Modal>
            </SafeAreaView>
        )
    }

    const editUserDetails=(id)=>{
        console.log(id)
        editableUser=allUsers.find(each=>each.id===id)    
        setEditPopup(!editPopup)
    }

    const gotoSignIn=()=>{
        Alert.alert("LogOut","Are You Sure for logout ?",[
            {
                text:"OK",
                onPress:()=>{
                    navigation.navigate("SignIn")
                }
            },
            {
                text:"CANCEL"
            }
        ])
        
    }

   return(<View style={{position:"relative",height:height}}>
        <DataTable>
            <DataTable.Header>
                <DataTable.Title >First Name</DataTable.Title>
                <DataTable.Title>Last Name</DataTable.Title>
                <DataTable.Title> Email</DataTable.Title>
                <DataTable.Title> Edit</DataTable.Title>
            </DataTable.Header>
            {allUsers.map(eachUser=><TableRow key={eachUser.id} userDetails={eachUser} editClick={editUserDetails} id={eachUser.id}/>)
            }
        </DataTable>
        <View style={{backgroundColor:"gray",width:100,position:"absolute",top:"80%",left:"75%"}} onPress={gotoSignIn}>
            <Button title="LogOut" color="#024359" onPress={gotoSignIn}/>
        </View>
        
        {editPopup && showPopup()}
       
   </View>)
}

const Styles=StyleSheet.create({
    popup:{
        margin:"auto",
        backgroundColor:"gray",
        borderRadius:10,
        shadowColor: 'green',
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation:10,
       
    },
     namesContainer:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        width:"100%",
        height:100,
        marginBottom:20
        
        
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
        marginTop:20
     },
     passwordAndEyeContainer:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        borderWidth:1,borderColor:"gray",borderStyle:"solid",
        borderRadius:8
    },
})
export default UserDetails

