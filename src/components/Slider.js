import React from "react";
import { Carousel } from "react-bootstrap";
import { Colors } from "../Colors";

const Slider = (props) => {
    const {images} = props
    return (
        <div className="row">
            <div className="col-12">
                <Carousel fade interval={3000} prevLabel="" nextLabel="">
                    <Carousel.Item>
                        <img
                            className={props.height?"d-block w-100":"d-block w-100 img-fluid"}
                            height={props.height?props.height:"auto"}
                            width={props.width?props.width:"100%"}
                            src={images[0]}
                            alt="First slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className={props.height?"d-block w-100":"d-block w-100 img-fluid"}
                            height={props.height?props.height:"auto"}
                            width={props.width?props.width:"100%"}                            src={images[1]}
                            alt="Second slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className={props.height?"d-block w-100":"d-block w-100 img-fluid"}
                            height={props.height?props.height:"auto"}
                            width={props.width?props.width:"100%"}                            src={images[2]}
                            alt="Third slide"
                        />

                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className={props.height?"d-block w-100":"d-block w-100 img-fluid"}
                            height={props.height?props.height:"auto"}
                            width={props.width?props.width:"100%"}
                            src={images[3]}
                            alt="Third slide"
                        />
                    </Carousel.Item>
                </Carousel>
            </div>
        </div>
    )
}
export default Slider;
