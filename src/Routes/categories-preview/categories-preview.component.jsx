import {useSelector  } from "react-redux";
import {selectCategoriesMap} from '../../store/categories/categories.selector'
import {  Fragment } from "react";
import CategoryPreview from "../../components/category-preview/category-preview.component";


const Categoriespreview = ()=> {
    // const {categoriesMap} = useContext(CategoriesContext);
    const categoriesMap = useSelector(selectCategoriesMap);
    return(
        <Fragment>
            { Object.keys(categoriesMap).map(title => {
                   const products = categoriesMap[title];
                   return <CategoryPreview key={title} title={title} products={products}/>
                })
            }
        </Fragment>
    );
};

export default Categoriespreview;

