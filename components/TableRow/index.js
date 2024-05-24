import { DataTable } from "react-native-paper"
import {MaterialCommunityIcons} from "react-native-vector-icons"

const TableRow=(props)=>{
    const {userDetails,editClick,id}=props

    const editClicked=()=>{
        editClick(id)
    }

return(
    <DataTable.Row >
        <DataTable.Cell>{userDetails.firstName}</DataTable.Cell>
        <DataTable.Cell>{userDetails.lastName}</DataTable.Cell>
        <DataTable.Cell>{userDetails.useremail}@gmail.com</DataTable.Cell>
        <DataTable.Cell><MaterialCommunityIcons name="pin" size={25} onPress={editClicked}/></DataTable.Cell>
     </DataTable.Row>
)

}
export default TableRow