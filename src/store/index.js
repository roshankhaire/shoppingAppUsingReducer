import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const uiSlice=createSlice({
    name:"ui",
    initialState:{cartIsVisible:false},
    reducers:{
        toggle(state){
            state.cartIsVisible=!state.cartIsVisible
        }
    }
})
const store=configureStore({
          reducer:{ ui:uiSlice.reducer}
})

export const uiActions=uiSlice.actions
export default store