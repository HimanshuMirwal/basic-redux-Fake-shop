import { actionTypes } from "../constants/actionTypes"

const initial = {
    products:[],
}
export const productReducer = (state=initial, action) =>{
    switch(action.type){
        case  actionTypes.setProducts:
            return {...state,products:action.payload};
        
        case actionTypes.selectedProduct:
            return {...state,...action.payload};
    default:
        return state;
    }
}