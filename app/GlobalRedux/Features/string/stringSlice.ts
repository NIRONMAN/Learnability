import { PayloadAction, createSlice } from "@reduxjs/toolkit";



export const stringSlice=createSlice({
    name:"string",
    initialState:{
        systemPrompt:"",
        url:"",
        contextType:null,
        isContextSet:false
    },
    reducers:{
        updateString:(state,action:PayloadAction<string>)=>{
            state.systemPrompt=action.payload;
        },
        updateURL:(state,action:PayloadAction<string>)=>{
            state.url=action.payload;
        },
        setContextType:(state,action:PayloadAction<string>)=>{
            state.contextType=action.payload;
        },
        setIsContextSet:(state)=>{
            state.isContextSet=!state.isContextSet;
        },
        


    }
})

export const {updateString,updateURL,setContextType,setIsContextSet}=stringSlice.actions
export default stringSlice.reducer;