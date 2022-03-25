import React from "react";
import { FaFacebook, FaInstagram, FaGooglePlus, FaTwitter, FaLinkedin, FaPinterest } from 'react-icons/fa';
import "../styleSheets/Footer.css"
import {Colors} from "../Colors";

const Footer = () => {
    return (
        <footer class="page-footer font-small pt-4" style={{background:Colors.BlueDark}}>
            <div class="container">
                <ul class="list-unstyled list-inline text-center">
                    <li class="list-inline-item">
                        <a class="btn-floating btn-fb mx-1 text-light" href="/">
                            <FaFacebook size={25}/>
                        </a>
                    </li>
                    <li class="list-inline-item">
                        <a class="btn-floating btn-tw mx-1 text-light" href="/">
                            <FaTwitter size={25}/>
                        </a>
                    </li>
                    <li class="list-inline-item">
                        <a class="btn-floating btn-gplus mx-1 text-light" href="/">
                            <FaGooglePlus size={25}/>
                        </a>
                    </li>
                    <li class="list-inline-item">
                        <a class="btn-floating btn-li mx-1 text-light" href="/">
                            <FaLinkedin size={25}/>                        
                        </a>
                    </li>
                    <li class="list-inline-item">
                        <a class="btn-floating btn-dribbble mx-1 text-light" href="/">
                            <FaInstagram size={25}/>                        
                        </a>
                    </li>
                </ul>
            </div>

            <div class="footer-copyright text-center text-light py-3">© 2022 Copyright 
                <a href="/" style={{textDecoration:"none"}} className="text-light">  shopclone.com</a>
            </div>

        </footer>
    )
}
export default Footer;
