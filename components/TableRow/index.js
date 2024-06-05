import { StyleSheet,Platform,Switch} from "react-native"
// import CheckBox from '@react-native-community/checkbox';
import { DataTable,Checkbox } from "react-native-paper"


const TableRow=(props)=>{
    const {userDetails,selectedUserFun,selectedCheckBoxUser}=props

    const rowClicked=()=>{
        selectedUserFun(userDetails.id)
    }

    const selectedCheckBox=()=>{
        selectedCheckBoxUser(userDetails.id)
    }

return(
    <DataTable.Row  onPress={rowClicked} >
        <DataTable.Cell style={Styles.center}>
            { Platform.OS === 'ios' ? (<Switch
                            trackColor={{false: '#767577', true: 'green'}}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={selectedCheckBox}
                            value={userDetails.checkbox}
                        />): 
                        ( <Checkbox
                            value={true}
                            status={userDetails.checkbox?"checked":"unchecked"}
                            onPress={selectedCheckBox}
                        />)}
            {/* <Checkbox
                value={true}
                status={userDetails.checkbox?"checked":"unchecked"}
                onPress={selectedCheckBox}
            /> */}
        </DataTable.Cell>
        <DataTable.Cell style={Styles.center}>{userDetails.firstName}</DataTable.Cell>
        <DataTable.Cell style={Styles.center}>{userDetails.lastName}</DataTable.Cell>
        <DataTable.Cell style={Styles.center} >{userDetails.useremail}</DataTable.Cell>
     </DataTable.Row>
)

}
const Styles=StyleSheet.create({
    center:{
        display:"flex",alignItems:"center",justifyContent:"center"
    }
})
export default TableRow