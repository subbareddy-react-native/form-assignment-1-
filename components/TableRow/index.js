import { StyleSheet,Platform,Switch,View,Text, TouchableOpacity} from "react-native"
// import CheckBox from '@react-native-community/checkbox';
// import { DataTable,Checkbox } from "react-native-paper"
import { Fontisto } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import Checkbox from "expo-checkbox";

const TableRow=(props)=>{
    const {userDetails,selectedUserFun,selectedCheckBoxUser}=props

    const rowClicked=()=>{
        selectedUserFun(userDetails.id)
    }

    const selectedCheckBox=()=>{
        selectedCheckBoxUser(userDetails.id)
    }
return(
    // <DataTable.Row  onPress={rowClicked} >
    //     <DataTable.Cell style={Styles.center}>
    //         { Platform.OS === 'ios' ? (<Switch
    //                         trackColor={{false: '#767577', true: 'green'}}
    //                         ios_backgroundColor="#3e3e3e"
    //                         onValueChange={selectedCheckBox}
    //                         value={userDetails.checkbox}
    //                     />): 
    //                     ( <Checkbox
    //                         value={true}
    //                         status={userDetails.checkbox?"checked":"unchecked"}
    //                         onPress={selectedCheckBox}
    //                     />)}
    //         {/* <Checkbox
    //             value={true}
    //             status={userDetails.checkbox?"checked":"unchecked"}
    //             onPress={selectedCheckBox}
    //         /> */}
    //     </DataTable.Cell>
    //     <DataTable.Cell style={Styles.center}>{userDetails.firstName}</DataTable.Cell>
    //     <DataTable.Cell style={Styles.center}>{userDetails.lastName}</DataTable.Cell>
    //     <DataTable.Cell style={Styles.center} >{userDetails.useremail}</DataTable.Cell>
    //  </DataTable.Row>
            <TouchableOpacity style={{marginBottom:12}}  onPress={rowClicked}  >
                        <View style={{display:"flex",flexDirection:"row",marginBottom:2}}>
                                <Text style={{fontSize:20}}>{userDetails.firstName}</Text>
                                <Text style={{fontSize:20}}> {userDetails.lastName}</Text>
                        </View>
                        <View style={{backgroundColor:"lightgray",borderRadius:10,marginBottom:10}}>
                            <View style={{minHeight:"15%",backgroundColor:"green",borderTopLeftRadius:10,borderTopRightRadius:10}}>
                                    <Text>{""}</Text>
                            </View>
                            <View style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
                                <View style={[Styles.center,{margin:4}]}>
                                    <Checkbox
                                        value={userDetails.checkbox}
                                        onValueChange={selectedCheckBox}
                                    />
                                </View>
                                <View >
                                    <View style={{height:100,display:'flex',flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                                        <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center",width:"28%"}}>
                                            <Fontisto name="date" size={20} color="black" />  
                                            <View >
                                                <Text>Date</Text>
                                                <Text>{userDetails.accCreateddate}</Text>
                                            </View>      
                                            
                                        </View>
                                        <View style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between",width:"60%"}}>
                                            <MaterialIcons name="email" size={20} color="black" />  
                                            <View style={{marginRight:3}} >
                                                <Text>Email</Text>
                                                <Text numberOfLines={1} >{userDetails.useremail}</Text>
                                            </View>
                                            
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
            </TouchableOpacity>
)

}
const Styles=StyleSheet.create({
    center:{
        display:"flex",alignItems:"center",justifyContent:"center"
    }
})
export default TableRow