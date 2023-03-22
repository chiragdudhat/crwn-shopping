
import { useCallback } from 'react';

import { useNavigate } from 'react-router-dom';
import { selectCartItems } from '../../store/cart/cart.selector';
import FormButton from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import './cart-dropdown.styles.scss'
import { setIsCartOpen } from '../../store/cart/cart.action';
import { useDispatch, useSelector } from 'react-redux';
import {selectCartCount, selectIsCartOpen} from  '../../store/cart/cart.selector';

const CartDropdown = () => {

    const cartItems = useSelector(selectCartItems);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isCartOpen = useSelector(selectIsCartOpen); 
    
    const goToCheckout = useCallback(() => {
        dispatch(setIsCartOpen(!isCartOpen));
        navigate('/checkout');

    }, []);

    return(
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {cartItems.map( item => (
                    <CartItem key={item.id} cartItem={item}  />)
                )}
            </div>
            <FormButton onClick={goToCheckout}> GO TO CHECKOUT</FormButton>
            
        </div>
    )
}

export default CartDropdown; 