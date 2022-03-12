import {actionTypes} from "../constants/actionTypes";
export const setProduct = (Products)=>{
    return {
        type:actionTypes.setProducts,
        payload:Products
    }
} 
export const selectedProduct = (Products)=>{
    return {
        type:actionTypes.selectedProduct ,
        payload:Products
    }
} 