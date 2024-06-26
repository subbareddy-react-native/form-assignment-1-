import {View,Text} from "react-native"
import { Controller ,useForm} from "react-hook-form"
import {TextInput} from "react-native-paper"
import Styles from "../../Account/accountstyles"
import { useMediaQuery } from "../../Hooks/useMediaQuery"

const PhoneNumberComponent=(props)=>{
    const {editUser,updatePhoneNumber}=props
    const {control}=useForm()
    const {width}=useMediaQuery()

    return(
        <View style={[Styles.firstNameContainer,{width:(width>769)?"48%":"100%"}]}>
                    <Controller
                        control={control}
                        name="phoneNumber"
                        
                        render={()=>
                            (<>
                                <TextInput
                                    placeholder="Enter phoneNumber"
                                    value={editUser.phoneNumber}
                                    keyboardType="numeric"
                                    onChangeText={(number)=>updatePhoneNumber({...editUser,"phoneNumber":number})}
                                    style={[Styles.nameInput,Styles.accountCommonInput]}
                                />
                                {editUser.phoneNumber==="" && <Text style={Styles.errMsg}>{"*phone number required"}</Text>}
                            </>
                        )
                        }
                    />
                </View>
    )

}
export default PhoneNumberComponent