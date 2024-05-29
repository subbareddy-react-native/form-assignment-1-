import { Alert } from "react-native"
import { DataTable } from "react-native-paper"
import {Entypo,AntDesign} from "react-native-vector-icons"

const TableRow=(props)=>{
    const {userDetails,editClick,deleteAccount}=props

    const editClicked=()=>{
        editClick(userDetails.id)
    }

    const deleteAcc=()=>{
        Alert.alert("Are You Sure","are you sure for delete this  account",[
            {
                text:"YES",
                onPress:()=>{
                    deleteAccount(userDetails.id)
                }
            },
            {
                text:"NO"
            }
        ])
       
    }

return(
    <DataTable.Row onPress={editClicked} >
        <DataTable.Cell>{userDetails.firstName}</DataTable.Cell>
        <DataTable.Cell>{userDetails.lastName}</DataTable.Cell>
        <DataTable.Cell>{userDetails.useremail}@gmail.com</DataTable.Cell>
        <DataTable.Cell><Entypo name="edit" size={25} onPress={editClicked}/></DataTable.Cell>
        <DataTable.Cell><AntDesign name="delete" size={20} onPress={deleteAcc}/></DataTable.Cell>
     </DataTable.Row>
)

}
export default TableRow