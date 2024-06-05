import {View,Text} from "react-native"
import { Controller,useForm } from "react-hook-form"
import { TextInput } from "react-native-paper"
import Styles from "../../Account/accountstyles"
import { useMediaQuery } from "../../Hooks/useMediaQuery"

const StateComponent=(props)=>{
    const {editUSer,updateState}=props
    const {control}=useForm()
    const {width}=useMediaQuery()
    return(
        <View style={[Styles.firstNameContainer,{width:(width>769)?"48%":"100%"}]}>
            <Controller
                control={control}
                name="state"
                render={()=>
                    (<>
                        <TextInput
                            placeholder="Enter Statename"
                            value={editUSer.state}
                            onChangeText={(state)=>updateState({...editUSer,"state":state})}
                            style={[Styles.nameInput,Styles.accountCommonInput]}
                        />
                        {editUSer.state==="" && <Text style={Styles.errMsg}>{"*State required"}</Text>}
                    </>
                )
                }
            />
        </View>
    )
}
export default StateComponent