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
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel" style={{ color: Colors.primary }}>Reset password</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <h3 style={{ color: Colors.Gray }}>{email}</h3>
                            <button
                            onClick={() => {
                                onResetPass()
                            }}
                            class="btn" style={{ background: Colors.primary, color: Colors.secondary }}>
                            Reset Password</button>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" style={{ background: Colors.third, color: Colors.secondary }}>Close</button>
                       {email ===AdminEmail ?"":<button
                            onClick={() => {
                                DeleteAccount()
                            }}
                            type="button"
                            class="btn btn-danger" data-bs-dismiss="modal" >Delete Account</button>
                       }
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPass;
