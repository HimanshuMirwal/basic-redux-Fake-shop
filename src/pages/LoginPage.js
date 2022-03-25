import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import "../styleSheets/LoginCss.css";
import { Colors } from "../Colors";
const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [Pass, setPass] = useState("");
    const auth = getAuth();
    const onClickSubmit = async () => {
        try {
            const result = await signInWithEmailAndPassword(auth,
                email, Pass
            )
            console.log(result);
            localStorage.setItem("CurrentUser", JSON.stringify(result));
            alert("success");
            window.location.href = "/";
        } catch (err) {
            alert("Error");
        }
        alert(email + ' ' + Pass);
    }
    return (
        <div className="Register_Row" style={{ background: `linear-gradient(-140deg, ${Colors.BlueLight} 60%, ${Colors.Light} 60%)`}}>
            <div className="col-8 Register_Col-10">
                <div className="Register-Heading">
                    <text style={{ color: Colors.BlueDim }}>Login</text>
                </div>
                <div className="Register-image" >
                    <lottie-player src="https://assets3.lottiefiles.com/packages/lf20_57TxAX.json" background="transparent" speed="1" style={{ width: "100%", height: "80%" }} loop autoplay></lottie-player>
                </div>
                <div className="Register-form ">

                    <div className="Register-form-contents" style={{ margin: "20px 0" }}>
                        <div class="form-group my-1">
                            <label style={{ color: Colors.Black }}>Email address</label>
                            <input onChange={(e) => setEmail(e.target.value)} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                        </div>
                        <div class="form-group my-1">
                            <label style={{ color: Colors.Black }}>Password</label>
                            <input onChange={(e) => setPass(e.target.value)} type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
                        </div>
                        <button style={{ color: Colors.Light, backgroundColor: Colors.BlueDim, margin: "20px 0" }} onClick={() => onClickSubmit()} type="button" class="btn">Login</button>
                        <a style={{ color: Colors.Black }} href="/register">Signup here</a>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default LoginPage;
