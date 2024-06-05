import { TextInput} from "react-native-paper"
import {View,Text} from "react-native"
import {useForm,Controller} from "react-hook-form"
import Styles from "../../Account/accountstyles"
import { useMediaQuery } from "../../Hooks/useMediaQuery"

const FirstNameComponent=(props)=>{
    const {newAccount,updateFirstName}=props
    const {control}=useForm()
    const {width,isLg,isXl}=useMediaQuery()
    return (
        <View style={[Styles.firstNameContainer,{width:(width>769)?"48%":"100%"}]}>
            <Controller
                control={control}
                name="firstName"
                render={()=>
                    (<>
                        <TextInput
                            placeholder="First Name"
                            value={newAccount.firstName!==undefined ? newAccount.firstName:""}
                            onChangeText={(name)=>updateFirstName({...newAccount,firstName:name})}
                            style={[Styles.nameInput,Styles.accountCommonInput]}
                        />
                        {newAccount.firstName==="" && <Text style={Styles.errMsg}>{"* First Name required"}</Text>}
                    </>
                )
                }
            />
        </View>
    )


}
export default FirstNameComponent;