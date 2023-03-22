import { Outlet, Link,useNavigate } from "react-router-dom"
import { Fragment, useContext, useEffect } from "react";

import { ReactComponent as CrwnLogo} from '../../assets/crown.svg';
import './navigation.styles.scss';
import { useCallback } from 'react';
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectIsCartOpen,selectCartItems } from "../../store/cart/cart.selector";
import { setIsCartOpen,clearItemFromCart, clearCart } from '../../store/cart/cart.action';

const Navigation = ()=> {
    const dispatch =useDispatch();
    const navigate = useNavigate()
    const currentUser = useSelector(selectCurrentUser);
    const isCartOpen = useSelector(selectIsCartOpen);
    const cartItems = useSelector(selectCartItems);
     const hidecart = useCallback(() => {
       dispatch(setIsCartOpen(false));
    }, []);

    useEffect(()=>{
      if(currentUser){
          setTimeout(() => {
              navigate('/')
          }, 10);
      }
    },[currentUser] )

    const signOut = ()=>{
        dispatch(clearCart());
        signOutUser();
        dispatch(setIsCartOpen(false));
        navigate('/');
    }
  
    return(
      <Fragment>
        <div className="navigation">
            <Link className="logo-container" to='/' onClick={()=> dispatch(setIsCartOpen(false))}>
              
                <CrwnLogo />
            </Link>
            <div className="nav-links-container"> 
             
                <Link className="nav-link" to='/shop' onClick={()=> dispatch(setIsCartOpen(false))}>
                    <h1> SHOP </h1>
                </Link>
               <h3>{currentUser &&  currentUser.displayName}</h3>
                {currentUser ? (
                    
                    <span className="nav-link" onClick={signOut}>
                      
                       SIGN OUT {' '}
                     
                      </span> 
                     
                ) : (
                  <Link className="nav-link" to='/auth' onClick={()=> dispatch(setIsCartOpen(false))}>SIGN IN </Link>
                )}
               <CartIcon/>
                
            </div>
            { isCartOpen && < CartDropdown/> }
            
        </div>
        <Outlet/> 
      </Fragment>
    )
  }

  
export default Navigation; 