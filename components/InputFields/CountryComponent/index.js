import {View,Text} from "react-native"
import {Controller,useForm} from "react-hook-form"
import {TextInput} from "react-native-paper"
import Styles from "../../Account/accountstyles"
import { useMediaQuery } from "../../Hooks/useMediaQuery"


const CountryComponent=(props)=>{
    const {editUSer,updateCountry}=props
    const {control}=useForm();
    const {width}=useMediaQuery()
    return(
        <View style={[Styles.firstNameContainer,{width:(width>769)?"48%":"100%"}]}>
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