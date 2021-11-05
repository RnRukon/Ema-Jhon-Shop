import React from 'react';
import { useHistory } from 'react-router-dom';
import UseCart from '../../UseCart/UseCart';
import { removeFromDb } from '../../utilities/fakedb';
import Cart from '../Header/Cart/Cart';
import ReviewItems from '../ReviewItems/ReviewItems';

const OrderReview = () => {

    const [cart, setCart] = UseCart();
    const history = useHistory()
    const handleRemove = key => {
        const newCart = cart.filter(product => product.key !== key);
        setCart(newCart);
        removeFromDb(key)

    }

    // Handle Place order--------------------
    const handlePlaceOrder = () => {
        history.push('/placeorder')
        setCart([]);

    }

    return (
        <div className="shop-container">
            <div className="cart-container">
                {
                    cart.map(product => <ReviewItems key={product.key} product={product} handleRemove={handleRemove}></ReviewItems>)
                }
            </div>
            <div className="product-container">
                <Cart cart={cart}>
                    <button onClick={handlePlaceOrder} className="btn-regular">Place Order</button>
                </Cart>
            </div>

        </div>
    );
};

export default OrderReview;