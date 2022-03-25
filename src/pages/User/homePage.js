import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import shopcloneDB from "../../FirebaseConfig";
import { addDoc, getDocs, collection } from "firebase/firestore";
import "../../styleSheets/homaPage.css";
import { FaCartPlus, FaInfoCircle, FaTag} from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux";
import { ADD_TO_CART } from "../../redux/Actions/Action";
import Loader from "../../components/Loader";
import {Colors} from "../../Colors";
const HomePage = () => {
    const [Products, SetProducts] = useState([]);
    const {CartItems}=useSelector(state=>state.CartReducer);
    const [searchKey, setSearchKey] = useState("");
    const [FilterKey, setFilterKey] = useState("");

    const Dispatch = useDispatch();
    useEffect(() => {
        getData();
    }, [])
    const getData = async () => {
        const data = await getDocs(collection(shopcloneDB, "shopclone"));
        const FinalProducts = [];
        data.forEach(product => {
            const obj = {
                id: product.id,
                ...product.data()
            }
            FinalProducts.push(obj);
            console.log(Products);
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
    useEffect(()=>{
        localStorage.setItem("CartItems", JSON.stringify(CartItems));
    },[CartItems]);

    function addToCart(product){
        const newdata ={
            ...product,
            tempId : product.id+Math.floor(Math.random()*100000)
        }
        console.log(newdata);
        Dispatch({type:ADD_TO_CART, payload:newdata})
    }
    return (
        <Layout>
         {Object.keys(Products).length === 0 ? (
            <div className="row">
                    <div className="col-12  text-center">
                        <Loader />
                    </div>
            </div>
            ) : (
            <div className="">
            <div className="row my-2">
                <div className="col-6 ">
                <div className="form-group">
                    <input value={searchKey} onChange={(e)=>{
                        setSearchKey(e.target.value);
                    }} type="text" className="form-control" id="exampleInputPassword1" placeholder="search product" />
                </div>
                </div>
                <div className="col-6">
                <div class="form-group">
                    <select value={FilterKey} onChange={(e)=>{
                        setFilterKey(e.target.value);
                    }} id="" name="" className="form-control">
                        <option value="">All</option>
                        <option value="men's clothing">men's clothing</option>
                        <option value="electronics">electronics</option>
                        <option value="women's clothing">women's clothing</option>
                        <option value="jewelery">jewelery</option>
                    </select>
                </div>
                </div>
            </div>
            <div className="row">
                {
                    Products
                    .filter(obj=>obj.title.toLowerCase().includes(searchKey))
                    .filter(obj=>obj.category.toLowerCase().includes(FilterKey))
                    .map(product => {
                        return (
                            <div className="col-Product-custom  my-2">
                                <div className="card text-center h-100">
                                
                                    <div className="position-relative">
                                        <img className="card-img-top" src={product.image} alt={product.title} height="300px" />
                                        {/* <div class="position-absolute top-0 right-0 pt-3 pr-3">
                                            <button type="button" class="btn btn-sm btn-icon btn-outline-secondary rounded-circle" data-toggle="tooltip" data-placement="top" title="Save for later">
                                                <span class="fas fa-heart btn-icon__inner"></span>
                                            </button>
                                        </div> */}
                                    </div>

                                    <div className="card-body pt-4 px-4 pb-0">
                                        <div className="mb-2">
                                            <a className="d-inline-block text-secondary small font-weight-medium mb-1" href="/">{product.category}</a>
                                            <h3 className="font-size-1 font-weight-normal">
                                                <a className="text-secondary" href="/">{product.title.substr(0,8)}...</a>
                                            </h3>
                                            <div className="d-block font-size-1">
                                                <span className="font-weight-medium"><FaTag size={25} color={Colors.Black}/>${product.price}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="card-footer border-0 pt-0 pb-4 px-4">
                                        <button onClick={()=>addToCart(product)} style={{color:Colors.Light,  background:Colors.BlueLight}} type="button" className="btn  transition-3d-hover">
                                            <FaCartPlus size={25}/> Add to Cart
                                        </button>
                                        <div className="dropdown-divider"></div>
                                        <button 
                                        style={{color:Colors.Light,  background:Colors.BlueLight}}
                                        onClick={()=>addToCart(product)} type="button" className="btn transition-3d-hover">
                                        <a href={"http://localhost:3000/detail/"+product.id} style={{color:Colors.Light,textDecoration:"none"}}><FaInfoCircle size={25}/> View Detail</a>
                                        </button>
                                    </div>
                                </div>
                            </div>

                        )
                    })
                }
                </div>
            </div>)}
        </Layout>
    )
}
export default HomePage;
