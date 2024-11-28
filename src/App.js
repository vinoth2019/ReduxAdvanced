import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useEffect } from 'react'; 
import Notification from './components/UI/Notification'; 
import { fetchCartData, sendCart } from './Store/cartAction';

let initialValue = true;

function App() {
  const uiShow = useSelector((state) => state.ui.cartIsVisble);
  const cart = useSelector((state) => state.cart);
  const notificationData = useSelector((state) => state.ui.notification); 
  const dispatch =  useDispatch();  
  useEffect(() => {
    
    dispatch(fetchCartData())
    
  }, [dispatch])

  useEffect(() => {     
    if(initialValue){
      initialValue = false;
      return;        
    } 
    if(cart.changed){
       dispatch(sendCart(cart))
    }
   
  }, [cart, dispatch])
  return (
    <>
      {notificationData && <Notification title={notificationData.title} status={notificationData.status} message={notificationData.message} />}
      <Layout>
        {uiShow && <Cart />}
        <Products />
      </Layout>
    </>
    
  );
}

export default App;
