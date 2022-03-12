import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setProduct } from "../redux/actions/productActions";
import ProductComponent from "./ProductComponents";
const ProductList = () => {
    const dispatch = useDispatch();
    const Products = useSelector((state) => state.allProducts.products);
    console.log(Products);
    const getchProducts = async () => {
        const { data } = await axios.get("https://fakestoreapi.com/products")
            .catch((Err) => console.log(Err));
        dispatch(setProduct(data));
    }
    useEffect(() => {
        getchProducts();
    }, [])
    return (
        <div className="ui grid container">
                <ProductComponent />
        </div>

    )
}
export default ProductList;
