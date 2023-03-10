import { useContext } from 'react';
import { useNavigate, useNavigation } from 'react-router-dom';
import { CartContext } from '../../contexts/cart.context';
import FormButton from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import './cart-dropdown.styles.scss'

const CartDropdown = () => {
    const { cartItems  } = useContext(CartContext); 
    const navigate = useNavigate();
  
    const goToCheckout = () => {
        navigate('/checkout');
    }

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