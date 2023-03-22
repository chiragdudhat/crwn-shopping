import { Route,Routes } from 'react-router-dom';
import Categoriespreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';

import { useEffect } from "react";
// import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.jsx";
import './shop.styles.scss';
import { setCategoriesMap } from '../../store/categories/categories.action';
import { useDispatch } from 'react-redux';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';

const Shop = ()=> {
    
    const dispatch = useDispatch(); 
    useEffect( ()=>{
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
          
            
            dispatch(setCategoriesMap(categoryMap));

        };
        getCategoriesMap();
    }, []);

    return(
        <Routes>
            <Route index element={<Categoriespreview/>} />
            <Route path=':category' element={<Category />}/>
        </Routes>
    );
};

export default Shop;

  