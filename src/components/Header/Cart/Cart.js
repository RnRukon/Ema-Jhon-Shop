import React from 'react';
const Cart = (props) => {

    const { cart } = props;
    let totalQuantity = 0;
    let total = 0;
    for (const product of cart) {
        if (!product.quantity) {
            product.quantity = 1;
        }
        total = total + product.price * product.quantity;
        totalQuantity = totalQuantity + product.quantity;
    }
    // const totalReducer = (previous, product) => previous + product.price;
    // const total = cart.reduce(totalReducer, 0);

    const shipping = total > 0.10 ? 15 : 0;
    const tax = (total + shipping) * 0.10;
    const grandtotal = total + shipping + tax;

    return (
        <div>
            <h3>Oder Summary</h3>
            <h5>Items Ordered: {totalQuantity} </h5>
            <p>Total: {total.toFixed(2)}</p>
            <p>Shipping: {shipping.toFixed(2)}</p>
            <p>tax: {tax.toFixed(2)}</p>
            <p>grandtotal: {grandtotal.toFixed(2)}</p>
        </div>
    );
};

export default Cart;