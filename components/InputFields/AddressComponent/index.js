import {View,Text} from "react-native"
import {Controller,useForm} from "react-hook-form"
import {TextInput} from "react-native-paper"
import Styles from "../../Account/accountstyles"
import { useMediaQuery } from "../../Hooks/useMediaQuery"

const AddressComponent=(props)=>{
    const {editUSer,updateAddress}=props
  const {control}=useForm()
  const {width}=useMediaQuery()
    return(
        <View style={[Styles.firstNameContainer,{width:(width>769)?"48%":"100%"}]}>
            <Controller
                control={control}
                name="address"
                render={()=>
                    (<>
                        <TextInput
                            placeholder="Enter address"
                            value={editUSer.address}
                            multiline
                            onChangeText={(address)=>updateAddress({...editUSer,"address":address})}
                            style={[Styles.nameInput,Styles.accountCommonInput]}
                        />
                        {editUSer.address==="" && <Text style={Styles.errMsg}>{"*Address required"}</Text>}
                    </>
                )
                }
            />
        </View>
    )
}
export default AddressComponent;