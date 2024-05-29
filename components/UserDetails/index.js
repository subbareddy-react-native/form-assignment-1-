import {Text, View,StyleSheet,Modal,Button,
    useWindowDimensions,ScrollView, Alert,KeyboardAvoidingView,Keyboard,TouchableWithoutFeedback} from "react-native"
import * as React from "react"
import { SearchBar } from "react-native-elements"
import { DataTable} from "react-native-paper"
import {useState,useEffect} from "react"
import TableRow from "../TableRow"
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LastNameComponent from "../InputFields/LastNameComponent"
import EmailComponent from "../InputFields/EmailComponent";
import PasswordComponent from "../InputFields/PasswordComponent";
import FirstNameComponent from "../InputFields/FirstNameComponent"
import PhoneNumberComponent from "../InputFields/PhoneNumberComponent"
import CountryComponent from "../InputFields/CountryComponent"
import StateComponent from "../InputFields/StateComponent"
import CityComponent from "../InputFields/CityComponent"
import AddressComponent from "../InputFields/AddressComponent"
import PincodeComponent from "../InputFields/PincodeComponent"
import CompanyNameComponent from "../InputFields/CompanyNameComponent"
import RoleComponent from "../InputFields/RoleComponent"

const UserDetails=({navigation})=>{
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

    //searching Functionality
    const checkNameIncludesOrNot=(each,text)=>{

        return ((each.firstName+" "+each.lastName).toLowerCase().includes(text.toLowerCase()))
    }
    const searchInputTextChange=(text)=>{
        const tableCondition=allUsers.some(each=>checkNameIncludesOrNot(each,text))
        updateShowTable(tableCondition)
        updateSearchInput(text)

    }
    //

    const hidePopUp=()=>{
        setEditPopup(!editPopup)
    }

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

    const editableForm=()=>{
        return (
        <>
            <View style={Styles.namesContainer}>
                <FirstNameComponent newAccount={editUSer} updateFirstName={updateEditUser}/>
                <LastNameComponent newAccount={editUSer} updateLastName={updateEditUser}/>
            </View>
            <View style={Styles.namesContainer}>
                <PhoneNumberComponent editUser={editUSer} updatePhoneNumber={updateEditUser}/>
                <CountryComponent editUSer={editUSer} updateCountry={updateEditUser}/>
            </View>
            <View style={Styles.namesContainer}>
                <StateComponent editUSer={editUSer} updateState={updateEditUser}/>
                <CityComponent editUSer={editUSer} updateCity={updateEditUser} />
            </View>
            <View style={Styles.namesContainer}>
                <AddressComponent editUSer={editUSer} updateAddress={updateEditUser}/>
                <PincodeComponent editUSer={editUSer} updatePincode={updateEditUser}/>
            </View>  
            <View style={Styles.namesContainer}>
                <CompanyNameComponent editUSer={editUSer} updateCompany={updateEditUser}/>
                <RoleComponent editUSer={editUSer} updateRole={updateEditUser}/>
            </View>
            <EmailComponent newAccount={editUSer} updateEmailText={updateEditUser}/>
            <PasswordComponent newAccount={editUSer}  updatePassword={updateEditUser}/>
            
        </>
       )

    }

    const showPopup=()=>{
        return (
            <KeyboardAvoidingView behavior="hieght" style={{flex:1}}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <SafeAreaView>
                        <Modal visible={true} transparent={true} >
                            <View style={[Styles.popup,{height:height-((height/100)*50),width:width<768?width-((width/100)*5):width-((width/100)*40)}]}>
                                <View style={{margin:"auto"}}>
                                    <ScrollView scrollEnabled nestedScrollEnabled bounces={false}>
                                        <View  style={{marginBottom:20}}>
                                            {editableForm()}
                                        </View>
                                        <View style={Styles.saveAndCancelBtnsContainer}>
                                            <Button title="SAVE" onPress={saveChanges}/>
                                            <Button title="CANCEL" onPress={hidePopUp}/>
                                        </View>
                                    </ScrollView>
                                </View>
                            </View>
                        </Modal>
                    </SafeAreaView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        )
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
        <View style={Styles.searchBarContainer}>
            <SearchBar
                lightTheme={true}
                placeholder="Search"
                value={searchedValue}
                onChangeText={searchInputTextChange}
            />
        </View>
        {showTable ?
        <View style={Styles.tableContainer}>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title >First Name</DataTable.Title>
                    <DataTable.Title>Last Name</DataTable.Title>
                    <DataTable.Title> Email</DataTable.Title>
                    <DataTable.Title> Edit</DataTable.Title>
                    <DataTable.Title> Delete Account</DataTable.Title>
                </DataTable.Header>
                {
                (allUsers.filter(each=>checkNameIncludesOrNot(each,searchedValue)).map(eachUser=><TableRow key={eachUser.id} userDetails={eachUser} editClick={editUserDetails} deleteAccount={deleteAccount}/>))
                }
            </DataTable>
        </View>
        :
        <Text style={Styles.noUserExit}>Sorry.No user is exit with that name</Text>
        }
        <View style={Styles.logoutBtn} onPress={gotoSignIn}>
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
    noUserExit:{
        textAlign:"center",
        fontSize:20,
        fontFamily:"Roboto",
        fontWeight:"bold",
        margin:"auto"
    },
    searchBarContainer:{
        borderRadius:10,
        margin:5,width:"90%",
        marginLeft:"auto",
        marginRight:"auto"
    },
    tableContainer:{
        borderStyle:"solid",
        borderColor:"gray",
        borderWidth:1,
        borderRadius:10
    },
    logoutBtn:{
        backgroundColor:"gray",
        width:100,
        position:"absolute",
        top:"80%",left:"75%"
    },
    saveAndCancelBtnsContainer:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-around",
        alignItems:"center"
    }
})
export default UserDetails;

