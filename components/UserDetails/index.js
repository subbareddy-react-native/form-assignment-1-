import {Text, View,StyleSheet,Modal,Button,
ScrollView, Alert,KeyboardAvoidingView,Keyboard,TouchableWithoutFeedback,Platform,Switch,
    TouchableOpacity} from "react-native"
import * as React from "react"
import { SearchBar } from "react-native-elements"
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
// import { Checkbox} from "react-native-paper"
import Checkbox from "expo-checkbox";
import {useState,useEffect,useContext} from "react"
import TableRow from "../TableRow"
import { SafeAreaView } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";
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
import {useKeyboard} from "../Hooks/useKeyboard"
import {useMediaQuery} from "../Hooks/useMediaQuery"
import useCustomContext from "../Hooks/useCustomContext"


const UserDetails=({navigation})=>{
    const Context=useContext(useCustomContext)
    const {cond,updateDotCond,updateDeleteIconCond,deleteIconClicked,deleteSelectedAccount}=Context //this object is extract from the app.js (context created)
    const {isKeyboardVisible}=useKeyboard()
    const [searchedValue,updateSearchInput]=useState("")
    const [showTable,updateShowTable]=useState(true)
    const [allUsers,updateAllusers]=useState([])
    const [userDetailsPopup,setUserDetailsPopup]=useState(false)
    const {isSm,isLg,isXl,isMd,width,height}=useMediaQuery()
    const [editUSer,updateEditUser]=useState({})
    const [editPopup,setEditPopup]=useState(false)
    const [allCheckBoxs,SetAllCheckboxs]=useState(false)

    const selectedUserFun=(id)=>{
        const editUserDetails=allUsers.find(each=>each.id===id)
        updateEditUser({...editUserDetails})
        setUserDetailsPopup(true)
    }

    const selectedCheckBoxUser=(id)=>{
        const selectedCheckBoxUserList=allUsers.map(each=>{
            if(each.id===id){
                return {...each,checkbox:!each.checkbox}
            }else{
                return each
            }
        })
        const atleastOneSelected=selectedCheckBoxUserList.some(each=>each.checkbox===true)
        const AllCheckBoxexChecked=selectedCheckBoxUserList.every(each=>each.checkbox)
        if(AllCheckBoxexChecked){
            SetAllCheckboxs(true)
        }else{
            SetAllCheckboxs(false)
        }
        if(atleastOneSelected){
            updateDeleteIconCond(true)
        }else{
            updateDeleteIconCond(false)
        }

        updateAllusers(selectedCheckBoxUserList)
    }


    const hideUserDetailsPopup=()=>{
        setUserDetailsPopup(prevState=>!prevState)
    }


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


    const hidePopUp=()=>{
        setEditPopup(false)
        setUserDetailsPopup(false) // this for userdetails pop up false condition
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
    //

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
        
        const newUpdateUserDetails=allUsers.map((item)=>{
            if(item.id===newUserDetails.id){
                return newUserDetails
            }else{
                return item
            }
        })

        updateAllusers(newUpdateUserDetails)
        await AsyncStorage.setItem("usersList",JSON.stringify(newUpdateUserDetails))
        hidePopUp()
    }

    const deleteAccount=async()=>{
        const filteredUsers=allUsers.filter(each=>each.checkbox!==true)
        updateAllusers([...filteredUsers])
        await AsyncStorage.setItem("usersList",JSON.stringify(filteredUsers))
    }

    if(deleteIconClicked){
        Alert.alert("Are You Sure","are you sure for delete the selected account",[
            {
                text:"YES",
                onPress:()=>{
                    deleteSelectedAccount()
                    deleteAccount()
                }
            },
            {
                text:"NO",
                onPress:()=>{
                    deleteSelectedAccount()
                }
            }
        ])
        
    }
    


    // function for click on user for edit 
    const editUserDetails=()=>{
        setEditPopup(!editPopup)
        setUserDetailsPopup(false)
    }

    const editableForm=()=>{
        return (
        <>
            <View style={[Styles.namesContainer,{flexDirection:(isLg || isXl)?"row":"column",height:(isXl || isLg)?80:130,justifyContent:(isLg || isXl)?"space-between":"space-around"}]}>
                <FirstNameComponent newAccount={editUSer} updateFirstName={updateEditUser}/>
                <LastNameComponent newAccount={editUSer} updateLastName={updateEditUser}/>
            </View>
            <View style={[Styles.namesContainer,{flexDirection:(isLg || isXl)?"row":"column",height:(isXl || isLg)?80:130,justifyContent:(isLg || isXl)?"space-between":"space-around"}]}>
                <PhoneNumberComponent editUser={editUSer} updatePhoneNumber={updateEditUser}/>
                <CountryComponent editUSer={editUSer} updateCountry={updateEditUser}/>
            </View>
            <View style={[Styles.namesContainer,,{flexDirection:(isLg || isXl)?"row":"column",height:(isXl || isLg)?80:130,justifyContent:(isLg || isXl)?"space-between":"space-around"}]}>
                <StateComponent editUSer={editUSer} updateState={updateEditUser}/>
                <CityComponent editUSer={editUSer} updateCity={updateEditUser} />
            </View>
            <View style={[Styles.namesContainer,,{flexDirection:(isLg || isXl)?"row":"column",height:(isXl || isLg)?80:130,justifyContent:(isLg || isXl)?"space-between":"space-around"}]}>
                <AddressComponent editUSer={editUSer} updateAddress={updateEditUser}/>
                <PincodeComponent editUSer={editUSer} updatePincode={updateEditUser}/>
            </View>  
            <View style={[Styles.namesContainer,,{flexDirection:(isLg || isXl)?"row":"column",height:(isXl || isLg)?80:130,justifyContent:(isLg || isXl)?"space-between":"space-around"}]}>
                <CompanyNameComponent editUSer={editUSer} updateCompany={updateEditUser}/>
                <RoleComponent editUSer={editUSer} updateRole={updateEditUser}/>
            </View>
            <View style={[Styles.namesContainer,,{flexDirection:(isLg || isXl)?"row":"column",height:(isXl || isLg)?80:130,justifyContent:(isLg || isXl)?"space-between":"space-around"}]}>
                <EmailComponent newAccount={editUSer} updateEmailText={updateEditUser}/>
                <PasswordComponent newAccount={editUSer}  updatePassword={updateEditUser}/>
            </View>
        </>
       )

    }


    // this popup belongs to userform fields
    const showPopup=()=>{
        return (
        <KeyboardAvoidingView behavior="hieght" style={{flex:1}}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView>
                    <Modal visible={true} transparent={true} animationType="fade">
                        <TouchableOpacity style={{height:"100%",width:"100%"}} activeOpacity={1} onPress={ hidePopUp} >
                            <View style={[Styles.popup,{marginBottom:(isKeyboardVisible)?(isLg)?"41%":"45%":"auto"},{height:(isLg||isXl)?500:"55%",width:(isLg||isXl)?800:(isMd)?"60%":"90%"}]} onStartShouldSetResponder={() => true}
                                        onPress={(event)=>{
                                        event.stopPropagation()}} >
                                <View style={{margin:"auto"}}>
                                    <ScrollView scrollEnabled nestedScrollEnabled bounces={false}>
                                        <View>
                                            {editableForm()}
                                        </View>
                                        <View style={Styles.saveAndCancelBtnsContainer}>
                                            <Button title="SAVE" onPress={saveChanges} />
                                            <Button title="CANCEL" onPress={hidePopUp}/>
                                        </View>
                                    </ScrollView>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </Modal> 
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
               
        )
    }

    //this popup belongs to userDetails popup
    const paticularUserDetailsPopup=()=>{
        return(
            <Modal visible={true} transparent={true} animationType="fade">
            <TouchableOpacity style={{height:"100%",width:"100%"}} activeOpacity={1} onPress={ hideUserDetailsPopup} >
                <View style={[Styles.popup,{width:(isLg || isXl)?800:(isMd)?"75%":"90%",height:(isLg||isXl)?500:"55%"},{marginBottom:isKeyboardVisible?"5%":"auto"}]} 
                    onStartShouldSetResponder={() => true}
                    onPress={(event)=>{
                    event.stopPropagation()}}>
                    {/* inner container */}
                    <View style={{height:"100%",width:"100%",margin:"auto"}}>
                        {/* header container */}
                        <View style={{marginBottom:5,height:"10%",width:"100%"}}>
                        {/* edit and cancle buttons container */}
                            <View style={{height:"100%",width:100,marginLeft:"auto",display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-around"}}>
                                <AntDesign name="edit" size={24} color="black" onPress={editUserDetails}/> 
                                <FontAwesome6 name="xmark" size={24} color="black" onPress={hideUserDetailsPopup}/>
                            </View>
                        </View>
                        {/* user info container */}
                        <View style={{height:"90%"}}>
                            {/* userHeading container */}
                            <View style={{marginBottom:10}}>
                                <Text style={{fontFamily:"Roboto",fontSize:20,fontWeight:"bold"}}>User Details</Text>
                            </View>
                            {/*fields container */}
                            <View style={{height:"70%",display:"flex",flexDirection:"row"}}>
                                {/* fields container */}
                                <View style={{width:"100%"}}>
                                    <ScrollView>
                                        <View style={{width:"100%",height:"100%",display:"flex",flexDirection:isLg?"row":"column",flexWrap:"wrap",justifyContent:"center"}}>
                                            <Text style={[Styles.eachFieldInUserDetails,{width:isLg?"48%":"100%"}]}><Text style={{color:isLg?"gray":"#17026b"}}>Name:   </Text>{editUSer.firstName+" "+editUSer.lastName}</Text>
                                            <Text style={[Styles.eachFieldInUserDetails,{width:isLg?"48%":"100%"}]}><Text style={{color:isLg?"gray":"#17026b"}}>DOB:   </Text>10/06/2000</Text>
                                            <Text style={[Styles.eachFieldInUserDetails,{width:isLg?"48%":"100%"}]}><Text style={{color:isLg?"gray":"#17026b"}}>Address:   </Text>{editUSer.address!==undefined?editUSer.address:"None"}</Text>
                                            <Text style={[Styles.eachFieldInUserDetails,{width:isLg?"48%":"100%"}]}><Text style={{color:isLg?"gray":"#17026b"}}>City:   </Text>{editUSer.city!==undefined?editUSer.city:"None"}</Text>
                                            <Text style={[Styles.eachFieldInUserDetails,{width:isLg?"48%":"100%"}]}><Text style={{color:isLg?"gray":"#17026b"}}>State:   </Text>{editUSer.state!==undefined?editUSer.state:"None"}</Text>
                                            <Text style={[Styles.eachFieldInUserDetails,{width:isLg?"48%":"100%"}]}><Text style={{color:isLg?"gray":"#17026b"}}>Country:   </Text>{editUSer.country!==undefined?editUSer.country:"None"}</Text>
                                            <Text style={[Styles.eachFieldInUserDetails,{width:isLg?"48%":"100%"}]}><Text style={{color:isLg?"gray":"#17026b"}}>Pincode:   </Text>{editUSer.pincode!==undefined?editUSer.pincode:"None"}</Text>
                                            <Text style={[Styles.eachFieldInUserDetails,{width:isLg?"48%":"100%"}]}><Text style={{color:isLg?"gray":"#17026b"}}>PhoneNumber:   </Text>{editUSer.phoneNumber!==undefined?editUSer.phoneNumber:"None"}</Text>
                                            <Text style={[Styles.eachFieldInUserDetails,{width:isLg?"48%":"100%"}]}><Text style={{color:isLg?"gray":"#17026b"}}>CompanyName:   </Text>{editUSer.companyName!==undefined?editUSer.companyName:"None"}</Text>
                                            <Text style={[Styles.eachFieldInUserDetails,{width:isLg?"48%":"100%"}]}><Text style={{color:isLg?"gray":"#17026b"}}>Role:   </Text>{editUSer.role!==undefined?editUSer.role:"None"}</Text>
                                            <Text style={[Styles.eachFieldInUserDetails,{width:isLg?"48%":"100%"}]}><Text style={{color:isLg?"gray":"#17026b"}}>Email:    </Text>{editUSer.useremail!==undefined?editUSer.useremail:"None"}</Text>
                                            <Text style={[Styles.eachFieldInUserDetails,{width:isLg?"48%":"100%"}]}><Text style={{color:isLg?"gray":"#17026b"}}>Password:   </Text>{editUSer.userpassword!==undefined?editUSer.userpassword:"None"}</Text>
                                        </View>
                                    </ScrollView>
                                </View>
                            </View>
                            <View style={{marginTop:"3%"}}>
                                <Text style={{fontFamily:"Roboto",fontWeight:"bold"}}><Text style={{color:isLg?"gray":"#17026b",fontSize:20}}>About:   </Text>asdghjskkbddnb sjand jasdadv ajs ajd jasbdkabdjaskbda kbdkajsbd</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
            </Modal>
        )
    }

    //userDetails popup with profile
    const showUserDetailsPopup=()=>{
        return (
            <>
                {userDetailsPopup?
                // if  UserDetailsPopup is true then show edit form
                    paticularUserDetailsPopup()
                :
                // if  UserDetailsPopup is fasle then show user details popup
                    showPopup()
                }
            </>
           
       )
    }

    const gotoSignIn=()=>{
        updateDotCond(false)
        Alert.alert("LogOut","Are You Sure for logout ?",[
            {
                text:"OK",
                onPress:()=>{
                    navigation.navigate("SignIn")
                }
            },
            {
                text:"CANCEL",
                

            }
        ])
        
    }

    const hideThreeDotsPopUp=()=>{
        updateDotCond(false)
    }

    const showThreeDotsPopUp=()=>{
        return(
            <Modal visible={true} transparent={true} animationType="fade">
                 <TouchableOpacity style={{position:"relative",height:"100%",width:"100%"}} activeOpacity={1} onPress={ hideThreeDotsPopUp} >
                    <View style={[Styles.popup,{minWidth:150,minHeight:"10%",position:"absolute",top:(isLg || isXl)?"10%":(isMd)?"8%":"6%",left:(isLg || isXl)?"83%":(isMd)?"78%":"60%"}] }
                        onStartShouldSetResponder={() => true}
                        onPress={(event)=>{
                        event.stopPropagation()}}
                    >
                       <Button title="Info"  color="#000" />
                       <Button title="Logout" color="#000" onPress={gotoSignIn}/>
                    </View>
                 </TouchableOpacity>
                
            </Modal>
        )
    }

    const clickedOnAllCheckBoxes=()=>{
        const allCheckBoxesList=allUsers.map(each=>{
            if(allCheckBoxs===false){
                return  {...each,checkbox:true}
            }else{
                return  {...each,checkbox:false}
            }
        })
        updateAllusers(allCheckBoxesList)
        const AllCheckBoxexChecked=allCheckBoxesList.every(each=>each.checkbox)
        if(AllCheckBoxexChecked){
            SetAllCheckboxs(true)
        }else{
            SetAllCheckboxs(false)
        }
        const atleastOneSelected=allCheckBoxesList.some(each=>each.checkbox===true)
       
        if(atleastOneSelected){
            updateDeleteIconCond(true)
        }else{
            updateDeleteIconCond(false)
        }
    }

   return(<View style={{height:height}}>
        <View style={Styles.searchBarContainer}>
            <View style={{width:"100%"}}>
                <SearchBar
                    clearIcon={true}
                    style={Styles.searchBar}
                    lightTheme={true}
                    placeholder="Search"
                    value={searchedValue}
                    onChangeText={searchInputTextChange}
                    containerStyle={{
                        backgroundColor: 'transparent',
                        borderBottomColor: 'transparent',
                        borderTopColor: 'transparent',
                        }}
                        inputContainerStyle={{
                        backgroundColor: 'white',
                        borderRadius: 8,
                        
                        }}
                />
            </View>
        </View>
        {allUsers.filter(each=>checkNameIncludesOrNot(each,searchedValue)).length!==0 &&
        <View style={{display:"flex",flexDirection:"row",alignItems:"center",marginBottom:10,marginLeft:10}}>
            <Checkbox
                value={allCheckBoxs}  
                onValueChange={clickedOnAllCheckBoxes} 
            />
           <Text> Select users</Text>
        </View>
        }
        
        {showTable ?
        allUsers.length !==0 ?
        (<View style={{width:"100%",height:"100%"}}>
           <FlashList
                numColumns={isSm?1:isMd?2:3}
                data={allUsers.filter(each=>checkNameIncludesOrNot(each,searchedValue))}
                renderItem={({ item }) =>(
                    <TableRow key={item.id} userDetails={item} selectedUserFun={selectedUserFun} selectedCheckBoxUser={selectedCheckBoxUser}/>
                )}
                estimatedItemSize={200}
            />


        </View>):(<Text style={Styles.noUserExit}>No card  exist here</Text>)
        :
        <Text style={Styles.noUserExit}>Sorry.No card is exit with that name</Text>
        }
        {cond&& showThreeDotsPopUp()}
        {(userDetailsPopup || editPopup) && showUserDetailsPopup()}
   </View>)
}

const Styles=StyleSheet.create({
    popup:{
        margin:"auto",
        backgroundColor:"white",
        padding:5,
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
    eachFieldInUserDetails:{
        marginBottom:"3%", 
        fontFamily:"Roboto",
        fontWeight:"bold"

    },
     namesContainer:{
        display:"flex",
        flexWrap:"wrap",
        width:"100%",
     },
    noUserExit:{
        textAlign:"center",
        fontSize:20,
        fontFamily:"Roboto",
        fontWeight:"bold",
        margin:"auto"
    },
    searchBarContainer:{
        margin:8,
    },
    saveAndCancelBtnsContainer:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-around",
        alignItems:"center",
        marginTop:15
    },
    center:{
        display:"flex",justifyContent:"center",alignItems:"center",
        // borderStyle:"solid",
        // borderWidth:1,
        // borderColor:"green"
    }
})
export default UserDetails;

