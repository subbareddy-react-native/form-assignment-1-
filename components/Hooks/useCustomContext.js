import { createContext } from "react";


const DotsContext=createContext(
    {
        cond:false,
        deleteIconCond:false,
        deleteIconClicked:false,
        updateDeleteIconCond:()=>{},
        updateDotCond:()=>{},
        deleteSelectedAccount:()=>{}
    }
)
export default DotsContext;