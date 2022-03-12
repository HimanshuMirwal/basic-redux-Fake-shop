import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const ProductComponent = () => {
  const Products = useSelector((state) => state.allProducts.products);
  const renderList = Products.map((product) => {
    const { id, image, title, price, category } = product;
    return <div className="four wide column" key={id} id={id}>        
    <Link className="ui link" to={`/product/` + id}>
      <div className="ui link cards ">
        <div className="card">
          <div className="ui image medium centred">
            <img src={image} alt={title} />
          </div>
          <div className="content">
            <div className="header">{title}</div>
            <div className="meta price">$ {price}</div>
            <div className="meta category">{category}</div>
          </div>
        </div>
      </div>
    </Link>
    </div>
  })
  return (
    <>
      {renderList}
    </>
  )
}
export default ProductComponent;
