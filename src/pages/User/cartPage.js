import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout";
import { FaCartArrowDown, FaTrash } from "react-icons/fa";
import {  REMOVE_TO_CART } from "../../redux/Actions/Action";
import TotalAndModal from "./TotalAndModal";
const CartPage = () => {
    const { CartItems } = useSelector(state => state.CartReducer);
    const Dispatch=useDispatch();
    let Total = 0;
    CartItems.map(item => { Total += item.price });
    useEffect(() => {
        localStorage.setItem("CartItems", JSON.stringify(CartItems));
    }, [CartItems]);
    const RemoveItem = id =>{
        Dispatch({type:REMOVE_TO_CART, payload:id})
    }
    return (
        <Layout>
            <div className="container">
                <div className="row border-bottom my-3">
                    <div className="col-12 text-center text-success">
                        <h3><FaCartArrowDown size={30} /> Your Cart</h3>
                    </div>
                </div>
                {
                    CartItems.map((product, index) => {
                        return <div className="row my-4">
                            <div className="col-2 text-center text-dark">
                                <b>{index + 1}</b>
                            </div>
                            <div className="col-6 text-center ">
                                <a href={"/detail/" + product.id} style={{ textDecoration: "none"}}>
                                    <div className="row">
                                        <div className="col-4">
                                        <img src={product.image} height="50vh" alt={product.title} />
                                        </div>
                                        <div className="col-8">
                                        <b className="text-dark">{product.title}</b>
                                        </div>
                                    </div>
                                </a>
                            </div>

                            <div className="col-2 text-center text-dark">
                                <b>${product.price}</b>
                            </div>

                            <div className="col-2 text-center text-danger">
                                <b><FaTrash size={30} onClick={() => {RemoveItem(product.tempId)}} /></b>
                            </div>
                        </div>
                    })

                }
                <TotalAndModal total={Total} />
            </div>
        </Layout>
    )
}
export default CartPage;
