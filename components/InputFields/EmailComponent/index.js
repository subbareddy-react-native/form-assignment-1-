import { View,Text} from "react-native";
import { TextInput } from "react-native-paper";
import { useForm,Controller } from "react-hook-form";
import Styles from "../../Account/accountstyles";


const EmailComponent=(props)=>{
    const {newAccount,updateEmailText}=props
    const {control}=useForm()
    return(
        <View >
            <Controller
                name={"accountEmail"}
                control={control}
                render={()=>
                    <View >
                        <TextInput
                            value={newAccount.useremail!==undefined ? newAccount.useremail:""}
                            onChangeText={(email)=>updateEmailText({...newAccount,useremail:email})} 
                            keyboardType="email-address"
                            style={[Styles.accountEmail,Styles.accountCommonInput]} 
                            placeholder="Email address"/>
                            {newAccount.useremail==="" && <Text style={Styles.errMsg}>{"* Email required"}</Text>}
                    </View>
                }
            />

        </View>
    )

}
export default EmailComponent;