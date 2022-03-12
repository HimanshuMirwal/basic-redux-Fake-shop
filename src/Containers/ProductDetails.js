import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectedProduct } from "../redux/actions/productActions";
const ProductDetail = ()=>{
    const Products = useSelector((state) => state.allProducts);
    
    const {productId} = useParams();
    const dispatch = useDispatch()
    const getchProducts = async () => {
        console.log(productId);
        const { data } = await axios.get("https://fakestoreapi.com/products/"+productId)
            .catch((Err) => console.log(Err));
        dispatch(selectedProduct(data));
    }
    useEffect(() => {
        if(productId && productId !== ""){
            getchProducts();
        }
    }, [productId])
    return(
        <div className="ui grid container">
        {Object.keys(Products).length ===0 ?(
            <div>Loading.....</div>
        ):(
            <div className="ui placeholder segment">
                <div className="ui two column  stackable centre aligned grid"> 
                    <div className="ui vertical divider"></div>
                    <div className="middle aligned row">
                        <div className="column lp">
                            <img className="ui fluid image" src={Products.image} />
                        </div>
                        <div className="column rp">
                            <h1>{Products.title}</h1>
                            <h2>
                                <a className="ui teal tag label">{Products.price}</a>
                            </h2>
                            <h3 className="ui brown block header">
                            {Products.category}
                            </h3>
                            <p className="description">
                            {Products.description}
                            </p>
                            <div className="ui green  vertical animated button" tabIndex="0">
                            <div className="visible content">Add To Cart</div>
                                <div className="hidden content">
                                    <i className="shop icon"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)}
        </div>
    )
}
export default ProductDetail;
