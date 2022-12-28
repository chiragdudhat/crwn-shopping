import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import FormButton from '../button/button.component';
import './product-card.styles.scss';

const ProductCard =({product}) => {
    const {name, price, imageUrl} = product;
    const { addItemToCart} = useContext(CartContext);

    const addProductToCard = ()=> addItemToCart(product);

   return( 
   <div className='product-card-container'>
        <img src={imageUrl} alt={`${name}`}/>
        <div className='footer'>
            <span className='name'> {name}</span>
            <span className='price'> {price}</span>
        </div>
        <FormButton buttonType='inverted' onClick={addProductToCard }>Add to card</FormButton>
    </div>
)};

export default ProductCard; 