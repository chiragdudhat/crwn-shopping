import { Routes,Route } from "react-router-dom";
import Home from "./Routes/Home/home.component";
import Navigation from "./Routes/Navigation/navigation.component";
import Authentication from "./Routes/authentication/authenication.component";
import Shop from "./Routes/shop/shop.component";
import Checkout from "./Routes/checkout/checkout.component";
import { useEffect } from "react";
import { onAuthStateChangedListener,createUserDocumentFromAuth } from "./utils/firebase/firebase.utils";
import { setCurrentUser } from "./store/user/user.action";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();

  useEffect(()=> {
    const unsubscribe = onAuthStateChangedListener( (user)=>  {
    if(user){
       createUserDocumentFromAuth(user);
    }
    dispatch(setCurrentUser(user));
    
    })
    
    return unsubscribe; 
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigation/>}>
        <Route index element={<Home />}/>
        <Route path='shop/*' element={<Shop />} />
        <Route path='auth' element={<Authentication />} />
        <Route path='checkout' element={<Checkout/>}/>
      </Route>
     
    </Routes>         
     
  )
  
}

export default App;
