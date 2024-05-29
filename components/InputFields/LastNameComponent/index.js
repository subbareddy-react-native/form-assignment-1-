import { TextInput} from "react-native-paper"
import {View,Text} from "react-native"
import {useForm,Controller} from "react-hook-form"
import Styles from "../../Account/accountstyles"

const LastNameComponent =(props)=>{
    const {newAccount,updateLastName}=props
    const {control}=useForm()
    return (
        <View style={Styles.firstNameContainer}>
            <Controller
                control={control}
                name="lastName"
                render={()=>
                    (<>
                        <TextInput
                            placeholder="Last Name"
                            value={newAccount.lastName!==undefined ? newAccount.lastName:""}
                            onChangeText={(name)=>updateLastName({...newAccount,lastName:name})}
                            style={[Styles.nameInput,Styles.accountCommonInput]}
                        />
                        {newAccount.lastName==="" && <Text style={Styles.errMsg}>{"* Last Name required"}</Text>}
                    </>
                )
                }
            />
        </View>
    )


}
export default LastNameComponent;