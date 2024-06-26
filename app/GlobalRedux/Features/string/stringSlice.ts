import { PayloadAction, createSlice } from "@reduxjs/toolkit";



export const stringSlice=createSlice({
    name:"string",
    initialState:{
        value:""
    },
    reducers:{
        updateString:(state,action:PayloadAction<string>)=>{
            state.value=action.payload;
        }
    }
})

export const {updateString}=stringSlice.actions
export default stringSlice.reducer;