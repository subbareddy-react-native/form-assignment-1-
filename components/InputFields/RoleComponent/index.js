import {View,Text} from "react-native"
import {Controller,useForm} from "react-hook-form"
import {TextInput} from "react-native-paper"
import Styles from "../../Account/accountstyles"
import { useMediaQuery } from "../../Hooks/useMediaQuery"

const RoleComponent=(props)=>{
    const {editUSer,updateRole}=props
    const {control}=useForm()
    const {width}=useMediaQuery()
    return(
        <View style={[Styles.firstNameContainer,{width:(width>769)?"48%":"100%"}]}>
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