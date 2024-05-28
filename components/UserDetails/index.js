import {Text, View,StyleSheet,Modal,Button,
    useWindowDimensions,ScrollView, Alert} from "react-native"
import * as React from "react"
import { SearchBar } from "react-native-elements"
import { DataTable, TextInput } from "react-native-paper"

// import { Dropdown } from 'react-native-element-dropdown';
import {Entypo} from 'react-native-vector-icons';

import {useState,useEffect} from "react"
import { useForm,Controller } from "react-hook-form"
import TableRow from "../TableRow"
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";


const UserDetails=({navigation})=>{
    const {control}=useForm()

    const [searchedValue,updateSearchInput]=useState("")
    const [showTable,updateShowTable]=useState(true)
    const [allUsers,updateAllusers]=useState([])

    const fetchDataFromStorage=async()=>{
        try{
            const list=await AsyncStorage.getItem("usersList")
            if(list===null){
               return []
            }else{
                return list
            }
        }
        catch(error){
            console.log(`error happend in userdetails while fetching the data from storage:${error.message}`)
        }
    }
    useEffect(()=>{
        fetchDataFromStorage()
        .then((response)=>{
            updateAllusers([...JSON.parse(response)])
        })
        .catch(error=>console.log(`error happend in userdetails while fetching the data from storage:${error.message}`))
    },[])
    const [editUSer,updateEditUser]=useState({})
    const [editPopup,setEditPopup]=useState(false)
    const {width,height}=useWindowDimensions()

    // Its is a pass word show and hide code
    const [showPassword,setShowPassword]=useState(false)
    
    const showAndHiddePassword=()=>{
        setShowPassword((prev)=>!prev)
    }

    //searching Functionality
    const checkNameIncludesOrNot=(each,text)=>{

        return ((each.firstName+" "+each.lastName).toLowerCase().includes(text.toLowerCase()))
    }
    const searchInputTextChange=(text)=>{
        const tableCondition=allUsers.some(each=>checkNameIncludesOrNot(each,text))
        updateShowTable(tableCondition)
        updateSearchInput(text)

    }

    //Its a hide popup code
    const hidePopUp=()=>{
        setEditPopup(!editPopup)
    }

    // save Btn functionality
    const saveChanges=async()=>{
        const newUserDetails={
            id:editUSer.id,
            "firstName":editUSer.firstName,
            "lastName":editUSer.lastName,
            "phoneNumber":editUSer.phoneNumber,
            "country":editUSer.country,
            "state":editUSer.state,
            "city":editUSer.city,
            "address":editUSer.address,
            "pincode":editUSer.pincode,
           "companyName":editUSer.companyName,
           "role":editUSer.role,
            "useremail":editUSer.useremail,
            "userpassword":editUSer.userpassword
        }
        const newUpdateUserDetails=allUsers.map((eachUser)=>{
            if(eachUser.id===newUserDetails.id){
                return newUserDetails
            }else{
                return eachUser
            }
        })
        updateAllusers(newUpdateUserDetails)
        await AsyncStorage.setItem("usersList",JSON.stringify(newUpdateUserDetails))
        hidePopUp()
    }

    //delete Account 
    const deleteAccount=async(id)=>{
        const filteredUsers=allUsers.filter(each=>each.id!==id)
        updateAllusers([...filteredUsers])
        await AsyncStorage.setItem("usersList",JSON.stringify(filteredUsers))
    }

    
    // function for click on user for edit 
    const editUserDetails=(id)=>{
        const editUserDetails=allUsers.find(each=>each.id===id)
        updateEditUser({...editUserDetails})
        setEditPopup(!editPopup)
    }

    
    // popup for edit the user details
    const editableForm=()=>{
        return (
        <>
            <View style={Styles.namesContainer}>
                {/* firstName field Code*/}
                <View style={Styles.firstNameContainer}>
                    <Controller
                        control={control}
                        name={"editfirstName"}
                        rules={{required:"* First name required"}}
                        render={({fieldState:{error}})=>
                            (<>
                                <TextInput
                                    placeholder="First Name"
                                    value={editUSer.firstName}
                                    onChangeText={(text)=>updateEditUser({...editUSer,"firstName":text})}
                                    style={[Styles.nameInput,Styles.accountCommonInput]}
                                />
                                {error && <Text style={Styles.errMsg}>{error.message}</Text>}
                            </>
                        )
                        }
                    />
                </View>
                {/* lastName field code */}
                <View style={Styles.firstNameContainer}>
                    <Controller
                        control={control}
                        name={"editlastName"}
                        rules={{required:"* Last name required"}}
                        render={({fieldState:{error}})=>
                            (<>
                                <TextInput
                                    placeholder="Last Name"
                                    value={editUSer.lastName}
                                    onChangeText={(text)=>updateEditUser({...editUSer,"lastName":text})}
                                    style={[Styles.nameInput,Styles.accountCommonInput]}
                                />
                                {error && <Text style={Styles.errMsg}>{error.message}</Text>}
                            </>
                        )
                        }
                    />
                </View>
            </View>
            {/* Phone number and country Fields Code */}
            <View style={Styles.namesContainer}>
                {/* phoneNumber field Code*/}
                <View style={Styles.firstNameContainer}>
                    <Controller
                        control={control}
                        name={"editPhoneNumber"}
                        rules={{required:"*Ph.no required"}}
                        render={({fieldState:{error}})=>
                            (<>
                                <TextInput
                                    placeholder="Enter phoneNumber"
                                    value={editUSer.phoneNumber}
                                    keyboardType="numeric"
                                    onChangeText={(number)=>updateEditUser({...editUSer,"phoneNumber":number})}
                                    style={[Styles.nameInput,Styles.accountCommonInput]}
                                />
                                {error && <Text style={Styles.errMsg}>{error.message}</Text>}
                            </>
                        )
                        }
                    />
                </View>
                {/* country field code */}
                <View style={Styles.firstNameContainer}>
                    <Controller
                        control={control}
                        name={"edit Country"}
                        rules={{required:"*Country required"}}
                        render={({fieldState:{error}})=>
                            (<>
                                <TextInput
                                    placeholder="Select Country"
                                    value={editUSer.country}
                                    onChangeText={(country)=>updateEditUser({...editUSer,"country":country})}
                                    style={[Styles.nameInput,Styles.accountCommonInput]}
                                />
                                {error && <Text style={Styles.errMsg}>{error.message}</Text>}
                            </>
                        )
                        }
                    />
                </View>
            </View>
            {/* state and city fields code */}
            <View style={Styles.namesContainer}>
                {/* State field Code*/}
                <View style={Styles.firstNameContainer}>
                    <Controller
                        control={control}
                        name={"editState"}
                        rules={{required:"*State required"}}
                        render={({fieldState:{error}})=>
                            (<>
                                <TextInput
                                    placeholder="Enter Statename"
                                    value={editUSer.state}
                                    onChangeText={(state)=>updateEditUser({...editUSer,"state":state})}
                                    style={[Styles.nameInput,Styles.accountCommonInput]}
                                />
                                {error && <Text style={Styles.errMsg}>{error.message}</Text>}
                            </>
                        )
                        }
                    />
                </View>
                {/* city field code */}
                <View style={Styles.firstNameContainer}>
                    <Controller
                        control={control}
                        name={"editcity"}
                        rules={{required:"*City required"}}
                        render={({fieldState:{error}})=>
                            (<>
                                <TextInput
                                    placeholder="City Name"
                                    value={editUSer.city}
                                    onChangeText={(cityName)=>updateEditUser({...editUSer,"city":cityName})}
                                    style={[Styles.nameInput,Styles.accountCommonInput]}
                                />
                                {error && <Text style={Styles.errMsg}>{error.message}</Text>}
                            </>
                        )
                        }
                    />
                </View>
            </View>
            {/* Address and pincode fields code */}
            <View style={Styles.namesContainer}>
                {/* Address field Code*/}
                <View style={Styles.firstNameContainer}>
                    <Controller
                        control={control}
                        name={"editAddress"}
                        rules={{required:"*Address required"}}
                        render={({fieldState:{error}})=>
                            (<>
                                <TextInput
                                    placeholder="Enter address"
                                    value={editUSer.address}
                                    multiline
                                    onChangeText={(address)=>updateEditUser({...editUSer,"address":address})}
                                    style={[Styles.nameInput,Styles.accountCommonInput]}
                                />
                                {error && <Text style={Styles.errMsg}>{error.message}</Text>}
                            </>
                        )
                        }
                    />
                </View>
                {/* pincode field code */}
                <View style={Styles.firstNameContainer}>
                    <Controller
                        control={control}
                        name={"editpincode"}
                        rules={{required:"*Pincode required"}}
                        render={({fieldState:{error}})=>
                            (<>
                                <TextInput
                                    placeholder="Pincode"
                                    value={editUSer.pincode}
                                    keyboardType="numeric"
                                    onChangeText={(pincode)=>updateEditUser({...editUSer,"pincode":pincode})}
                                    style={[Styles.nameInput,Styles.accountCommonInput]}
                                />
                                {error && <Text style={Styles.errMsg}>{error.message}</Text>}
                            </>
                        )
                        }
                    />
                </View>
            </View>
                
            {/* Company and role fields code */}
            <View style={Styles.namesContainer}>
                {/* companyName field Code*/}
                <View style={Styles.firstNameContainer}>
                    <Controller
                        control={control}
                        name={"editCompanyName"}
                        rules={{required:"*CompanyName required"}}
                        render={({fieldState:{error}})=>
                            (<>
                                <TextInput
                                    placeholder="Enter CompanyName"
                                    value={editUSer.companyName}
                                    onChangeText={(companyName)=>updateEditUser({...editUSer,"companyName":companyName})}
                                    style={[Styles.nameInput,Styles.accountCommonInput]}
                                />
                                {error && <Text style={Styles.errMsg}>{error.message}</Text>}
                            </>
                        )
                        }
                    />
                </View>
                {/* Role field code */}
                <View style={Styles.firstNameContainer}>
                    <Controller
                        control={control}
                        name={"editrole"}
                        rules={{required:"*JobRole required"}}
                        render={({fieldState:{error}})=>
                            (<>
                                <TextInput
                                    placeholder="Enter Your Role"
                                    value={editUSer.role}
                                    onChangeText={(job)=>updateEditUser({...editUSer,"role":job})}
                                    style={[Styles.nameInput,Styles.accountCommonInput]}
                                />
                                {error && <Text style={Styles.errMsg}>{error.message}</Text>}
                            </>
                        )
                        }
                    />
                </View>
            </View>
            {/* Email field Code */}
            <View >
                {/* It is a account email field */}
                <Controller
                    name={"accountEmail"}
                    control={control}
                    rules={{required:"* Email required"}}
                    render={({fieldState:{error}})=>
                        <View >
                            <TextInput
                                value={editUSer.useremail} 
                                onChangeText={(email)=>updateEditUser({...editUSer,"useremail":email})} 
                                keyboardType="email-address"
                                style={[Styles.accountEmail,Styles.accountCommonInput]} 
                                placeholder="Email address"/>
                                {error && <Text style={Styles.errMsg}>{error.message}</Text>}
                        </View>
                    }
                />

            </View>
            {/* password field Code */}
            <View style={Styles.passwordContainer}>
                {/* It is a account password field */}
                <Controller
                    name={"accountPassword"}
                    rules={{required:"* Password required"}}
                    control={control}
                    render={({fieldState:{error}})=>
                        <View style={{display:"flex",flexDirection:"column"}}>
                            <View style={Styles.passwordAndEyeContainer}>
                                <TextInput
                                    value={editUSer.userpassword} 
                                    onChangeText={(password)=>updateEditUser({...editUSer,"userpassword":password})}  
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
        return (
           
            <SafeAreaView>
                <Modal visible={true} transparent={true} >
                    <View style={[Styles.popup,{height:height-((height/100)*60),width:width<768?width-((width/100)*5):width-((width/100)*40)}]}>
                        <View style={{margin:"auto"}}>
                        
                        
                            <ScrollView scrollEnabled nestedScrollEnabled bounces={false}>
                            
                                <View  style={{marginBottom:20}}>
                                    {editableForm()}
                                </View>
                                <View style={{display:"flex",flexDirection:"row",justifyContent:"space-around",alignItems:"center"}}>
                                    <Button title="SAVE" onPress={saveChanges}/>
                                    <Button title="CANCEL" onPress={hidePopUp}/>
                                </View>
                                
                            </ScrollView>
                            
                            
                        </View>
                    
                    </View>
                </Modal>
                   
             
            </SafeAreaView>
          
        )
    }

  
    //function for go to sign in page
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
        <View style={{borderRadius:10,margin:5,width:"90%",marginLeft:"auto",marginRight:"auto"}}>
            <SearchBar
                lightTheme={true}
                placeholder="Search"
                value={searchedValue}
                onChangeText={searchInputTextChange}
            />
        </View>
        {showTable ?
        <View style={{borderStyle:"solid",borderColor:"gray",borderWidth:1,borderRadius:10}}>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title >First Name</DataTable.Title>
                    <DataTable.Title>Last Name</DataTable.Title>
                    <DataTable.Title> Email</DataTable.Title>
                    <DataTable.Title> Edit</DataTable.Title>
                    <DataTable.Title> Delete Account</DataTable.Title>
                </DataTable.Header>
                {
                (allUsers.filter(each=>checkNameIncludesOrNot(each,searchedValue)).map(eachUser=><TableRow key={eachUser.id} userDetails={eachUser} editClick={editUserDetails} deleteAccount={deleteAccount} id={eachUser.id}/>))
                }
            </DataTable>
        </View>
        :
        <Text style={Styles.noUserExit}>Sorry.No user is exit with that name</Text>

        }
        <View style={{backgroundColor:"gray",width:100,position:"absolute",top:"80%",left:"75%"}} onPress={gotoSignIn}>
            <Button title="LogOut" color="#024359" onPress={gotoSignIn}/>
        </View>
        
        {editPopup && showPopup()}
       
   </View>)
}

const Styles=StyleSheet.create({
    popup:{
        margin:"auto",
        backgroundColor:"white",
        padding:10,
        borderRadius:10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
       
    },
     namesContainer:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        width:"100%",
        height:70,
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
        borderRadius:8,
        paddingRight:8
    },
    noUserExit:{
        textAlign:"center",
        fontSize:20,
        fontFamily:"Roboto",
        fontWeight:"bold",
        margin:"auto"
    }
})
export default UserDetails

