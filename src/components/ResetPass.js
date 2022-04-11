import React from "react";
import "../styleSheets/Header.css"
import { Colors } from "../Colors";
import { getAuth, sendPasswordResetEmail, deleteUser, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import {AdminEmail} from "./Credentials";
const ResetPass = () => {
    const { user } = JSON.parse(localStorage.getItem("CurrentUser"));
    const email = user.email;
    const auth = getAuth();
    const onResetPass = async () => {
        return sendPasswordResetEmail(auth, email)
    }
    const CurrentUser = auth.currentUser;
    const DeleteAccount = () => {
        const {user} = JSON.parse(localStorage.getItem("CurrentUser"));
        const displayName = user.displayName
        console.log(displayName);
        const data = localStorage.getItem("currentUserCredentials");
        const { email, Pass } = JSON.parse(data)

        const credential = EmailAuthProvider.credential(
            email,
            Pass
        );
        reauthenticateWithCredential(CurrentUser, credential).then((res) => {
            deleteUser(CurrentUser).then(() => {
                alert("user deleted.")
            }).catch((error) => {
                alert(error, "user deleted.")
            });
            console.log(res)
        }).catch((error) => {
            console.log(error)
        });
    }
    return (
        <div className="modal fade" style={{zIndex:"+1"}} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel" style={{ color: Colors.primary }}>Reset password</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <h3 style={{ color: Colors.Gray }}>{email}</h3>
                            <button
                            onClick={() => {
                                onResetPass()
                            }}
                            className="btn" style={{ background: Colors.primary, color: Colors.secondary }}>
                            Reset Password</button>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button 
                        data-bs-toggle="modal" data-bs-target="#exampleModal"
                        type="button" className="btn btn-secondary" style={{ background: Colors.third, color: Colors.secondary }}>Close</button>
                       {email ===AdminEmail ?"":<button
                            onClick={() => {
                                DeleteAccount()
                            }}
                            type="button"
                            className="btn btn-danger" data-bs-dismiss="modal" >Delete Account</button>
                       }
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPass;
