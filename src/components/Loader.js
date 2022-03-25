import React from "react";

const Loader = () => {
    return (
        <div style={{
            height: "1000px",
            width: "100%",
            lineHeight: "500px",
        }}>
            <div class="spinner-grow" style={{ width: "1rem", height: "1rem" }} variant="info" role="status">
            </div>
            <div class="spinner-grow" style={{ width: "1rem", height: "1rem" }} variant="info" role="status">
            </div><div class="spinner-grow" style={{ width: "1rem", height: "1rem" }}  variant="info" role="status">
            </div><div class="spinner-grow" style={{ width: "1rem", height: "1rem" }} variant="info" role="status">
            </div><div class="spinner-grow" style={{ width: "1rem", height: "1rem" }} variant="info" role="status">
            </div>
        </div>
    )
}
export default Loader;
