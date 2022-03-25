import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import shopcloneDB from "../../FirebaseConfig";
import { REMOVE_TO_CART } from "../../redux/Actions/Action";

const TotalAndModal = (props) => {
    const [show, setShow] = useState(false);
    const Dispatch = useDispatch();
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [pinCode, setPinCode] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { CartItems } = useSelector(state => state.CartReducer);

    const onClickSubmit = async () => {
        const DetailedAddress = {
            parcelto: name,
            parcelAddress: address,
            parcelPinCode: pinCode,
            ParcelReceiverPhoneNo: phoneNumber
        }
        const { user } = JSON.parse(localStorage.getItem("CurrentUser"));
        const UserName = user.email;
        const id = user.uid;

       
        CartItems.forEach(async (product)=>{
            const orderInfo = {
                product,
                DetailedAddress,
                UserName,
                userId: id,
                dateExample: Timestamp.fromDate(new Date("December 10, 1815")),
                dispatched:false,
                track:[],
            }
            try{
                const result = await addDoc(collection(shopcloneDB, "orders"), orderInfo);
                console.log(result);
                alert("order Successfully placed.");
                CartItems.forEach(item => {
                    Dispatch({type:REMOVE_TO_CART,payload:item.tempId})
                });
            }catch(Err){
                console.log(Err);
                alert("Error while placing order.");
            }
        })
    }
    return (
        <div>
            <div className="row my-3">
                <div className="col-12 text-center text-primary">
                {props.total!==0 && <h5>Total : ${props.total}</h5>}
                </div>
            </div>
            <div className="row my-3">
                <div className="col-12 text-center">
                {props.total===0 && <div className="text-center">
                    <h2>Cart is empty</h2>
                    <a href="/"><h4>Shop Now!</h4></a>
                </div>}
                    {props.total!==0 && <button className="btn btn-group-lg btn-info" onClick={handleShow}>
                        Place Order
                    </button>}
                </div>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Address</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Name</label>
                            <input onChange={(e) => setName(e.target.value)} type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter name" />
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Address</label>
                            <textarea onChange={(e) => setAddress(e.target.value)}
                                rows="5" cols="20" class="form-control" id="exampleInputPassword1"
                                placeholder="enter address">
                            </textarea>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">pinCode</label>
                            <input onChange={(e) => setPinCode(e.target.value)} type="number"
                                class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                placeholder="Enter area Pincode" />
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">phoneNumber</label>
                            <input onChange={(e) => setPhoneNumber(e.target.value)}
                                type="number" class="form-control"
                                id="exampleInputPassword1" placeholder="Enter Phone Number" />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => {
                        onClickSubmit()
                        handleClose()
                    }}>
                        Order
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default TotalAndModal;
