import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './Product.css';
import Rating from 'react-rating'


const Product = (props) => {
    const element = <FontAwesomeIcon icon={faShoppingCart} />
    const { name, img, seller, price, stock, star } = props.product;
    return (
        <div className="product">
            <div>
                <img src={img} alt="" />
            </div>
            <div>
                <h3 className="productName">{name}</h3>
                <p><small>By: {seller}</small></p>
                <p>Price: {price}</p>
                <p><small>Only {stock} left in stock -order soon</small></p>
                <Rating
                    initialRating={star}
                    emptySymbol="far fa-star rating-color"
                    fullSymbol=" fas fa-star rating-color"
                    readonly
                ></Rating><br />
                <button onClick={() => props.handleAddToCart(props.product)} className="btn-regular">{element} Add to cart</button>
            </div>
        </div>
    );
};

export default Product;
