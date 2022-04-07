import React from "react";
import "../styleSheets/Header.css"
import { useSelector } from "react-redux";
import { FaSignOutAlt, FaJediOrder, FaCartArrowDown } from "react-icons/fa";
import { Colors, Font } from "../Colors";
import ResetPass from "./ResetPass";
import { AdminEmail } from "./Credentials";
import { ToastContainer, toast } from 'react-toastify';

const Header = () => {
  const { CartItems } = useSelector(state => state.CartReducer);
  const { user } = JSON.parse(localStorage.getItem("CurrentUser")) ? JSON.parse(localStorage.getItem("CurrentUser")) : "";
  const email = user ? user.email : "";
  console.log(user)
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light  py-2 px-3 shadow-sm sticky-top"
        style={{ background: Colors.secondary }}>
        <div class="container-fluid">
          <a class="navbar-brand" href="/" style={{ color: Colors.primary, fontFamily: Font, fontWeight: "Bold" }}>
            <FaJediOrder size={50} />shopclone {email === AdminEmail ? " Admin" : ""}</a>
        
          <div className="d-flex justify-content-end align-items-end flex-direction-row">
          {!user && <button className="btn mx-1 "
            style={{ background: Colors.primary, color: Colors.secondary }}
            onClick={() => window.location.href = "/login"}
          >SignIn</button>}
          {!user && <button className="btn mx-1"
            style={{ background: Colors.primary, color: Colors.secondary }}
            onClick={() => window.location.href = "/register"}
          >SignUp</button>}
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          </div>
          
          <div class="collapse navbar-collapse Header_Menu_div" id="navbarNavDropdown">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a style={{ color: Colors.Gray, fontFamily: Font, fontWeight: "Bold" }} class="nav-link active" aria-current="page" href="/">Home</a>
              </li>
              {user && <>
                <li class="nav-item">
                  <a style={{ color: Colors.Gray, fontFamily: Font, fontWeight: "Bold" }} class="nav-link" href="/order">orders</a>
                </li>
                <li class="nav-item">
                  <a style={{ color: Colors.Gray, fontFamily: Font, fontWeight: "Bold" }} class="nav-link" href="/cart"><FaCartArrowDown size={20} />{CartItems.length}</a>
                </li>
                <li class="nav-item">
                  <span style={{ color: Colors.Gray, fontFamily: Font, fontWeight: "Bold" }}
                    class="nav-link"
                    data-bs-toggle="modal" data-bs-target="#exampleModal"
                  >Profile</span>
                  <ResetPass />
                </li>
                <li class="nav-item">
                  {email === AdminEmail ? <span class="nav-link">
                    <a style={{ color: Colors.Gray, fontFamily: Font, fontWeight: "Bold", padding: 0 }} class="nav-link" href="/admin"> Products</a>
                  </span> : ""}
                </li>
                <li class="nav-item">
                  <span style={{ color: Colors.Gray, fontFamily: Font, fontWeight: "Bold" }} class="nav-link">
                    <FaSignOutAlt
                      size={25}
                      onClick={() => {
                        localStorage.removeItem("CurrentUser")
                        localStorage.removeItem("currentUserCredentials");
                        window.location.href = "/login"
                      }} />
                  </span>
                </li></>}
            </ul>
          </div>

        </div>
        
      </nav>
      
    </>
  )
}

export default Header;
