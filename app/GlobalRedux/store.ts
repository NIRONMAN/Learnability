'use client'

import {configureStore} from '@reduxjs/toolkit'
import counterReducer from './Features/counter/counterSlice'
import stringReducer from "./Features/string/stringSlice"
import authReducer from './Features/auth/authSlice'

export const store =configureStore({
    reducer:{
        counter:counterReducer,
        string:stringReducer,
        auth: authReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch