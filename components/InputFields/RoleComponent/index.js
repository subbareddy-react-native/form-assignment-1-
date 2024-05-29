import {View,Text} from "react-native"
import {Controller,useForm} from "react-hook-form"
import {TextInput} from "react-native-paper"
import Styles from "../../Account/accountstyles"

const RoleComponent=(props)=>{
    const {editUSer,updateRole}=props
    const {control}=useForm()
    return(
        <View style={Styles.firstNameContainer}>
                    <Controller
                        control={control}
                        name="role"
                        render={()=>
                            (<>
                                <TextInput
                                    placeholder="Enter Your Role"
                                    value={editUSer.role}
                                    onChangeText={(job)=>updateRole({...editUSer,"role":job})}
                                    style={[Styles.nameInput,Styles.accountCommonInput]}
                                />
                                {editUSer.role==="" && <Text style={Styles.errMsg}>{"*JobRole required"}</Text>}
                            </>
                        )
                        }
                    />
                </View>
    )

}
export default RoleComponent;