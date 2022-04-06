import React from "react";
import { FaFacebook, FaInstagram, FaGooglePlus, FaTwitter, FaLinkedin, FaPinterest } from 'react-icons/fa';
import "../styleSheets/Footer.css"
import {Colors} from "../Colors";
import {FaCheck} from "react-icons/fa";
const LocationTrack = (props) => {
    const product = props.product
    return (
        <div className="text-center">
            <strong style={{color:Colors.primary}}>Location tracker</strong>
            <div style={{overflowX:"scroll", color:Colors.Gray}}>

                                    <ul class="list-group list-group-horizontal text-center">
                                    {
                                        product.track.map((loc, idx)=>{
                                            return  <li class="list-group-item text-success"><FaCheck size={25}/>{loc}</li>

                                        })
                                    }
            </ul>
            </div>
        </div>
    )
}
export default LocationTrack;
