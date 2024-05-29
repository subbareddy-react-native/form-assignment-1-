import {View,Text} from "react-native"
import {Controller,useForm} from "react-hook-form"
import {TextInput} from "react-native-paper"
import Styles from "../../Account/accountstyles"

const CityComponent=(props)=>{
    const {editUSer,updateCity}=props
    const {control}=useForm()
    return (
        <View style={Styles.firstNameContainer}>
            <Controller
                control={control}
                name="city"
                render={()=>
                    (<>
                        <TextInput
                            placeholder="City Name"
                            value={editUSer.city}
                            onChangeText={(cityName)=>updateCity({...editUSer,"city":cityName})}
                            style={[Styles.nameInput,Styles.accountCommonInput]}
                        />
                        {editUSer.city==="" && <Text style={Styles.errMsg}>{"*City required"}</Text>}
                    </>
                )
                }
            />
        </View>
    )
}
export default CityComponent