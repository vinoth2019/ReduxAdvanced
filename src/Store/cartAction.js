import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";
   
export const fetchCartData = () => {
    return async dispatch => {
        const fetchData = async() => {
            const response = await fetch('https://reactredux-a6e3e-default-rtdb.firebaseio.com/cart.json');
            if(!response.ok){
                throw new Error('Could not fetching a data...')
            }
            const data = await response.json()
            return data;
        }   
        try{
            const cartData = await fetchData();
            dispatch(cartActions.replaceCart({
                items: cartData.items || [],
                totalQuantity: cartData.totalQuantity,
            }))
        }
        catch(error){
            dispatch(uiActions.notify({
                title: 'Error',
                message: error.message,
                status: 'error'
              }))
        }
    }
}

export const sendCart = (cart) => {
    return async(dispatch) => {
        dispatch(uiActions.notify({
            title: 'Pending',
            message: 'Sending data...',
            status: 'pending'
          }))
        const sendingData = async() => {
            const response = await fetch('https://reactredux-a6e3e-default-rtdb.firebaseio.com/cart.json', {
                method: 'PUT',
                body: JSON.stringify({
                    items: cart.items,
                    totalQuantity: cart.totalQuantity
                })
              });
              if(!response.ok){
               throw new Error('Error')
              }
              
        }
        try{ await sendingData()
            dispatch(uiActions.notify({
                title: 'success',
                message: 'Sending data success',
                status: 'success'
              }));
        }
        catch(error){
            dispatch(uiActions.notify({
                title: 'Error',
                message: error.message,
                status: 'error'
              }))
        }
    }
}