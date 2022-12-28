import { createContext, useEffect, useState } from "react";

const addCardItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(
        (cardItem) => cardItem.id === productToAdd.id 
    );

    if(existingCartItem){
        return cartItems.map( (cartItem) => 
            cartItem.id === productToAdd.id 
               ? { ...cartItem, quantity: cartItem.quantity + 1 }
               : cartItem
        );
    }
     return [...cartItems, { ...productToAdd, quantity:1 }];

}

const removeCartItem = (cartItems, cartItemToRemove) => {

    const existingCartItem = cartItems.find(
        (cardItem) => cardItem.id === cartItemToRemove.id 
    );

    if(existingCartItem.quantity === 1){
        return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
    }
  

    return cartItems.map((cartItem) => 
            cartItem.id === cartItemToRemove.id 
              ? { ...cartItem, quantity: cartItem.quantity - 1 }
              : cartItem
    );
        
};

const clearCartItem =  (cartItems, cartItemToClear)=>
    cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen : ()=> {},
    cartItems: [],
    addItemsToCart: ()=> {},
    cartCount: 0,
    total:0,
    removeItemToCart: ()=> {},
    clearItemFromCart : ()=> {}

});


export const CartProvider = ({children})=> {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount]  = useState(0); 
    const [cartTotal, setCartTotal]  = useState(0); 

    useEffect( ()=> {
        const newCartCount = cartItems.reduce( 
            (total, cartItem) => total + cartItem.quantity, 0)
        setCartCount(newCartCount);
    }, [cartItems]);

    useEffect( ()=> {
        const newCartTotal = cartItems.reduce( 
            (total, cartItem) => total + (cartItem.quantity * cartItem.price), 0)
        setCartTotal(newCartTotal);
    }, [cartItems]);
     

    const addItemToCart = (productToAdd) => {
        setCartItems(addCardItem(cartItems, productToAdd)); 
    }

    const removeItemToCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove)); 
    }

    
    const clearItemFromCart = (cartItemToClear) => {
        setCartItems(clearCartItem(cartItems, cartItemToClear)); 
    }
    const value = {
        isCartOpen,
        setIsCartOpen, 
        addItemToCart, 
        cartItems,
        cartCount, 
        cartTotal,
        removeItemToCart,
        clearItemFromCart
    };

    return(
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}