import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    innerContainer:{
      display:"flex",
    paddingTop:"5%",
    justifyContent:"space-around",
     alignItems:"center",
     backgroundColor:"#ffffff",
     borderTopLeftRadius:30,
     borderTopRightRadius:30,
    },
    iconsContainer:{
      width:130,
      display:'flex',
      flexDirection:"row",
      justifyContent:'space-around',
      alignItems:'center'
    },
    imageContainer:{
      width:"48%",
      height:"55%"
    },
   
    signHeading:{
      color:"black",
      fontSize:17,
      fontFamily:"Roboto",
      marginBottom:20,
    },
    commonProp:{
       fontSize:12,
      fontWeight:"bold",
      marginBottom:10,
    },
    newUser:{
      color:"gray",
    },
    createAccount:{
      color:"green",
    },
    input: {
    backgroundColor:"transparent",
    height: 50,
    marginLeft:0,
    // borderWidth: 1,
  },
  errMsg:{
    color:"red",
    fontSize:8,
    fontFamily:"Roboto",
   
  },
  passwordContainer:{
  display:"flex",
  flexDirection:"row",
  justifyContent:"space-around",
  alignItems:"center",
  borderBottomWidth:1,
  borderColor:"gray",
  borderStyle:"solid",
  borderRadius:8,
  paddingLeft:10,
  paddingRight:10
  },
  passwordEle:{
    width:"93%",
    borderWidth:0
  },
  button:{
    backgroundColor:'black',
    width:'100%',
    borderRadius:5,
    padding:10,
    
  },
  loginText:{
    color:"white",
    margin:"auto",
    fontFamily:"Roboto",
    fontSize:18
  }
  });
  
  export default styles;