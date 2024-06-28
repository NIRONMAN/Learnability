'use client'

import {configureStore} from '@reduxjs/toolkit'
import counterReducer from './Features/counter/counterSlice'
import stringReducer from "./Features/string/stringSlice"
export const store =configureStore({
    reducer:{
        counter:counterReducer,
        string:stringReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch