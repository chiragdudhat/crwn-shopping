import FormButton from '../button/button.component';
import './product-card.styles.scss';

import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';




const ProductCard =({product}) => {
    const {name, price, imageUrl} = product;
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);

    const addItemHandler = () => dispatch(addItemToCart( cartItems ,product));
   return( 
   <div className='product-card-container'>
        <img src={imageUrl} alt={`${name}`}/>
        <div className='footer'>
            <span className='name'> {name}</span>
            <span className='price'> {price}</span>
        </div>
        <FormButton buttonType='inverted' onClick={addItemHandler}>Add to card</FormButton>
    </div>
)};

export default ProductCard; 