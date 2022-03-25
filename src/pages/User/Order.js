import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
// import { data } from "../data";
import { Colors } from "../../Colors";
import shopcloneDB from "../../FirebaseConfig";
import { getDocs, collection, where, doc, query, deleteDoc, addDoc, Timestamp } from "firebase/firestore";
import "../../styleSheets/homaPage.css";
import { FaTag, FaCheck, FaClock } from "react-icons/fa"
import { useSelector } from "react-redux";
import Loader from "../../components/Loader";
import LocationTrack from "../../components/LocationTrack";
const HomePage = () => {
    const [Products, SetProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { CartItems } = useSelector(state => state.CartReducer);
    const { user } = JSON.parse(localStorage.getItem("CurrentUser"));
    const [alert, setAlert] = useState("");
    const userId = user.uid;
    useEffect(() => {
        getData();
    }, [])
    const getData = async () => {
        const data = await getDocs(query(collection(shopcloneDB, "orders"), where("userId", "==", userId)));
        const FinalProducts = [];
        data.forEach(product => {
            const data = {
                id: product.id,
                ...product.data()
            }
            FinalProducts.push(data);
        })
        SetProducts(FinalProducts);
        console.log(Products);
        setLoading(false);
    }
    useEffect(() => {
        localStorage.setItem("CartItems", JSON.stringify(CartItems));
    }, [CartItems]);

    async function DeleteItem(product) {
        const OrderId = product.id;
        const clone = (({ id, ...o }) => o)(product);
        const newData = {
            ...clone,
            time: new Date(),
            OrderId,
            messages: "",
        }
        console.log(newData);
        try {
            const data = await addDoc(collection(shopcloneDB, "OrderCancelRequest"), newData);
            console.log("trydata")
            console.log(data);
        } catch (Err) {
            console.log(Err);
        }
    }

    return (
        <Layout>
            {loading ? (
                <div className="row">
                    <div className="col-12  text-center">
                        <Loader />
                    </div>
                </div>
            ) : (
                <div className="row mx-n2 mx-sm-n3 my-5">
                    {
                        <div className="text-center">
                            <h4>{alert && "No order found"}</h4>
                        </div>
                    }
                    {
                        Products.length > -1 && Products.map((product, index) => {
                            return <div className="container-fluid my-3" style={{ boxShadow: "rgba(0, 0, 0, 0.45) 0px 25px 20px -20px" }}>
                                <div className="row" >
                                    <div className="col-4">
                                        <img src={product.product.image} height={"100px"} alt={product.product.title} />
                                    </div>
                                    <div className="col-8">
                                        <h3 className="text-center" style={{ color: Colors.BlueDark }}>{product.product.title}</h3>
                                        <h4 className="text-center "><FaTag size={30} style={{ color: Colors.Black }} /> {product.product.price}</h4>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-12 text-center">
                                        <strong>product Id  </strong>{product.product.id}
                                    </div>
                                    <div className="col-12 text-center">
                                        <strong>order Id    </strong> {product.id}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6 text-center">
                                        <h5 className="text-center" style={{ color: Colors.BlueDim }}>Receiver detail</h5>
                                        <hr />
                                        <h6>Phone No. </h6><p>{product.DetailedAddress.ParcelReceiverPhoneNo}</p>
                                        <h6>Address </h6><p>{product.DetailedAddress.parcelAddress}</p>
                                        <h6>Area Pincode </h6><p>{product.DetailedAddress.parcelPinCode}</p>
                                        <h6>dispatched </h6><p>{product.dispatched ? <FaCheck size={30} color="green" values="yes" /> : <FaClock size={30} color="yellow" values="pending" />}</p>
                                    </div>
                                    <div className="col-6 text-center">
                                        <h5 className="text-center" style={{ color: Colors.BlueDim }}>Sender detail</h5>
                                        <hr />
                                        <h6>Sender Name</h6>
                                        <p>{product.UserName}</p>
                                        <h6>Sender Id</h6>
                                        <p>{product.userId.substr(0, userId.length / 2)}   {product.userId.substr(userId.length / 2, userId.length)}</p>
                                    </div>
                                </div>
                                <div className="row my-3" >
                                    <div className="col-8 m-auto"  style={{overflowX:"scroll"}}>
                                        {product.track.length>0 && <LocationTrack product={product} />}
                                    </div>
                                </div>
                                <div className="row my-3" style={{ color: Colors.Black }} >
                                    <div className="col-12 text-center">
                                        {product.messages ? <>
                                            <strong style={{ color: Colors.BlueDim }}>
                                                Request cancelation response</strong>
                                            <br /> {product.messages}</> : ""}
                                    </div>
                                </div>
                                <div style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "center",
                                    marginBottom: "10px"
                                }}>

                                    <button className="btn btn-danger" onClick={() => {
                                        DeleteItem(product);
                                    }}>Request to cancel</button>
                                </div>
                                <br />
                            </div>
                        })
                    }
                </div>)
            }
        </Layout>
    )
}
export default HomePage;
