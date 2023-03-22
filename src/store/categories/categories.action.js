import { createAction } from "../../utils/firebase/reducer/reducer.utils";
import { CATEGORY_ACTION_TYPES } from "./categories.types";

export const setCategoriesMap = (categoriesmap) => 
    createAction(CATEGORY_ACTION_TYPES.SET_CATEGORIES_MAP, categoriesmap); 