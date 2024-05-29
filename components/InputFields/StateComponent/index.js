import {View,Text} from "react-native"
import { Controller,useForm } from "react-hook-form"
import { TextInput } from "react-native-paper"
import Styles from "../../Account/accountstyles"

const StateComponent=(props)=>{
    const {editUSer,updateState}=props
    const {control}=useForm()
    return(
        <View style={Styles.firstNameContainer}>
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