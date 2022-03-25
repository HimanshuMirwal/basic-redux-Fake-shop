import React from "react";
import "../styleSheets/Header.css"
import {useSelector} from "react-redux";
import {FaSignOutAlt, FaJediOrder,FaCartArrowDown} from "react-icons/fa";
import {Colors} from "../Colors";

const Header=()=>{
        const {CartItems}=useSelector(state=>state.CartReducer);
        const {user} = JSON.parse(localStorage.getItem("CurrentUser"));
        const email = user.email;
        return (
            <nav class="navbar navbar-expand-lg navbar-light  Header_Padding" 
            style={{background:Colors.BlueDim}}>
            <div class="container-fluid">
              <a class="navbar-brand" href="/" style={{color:Colors.BlueDark}}><FaJediOrder size={50}/>shopclone {email==="himanshumirwal@gmail.com"?" Admin":""}</a>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse Header_Menu_div" id="navbarNavDropdown">
                <ul class="navbar-nav">
                  <li class="nav-item">
                    <a style={{color:Colors.Light}} class="nav-link active" aria-current="page" href="/">Home</a>
                  </li>
                  <li class="nav-item">
                    <a style={{color:Colors.Light}} class="nav-link" href="/order">orders</a>
                  </li>
                  <li class="nav-item">
                    <a style={{color:Colors.Light}} class="nav-link" href="/cart"><FaCartArrowDown size={20}/>{CartItems.length}</a>
                  </li>
                  <li class="nav-item">
                    <span style={{color:Colors.Light}} class="nav-link">{email}</span>
                  </li>
                  <li class="nav-item">
                  {email==="himanshumirwal@gmail.com"?<span class="nav-link">
                    <a style={{color:Colors.Light, padding:0}} class="nav-link" href="/admin"> Admin</a>
                    </span>:""}
                  </li>
                  <li class="nav-item">
                    <span style={{color:Colors.Light}} class="nav-link">
                      <FaSignOutAlt onClick={()=>{
                        localStorage.removeItem("CurrentUser")
                        window.location.href="/login"
                        }}/>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        ) 
    }
export default Header;
