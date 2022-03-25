import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../components/Layout";
import shopCloneDB from "../../FirebaseConfig";
import { FaStar, FaTags, FaCartArrowDown } from "react-icons/fa";
import "../../styleSheets/productInfo.css"
import { Colors } from "../../Colors";
import Loader from "../../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { ADD_TO_CART } from "../../redux/Actions/Action";
import CardProduct from "../../components/CardProduct";
const ProductInfo = () => {
    const { id } = useParams();
    const { CartItems } = useSelector(state => state.CartReducer);
    const [Product, SetProduct] = useState({});
    const Dispatch = useDispatch();
    const [suggestion, setSuggestion] = useState([]);
    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        localStorage.setItem("CartItems", JSON.stringify(CartItems));
    }, [CartItems]);
    const getData = async () => {
        try {
            // const data = await getDoc(doc(shopCloneDB, "shopclone"), id);
            // SetProduct(data);
            const docRef = doc(shopCloneDB, "shopclone", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                // console.log("Document data:", docSnap.data());
                SetProduct(docSnap.data());


                const suggestionText = docSnap.data().category;

                // For suggestions
                const suggestionData = await getDocs(query(collection(shopCloneDB, "shopclone"), where("category", "==", suggestionText)));
                const suggestionUpdatedData = [];
                suggestionData.forEach(item => {
                    if(item.id===id){

                    }else{
                        const data = {
                            id: item.id,
                            ...item.data()
                        }
                        suggestionUpdatedData.push(data);
                    }
                })
                setSuggestion(suggestionUpdatedData);
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }

        } catch (Err) {
            console.log(Err)
        }
    }
    function addToCart(product) {
        const newdata = {
            ...product,
            tempId: product.id + Math.floor(Math.random() * 100000)
        }
        console.log(newdata);
        Dispatch({ type: ADD_TO_CART, payload: newdata })
    }
    return (
        <Layout>
            {Object.keys(Product).length === 0 ? (
                <div className="row">
                    <div className="col-12  text-center">
                        <Loader />
                    </div>
                </div>
            ) : (
                <div className="row" style={{ marginBottom: "100px" }}>
                    <div className="Detail_col_image">
                        <img src={Product.image} height={"400px"} width="100%" alt={Product.title} />
                    </div>
                    <div className="Detail_col_Text text-bold">
                        <h2 style={{ color: Colors.BlueDark }}>{Product.title}</h2>
                        <hr />
                        <div className="detail_Button_Div">
                            <h5 className="Detail_Points" style={{ color: Colors.BlueLight }} >Rating</h5>
                            <p className="Detail_Points" style={{ color: Colors.Black }}>
                                <FaStar size={25} color={"yellow"} /> {Product.rating.rate}</p>
                        </div>
                        <div className="detail_Button_Div">
                            <h5 className="Detail_Points" style={{ color: Colors.BlueLight }} >Price</h5>
                            <p className="Detail_Points" style={{ color: Colors.Black }}><FaTags size={25} color={"teal"} />$ {Product.price}</p>
                        </div>
                        <div className="detail_Description">
                            <h5 style={{ color: Colors.BlueLight }}>Description</h5>
                            <p style={{ color: Colors.Black }}>
                                {Product.description}
                            </p>
                        </div>
                        <div className="detail_Button_Div">
                            <button
                                style={{ backgroundColor: Colors.Black, color: Colors.Light }}
                                className="btn btn-group-lg Detail_Button"
                                onClick={() => {
                                    addToCart(Product)
                                }}
                            >
                                <FaCartArrowDown size={25} />Add to cart</button>
                        </div>
                    </div>
                    <div className="text-bold text-center">
                        <h2 style={{ color: Colors.BlueDark }}>You might also like</h2>
                    </div>
                    <div className="SuggestionDivParent">
                        {
                            suggestion.map(product => {
                                return <CardProduct product={product} />
                            })
                        }
                    </div>
                </div>
            )}

        </Layout>)
}
export default ProductInfo;
