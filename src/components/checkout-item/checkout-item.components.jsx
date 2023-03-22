
import './checkout-item.styles.scss';
import { useSelector, useDispatch } from 'react-redux';
import {addItemToCart,removeItemToCart, clearItemFromCart } from '../../store/cart/cart.action'; 
import { selectCartItems } from '../../store/cart/cart.selector';

const CheckoutItem = ({cartItem})=> {
    const dispatch = useDispatch();
    const {name, quantity, price, imageUrl} = cartItem;
    const cartItems = useSelector(selectCartItems);

    const addItemHandler = ()=> dispatch(addItemToCart(cartItems, cartItem));
    const removeItemHandler = ()=> dispatch(removeItemToCart(cartItems,cartItem));
    const createItemHandler = ()=> dispatch(clearItemFromCart(cartItems,cartItem));
    
    return(
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={`${name}`} />
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div className='arrow' onClick={removeItemHandler}>&#10094; </div>
                <span className='value'> {quantity} </span>    
                <div className='arrow' onClick={addItemHandler}> &#10095;</div>
            </span>
            <span className='price'>{price}</span>
            <div className='remove-button' onClick={createItemHandler}>&#10005;</div>
         </div>
    );
};

export default CheckoutItem;