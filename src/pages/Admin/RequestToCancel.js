import React, { useState, useEffect } from "react";
import shopcloneDB from "../../FirebaseConfig";
import {  getDocs, collection, deleteDoc, doc, where, query, setDoc } from "firebase/firestore";
import "../../styleSheets/homaPage.css";
import { FaTag } from "react-icons/fa"
import { useSelector } from "react-redux";
const RequestToCancel = () => {
    const [Products, SetProducts] = useState([]);
    const [SearchKey,setSearchKey] = useState("");
    const [SearchName,setSearchName] = useState("");
    const [SearchId,setSearchId] = useState("");
    const { CartItems } = useSelector(state => state.CartReducer);
    const { user } = JSON.parse(localStorage.getItem("CurrentUser"));

    const userId = user.uid;
    const CurrentUserEmail = user.email;
    const [alert, setAlert] = useState("");
    useEffect(() => {
        getData();
    }, [])
    const getData = async () => {
        const data = await getDocs(collection(shopcloneDB, "OrderCancelRequest"));
        const FinalProducts = [];
        data.forEach(product => {
            const obj = {
                id: product.id,
                ...product.data()
            }
            FinalProducts.push(obj);
        })
        SetProducts(FinalProducts);
        console.log(FinalProducts);

    }
    useEffect(() => {
        localStorage.setItem("CartItems", JSON.stringify(CartItems));
    }, [CartItems]);

    async function DeleteItem(Id) {
        try {
            await deleteDoc(doc(shopcloneDB, "orders",Id));
            console.log("Success");
            getData();
        } catch (err) {
            console.log("Err");
            console.log(err);
            getData();
        }
    }
    async function DeleteItemOrderRequest(id) {
        try {
            const result =await  deleteDoc(doc(shopcloneDB, "OrderCancelRequest", id));
            ;
            console.log(result);
            getData();
        } catch (err) {
            console.log("Err");
            console.log(err);
            getData();
        }
    }
    
    const SendMail =async(product)=>{
        const value = document.getElementById(product.id).value;
        console.log(value);
        try {
            const newData = {
                ...product,
                messages:value
            }
            console.log(newData);
            const result = await setDoc(doc(shopcloneDB, "orders", product.OrderId), newData);
            console.log("success");
            document.getElementById(product.id).value="";
            getData()
        } catch (err) {
            console.log("Err");
            console.log(err);
            getData()
        }
    }
    
    return (
                <div className="row mx-n2 mx-sm-n3 my-5">
                <div className="form-group my-1">
                    <input value={SearchKey} onChange={(e)=>{
                        setSearchKey(e.target.value);
                        setSearchName("");
                        setSearchId("");

                    }} type="text" className="form-control"  placeholder="search product" />
                </div>
                <div className="form-group my-1">
                    <input value={SearchName} onChange={(e)=>{
                        setSearchKey("");
                        setSearchName(e.target.value);
                        setSearchId("");
                    }} type="text" className="form-control"  placeholder="search by id" />
                </div>
                <div className="form-group my-1">
                    <input value={SearchId} onChange={(e)=>{
                        setSearchKey("");
                        setSearchName("");
                        setSearchId(e.target.value);
                    }} type="text" className="form-control"  placeholder="search email" />
                </div>
                
                        {
                        <div className="text-center">
                        <h4>{alert &&  "No order found"}</h4>
                        </div>
                    }
                    { Products.length>-1 && 
                            Products
                            .filter(obj=>obj.product.title.toLowerCase().includes(SearchKey))
                            .filter(obj=>obj.UserName.toLowerCase().includes(SearchName))
                            .filter(obj=>obj.userId.toLowerCase().includes(SearchId))
                            .map(product=>{
                                return <div className="container-fluid my-2" style={{
                                    boxShadow: "0 0 20px 0  black",
                                    borderRadius: "10px",
                                }}>
                                    <div className="row">
                                    <div className="col-4">
                                        <img 
                                        alt={product.product.title}  
                                        src={product.product.image} 
                                        height="200px"
                                        width="200px"
                                        />
                                    </div>
                                     <div className="col-8">
                                        <h3 className="text-center text-info">{product.product.title}</h3>
                                        <h4 className="text-center text-dark"><FaTag size={30} className=" text-primary" /> {product.product.price}</h4>
                                    </div>
                                    </div>
                                    <hr />
                                    <div  className="row text-center">
                                        <div className="col-6">
                                            <strong>cancelation Date </strong> 
                                        </div>
                                        <div className="col-6">
                                            <span>{(new Date(product.time.toDate())).toDateString()}</span>
                                        </div>
                                        <div className="col-6">
                                            <strong>Order Date </strong> 
                                        </div>
                                        <div className="col-6">
                                            <span>{(new Date(product.dateExample.toDate())).toDateString()}</span>
                                        </div>
                                    </div>
                                    <div className="row text-center">
                                    <div className="col-6">
                                        <h5 className="text-center text-warning">Receiver detail</h5>
                                        <h6>Phone No. </h6>{product.DetailedAddress.ParcelReceiverPhoneNo}
                                        <h6>Address </h6>{product.DetailedAddress.parcelAddress}
                                        <h6>Area Pincode </h6>{product.DetailedAddress.parcelPinCode}
                                        <h6>dispatched </h6>{product.dispatched?"yes":"no"}

                                    </div>
                                    <div className="col-6">
                                        <h5 className="text-center text-warning">Sender detail</h5>
                                        <p><h6>Sender Name</h6>
                                            {product.UserName}</p>
                                        <p><h6>Sender Id</h6>
                                            {product.userId}</p>
                                    </div>
                                    </div>
                                    
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-around",
                                        marginBottom: "10px"
                                    }}>
                                        
                                        <button className="btn btn-danger my-3" onClick={() => {
                                            DeleteItem(product.OrderId);
                                        }}>delete OrderDB</button>
                                        <button className="btn btn-danger my-3" onClick={() => {
                                            DeleteItemOrderRequest(product.id);
                                        }}>delete RequestDB</button>
                                        <div className="row">
                                            <div className="col-8 form-group">
                                                <textarea 
                                                rows="5"
                                                className="form-control" 
                                                id={product.id}
                                                >
                                                </textarea>
                                            </div>
                                            <div className="col-4 form-group">
                                            <button className="btn btn-info form-control" 
                                                onClick={() => {
                                                SendMail(product);
                                                }}>
                                                Send Message  
                                                </button>
                                            </div>
                                            
                                        </div>
                                        
                                    </div>
                                    
                                </div>
                            })
                        }
                </div>
    )
}
export default RequestToCancel;
