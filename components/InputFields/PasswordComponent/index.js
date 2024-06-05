import {View,Text} from "react-native"
import { Controller,useForm } from "react-hook-form"
import { TextInput } from "react-native-paper"
import {Entypo} from 'react-native-vector-icons';
import Styles from "../../Account/accountstyles"
import {useState} from "react"
import { useMediaQuery } from "../../Hooks/useMediaQuery";


const PasswordComponent=(props)=>{
    const {newAccount,updatePassword}=props
    const {control}=useForm()
    const [showPassword,setShowPassword]=useState(false)
    const {width}=useMediaQuery()
    
    const showAndHiddePassword=()=>{
        setShowPassword((prev)=>!prev)
    }
    return(
        <View style={[Styles.passwordContainer,{width:(width>769?"48%":"100%")}]}>
            <Controller
                name={"accountPassword"}
                control={control}
                render={()=>
                    <View style={{display:"flex",flexDirection:"column"}}>
                        <View style={Styles.passwordAndEyeContainer}>
                            <TextInput
                                value={newAccount.userpassword!==undefined ? newAccount.userpassword:""} 
                                onChangeText={(password)=>updatePassword({...newAccount,userpassword:password})} 
                                style={Styles.passwordInput} 
                                secureTextEntry={!showPassword}
                                placeholder="Password"/>
                                <Entypo name={showPassword?"eye":"eye-with-line"} size={20} color="#000" onPress={showAndHiddePassword}/>
                        </View>
                        {newAccount.userpassword==="" && <Text style={Styles.errMsg}>{"* Password required"}</Text>}
                    </View>
                } 
            />
        </View>
    )

}
export default PasswordComponent