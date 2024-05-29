import {View,Text} from "react-native"
import {Controller,useForm} from "react-hook-form"
import {TextInput} from "react-native-paper"
import Styles from "../../Account/accountstyles"


const CountryComponent=(props)=>{
    const {editUSer,updateCountry}=props
    const {control}=useForm();

    return(
        <View style={Styles.firstNameContainer}>
            <Controller
                control={control}
                name="country"
                render={()=>
                    (<>
                        <TextInput
                            placeholder="Select Country"
                            value={editUSer.country}
                            onChangeText={(country)=>updateCountry({...editUSer,"country":country})}
                            style={[Styles.nameInput,Styles.accountCommonInput]}
                        />
                        {editUSer.country==="" && <Text style={Styles.errMsg}>{"*country required"}</Text>}
                    </>
                )
                }
            />
        </View>
    )
}

export default CountryComponent