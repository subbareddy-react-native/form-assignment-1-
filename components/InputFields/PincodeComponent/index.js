import {View,Text} from "react-native"
import { Controller,useForm } from "react-hook-form"
import { TextInput } from "react-native-paper"
import Styles from "../../Account/accountstyles"

const PincodeComponent=(props)=>{
    const {editUSer,updatePincode}=props
    const {control}=useForm()
    return(
        <View style={Styles.firstNameContainer}>
            <Controller
                control={control}
                name="pincode"
                render={()=>
                    (<>
                        <TextInput
                            placeholder="Pincode"
                            value={editUSer.pincode}
                            keyboardType="numeric"
                            onChangeText={(pincode)=>updatePincode({...editUSer,"pincode":pincode})}
                            style={[Styles.nameInput,Styles.accountCommonInput]}
                        />
                        {editUSer.pincode==="" && <Text style={Styles.errMsg}>{"*Pincode required"}</Text>}
                    </>
                )
                }
            />
        </View>
    )

}
export default PincodeComponent