import Cart from './components/Cart/Cart';
import { useEffect } from 'react';
import { useSelector} from 'react-redux';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useDispatch } from 'react-redux';
import {uisAction }from "./store/index"
import { Fragment } from 'react';
function App() {
  const showCart=useSelector(state=>state.ui.cartIsVisible)
  const cart=useSelector(state=>state.cart)
  //const notification=useSelector(state=>state.ui.notification)
  const notification=useSelector(state=>state.ui.loading)
  const successful=useSelector(state=>state.ui.successful)
  console.log(notification)
  const dispatch=useDispatch()
  useEffect(()=>{
    const sendCartData= async()=>{
     
        const response=await fetch("https://shoping-app-using-reducers-default-rtdb.firebaseio.com/cart.json",{
          method:'PUT',
          body:JSON.stringify(cart),
        })
        if(!response.ok){
          throw new Error("request is failed")
        }
       
     
     
      const responseData=response.json()
     
    
    }
     
  },[cart])
  return (
    <Fragment>
    <Layout>
      {notification && <p> loading</p>}
      { !notification && showCart && <p>loading</p>  &&<Cart />}
      { notification && showCart && <Cart />}
      <Products />
    </Layout>
    </Fragment>
  );
}

export default App;