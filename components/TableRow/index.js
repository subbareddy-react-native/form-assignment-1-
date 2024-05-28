import { DataTable } from "react-native-paper"
import {Entypo,AntDesign} from "react-native-vector-icons"


const TableRow=(props)=>{
    const {userDetails,editClick,id,deleteAccount}=props

    const editClicked=()=>{
        editClick(id)
    }

    const deleteAcc=()=>{
        deleteAccount(id)
    }

return(
    <DataTable.Row onPress={editClicked} >
        <DataTable.Cell>{userDetails.firstName}</DataTable.Cell>
        <DataTable.Cell>{userDetails.lastName}</DataTable.Cell>
        <DataTable.Cell>{userDetails.useremail}@gmail.com</DataTable.Cell>
        <DataTable.Cell><Entypo name="edit" size={25} onPress={editClicked}/></DataTable.Cell>
        <DataTable.Cell><AntDesign name="delete" size={25} onPress={deleteAcc}/></DataTable.Cell>
     </DataTable.Row>
)

}
export default TableRow