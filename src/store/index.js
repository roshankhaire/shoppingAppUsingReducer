import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";


 

 

 const cartSlice=createSlice({
    name:"cart",
    initialState:{
        items:[],
        totalQuantity:0,
        totalAmount:0
    },
    reducers:{
        replaceCartData(state,action){
            state.items=action.payload.items,
            state.totalQuantity=action.payload.totalQuantity
        },
        addItemToCart(state,action){
            const newItem=action.payload;
            const existingItem=state.items.find(item=>item.id===newItem.id)
            state.totalQuantity++;
            if(!existingItem){
                state.items.push({
                    id:newItem.id,
                    price:newItem.price,
                    quantity:1,
                    totalPrice:newItem.price,
                    name:newItem.title
                })
            }
            else{
                existingItem.quantity=existingItem.quantity+1;
                existingItem.totalPrice=existingItem.totalPrice+newItem.price
            }
        },
        removeItemFromCart(state,action){
            const id=action.payload;
           const  existingItem=state.items.find(item=>item.id===id);
            state.totalQuantity--
            if(existingItem.quantity===1){
            state.items=state.items.filter(item=>item.id!==id)
            }
            else{
                existingItem.quantity--;
                existingItem.totalPrice=existingItem.totalPrice-existingItem.price
            }
        },
       
       }

})

const uiSlice=createSlice({
    name:"ui",
    initialState:{cartIsVisible:false ,notification:null},
   
    reducers:{
        toggle(state){
            state.cartIsVisible=!state.cartIsVisible
        },
       showNotification(state,action){
        state.notification={
            status:action.payload.status,
            title:action.payload.title,
            message:action.payload.message
        }

       }
    }
    
})
 export const fetchCartData=()=>{
    return async(dispatch)=>{
        const fetchData= async()=>{
            dispatch( uisAction.showNotification({
                status:"pending",
                title:"fetching",
                message:"sending cart data..."
              }))
            const response=await fetch("https://shoping-app-using-reducers-default-rtdb.firebaseio.com/cart.json")
            if(!response.ok){
                throw new Error('unable to fetch cart data')
            }
            const data=await response.json()
            return data
            try{
                const cartData= await fetchData()
                dispatch(cartActions.replaceCartData(cartData))
            }catch(err){
                dispatch(uisAction.showNotification({
                    status:"error",
                    title:"failed to fetch",
                    message:"something went wrong"
                  }))
            }
        }

    }
 }
 export const sendCartData=(cart)=>{
 return async(dispatch)=>{
    dispatch( uisAction.showNotification({
        status:"pending",
        title:"sending",
        message:"sending cart data..."
      }))
      const sendRequest= async()=>{
        const response=await fetch("https://shoping-app-using-reducers-default-rtdb.firebaseio.com/cart.json",{
        method:'PUT',
        body:JSON.stringify(cart),
      })
      if(!response.ok){
        throw new Error("Failed to send cart data....")
      }
     
      }
      
     try{
        await sendRequest()
        dispatch(uisAction.showNotification({
            status:"success",
            title:"success",
            message:"cart data sent successfully."
          }))
     } catch(err){
        dispatch(uisAction.showNotification({
            status:"error",
            title:"failed",
            message:"something went wrong"
          }))
     }
 }
}
const store=configureStore({
          reducer:{ ui:uiSlice.reducer,
        cart:cartSlice.reducer}
})
export const cartActions=cartSlice.actions
export const uisAction=uiSlice.actions
export default store