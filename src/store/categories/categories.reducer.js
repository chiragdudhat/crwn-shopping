import { CATEGORY_ACTION_TYPES } from "./categories.types";



export const CATEGORIES_INITIAL_STATE = {
    categoriesMap : {}
}

export const categoriesReducer = (state = CATEGORIES_INITIAL_STATE, action= {}) => {
    const { type, payload } = action; 

    switch (type) {
        case CATEGORY_ACTION_TYPES.SET_CATEGORIES_MAP:
            return {
                ...state,
                categoriesMap: payload
            }
            break;
    
        default:
            return state
    }

};
