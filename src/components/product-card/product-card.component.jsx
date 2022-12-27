import FormButton from '../button/button.component';
import './product-card.styles.scss';

const ProductCard =({product}) => {
    const {name, price, imageUrl} = product;
   return( 
   <div className='product-card-container'>
        <img src={imageUrl} alt={`${name}`}/>
        <div className='footer'>
            <span className='name'> {name}</span>
            <span className='price'> {price}</span>
        </div>
        <FormButton buttonType='inverted'>Add to card</FormButton>
    </div>
)};

export default ProductCard; 