import React, { useState } from "react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import "../styleSheets/LoginCss.css";
import { Colors } from "../Colors";
const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [Pass, setPass] = useState("");
    const [name, setName] = useState("");

    const auth = getAuth();
    const onClickSubmit = async () => {
        try {
            const result = await createUserWithEmailAndPassword(auth,
                email, Pass, name
            )
            console.log(result);
            alert("success");
        } catch (err) {
            alert("Error");
            console.log(err);

        }
        alert(email + ' ' + Pass);
    }
    return (
        <div className="Register_Row" style={{ background: `linear-gradient(-70deg, ${Colors.BlueLight} 60%, ${Colors.Light} 60%)`}}>
            <div className="col-8 Register_Col-10">
                <div className="Register-Heading">
                    <text style={{ color: Colors.BlueDim }}>Sign up</text>
                </div>
                <div className="Register-image" >
                    <lottie-player src="https://assets9.lottiefiles.com/packages/lf20_ho1lpikf.json" background="transparent" speed="1" style={{ width: "100%", height: "80%" }} loop autoplay></lottie-player>
                </div>
                <div className="Register-form">
                    <div className="Register-form-contents">
                        <div class="form-group my-1" >
                            <label style={{ color: Colors.Black }}>Name</label>
                            <input value={name} onChange={(e) => setName(e.target.value)} type="text" class="form-control" placeholder="Enter email" />
                        </div>
                        <div class="form-group my-1">
                            <label style={{ color: Colors.Black }}>Email address</label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" class="form-control" placeholder="Enter email" />
                        </div>
                        <div class="form-group my-1">
                            <label style={{ color: Colors.Black }}>Password</label>
                            <input value={Pass} onChange={(e) => setPass(e.target.value)} type="password" class="form-control ali" />
                        </div>
                        <button onClick={() => onClickSubmit()} type="button" class="btn my-2" style={{ background: Colors.BlueDim, color: Colors.Light }}>Submit</button>
                        <a style={{ color: Colors.Black }} href="/login">Login here</a>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default RegisterPage;
