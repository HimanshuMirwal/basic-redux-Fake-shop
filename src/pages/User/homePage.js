import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import shopcloneDB from "../../FirebaseConfig";
import { getDocs, collection, where, query } from "firebase/firestore";
import "../../styleSheets/homaPage.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useParams } from "react-router-dom";
import TrandingProducts from "./TrandingProducts";
import { CategoryData } from "../Category";
import { ToastContainer } from 'react-toastify';

const HomePage = () => {
    const { category } = useParams();

    const [Products, SetProducts] = useState([]);
    const { CartItems } = useSelector(state => state.CartReducer);
    const [searchKey, setSearchKey] = useState("");
    const [FilterKey, setFilterKey] = useState("");

    const Dispatch = useDispatch();
    useEffect(() => {
        getData();
    }, [])
    const getData = async () => {
        const data = (category === "all") ? await getDocs(collection(shopcloneDB, "shopclone")) : await getDocs(query(collection(shopcloneDB, "shopclone"), where("category", "==", category)));
        const FinalProducts = [];
        console.log(data)
        data.forEach(product => {
            const obj = {
                id: product.id,
                ...product.data()
            }
            FinalProducts.push(obj);
        })
        SetProducts(FinalProducts);
    }
    // const AddData = ()=>{
    //     data.map(async(product)=>{
    //         try{
    //             const data = await addDoc(collection(shopcloneDB, "shopclone"), product);
    //         }catch(Err){
    //             console.log(Err);
    //         }
    //     })
    // }
    useEffect(() => {
        localStorage.setItem("CartItems", JSON.stringify(CartItems));
    }, [CartItems]);
    return (
        <Layout>
            {Object.keys(Products).length === 0 ? (
                <div className="row">
                    <div className="col-12  text-center">
                        <Loader />
                    </div>
                </div>
            ) : (
                <div className="m-5">
                <ToastContainer/>
                    <div className="row my-2">
                        <div className="col-6 mx-auto">
                            <div className="form-group">
                                <input value={searchKey} onChange={(e) => {
                                    setSearchKey(e.target.value);
                                }} type="text" className="form-control" id="exampleInputPassword1" placeholder="search product" />
                            </div>
                        </div>
                        {category === "all" && <div className="col-6">
                            <div class="form-group">
                                <select value={FilterKey} onChange={(e) => {
                                    setFilterKey(e.target.value);
                                }} id="" name="" className="form-control">
                                    <option value="">All</option>
                                    {
                                        CategoryData.map(data => {
                                            return <option value={data}>{data}</option>
                                        })
                                    }
                                </select>
                            </div>
                        </div>}
                    </div>
                    <div className="row">
                        {
                            Products
                                .filter(obj => obj.title.toLowerCase().includes(searchKey))
                                .filter(obj =>  {
                                            return FilterKey===""?obj.category.toLowerCase().includes(""):obj.category.toLowerCase()===FilterKey
                                        })
                                .map(product => {
                                    return (
                                        <TrandingProducts item={product} />
                                    )
                                })
                        }
                    </div>
                </div>)}
        </Layout>
    )
}
export default HomePage;
