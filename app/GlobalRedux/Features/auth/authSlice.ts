import { createSlice } from "@reduxjs/toolkit";



export const authSlice= createSlice({
    name:"auth",
    initialState:{
        value:false
    },
    reducers:{
        changeAuth:(state)=>{
            state.value=!state.value;
        }
    }
})
export const {changeAuth} =authSlice.actions
export default authSlice.reducer