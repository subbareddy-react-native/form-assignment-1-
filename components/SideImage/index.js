import {Image,StyleSheet} from "react-native"

const SideImage=()=>{

    return(
        <Image
        style={Styles.sideImage}
        resizeMode="cover"
        source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png',
        }}
      />
    )

}

const Styles=StyleSheet.create({
    sideImage:{
        width:"100%",
        height:"100%",
        borderRadius:10,
    }

})

export default SideImage;