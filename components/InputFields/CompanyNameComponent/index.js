import {View,Text} from "react-native"
import {Controller,useForm} from "react-hook-form"
import {TextInput} from "react-native-paper"
import Styles from "../../Account/accountstyles"


const CompanyNameComponent=(props)=>{
    const {editUSer,updateCompany}=props
    const {control}=useForm();
    return(
        <View style={Styles.firstNameContainer}>
                    <Controller
                        control={control}
                        name="company"
                        render={()=>
                            (<>
                                <TextInput
                                    placeholder="Enter CompanyName"
                                    value={editUSer.companyName}
                                    onChangeText={(companyName)=>updateCompany({...editUSer,"companyName":companyName})}
                                    style={[Styles.nameInput,Styles.accountCommonInput]}
                                />
                                {editUSer.companyName==="" && <Text style={Styles.errMsg}>{"*CompanyName required"}</Text>}
                            </>
                        )
                        }
                    />
                </View>
    )

}
export default CompanyNameComponent

