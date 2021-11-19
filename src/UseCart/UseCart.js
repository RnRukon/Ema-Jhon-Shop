import { useState, useEffect } from 'react';
import { getStoredCart } from '../utilities/fakedb';


const UseCart = () => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCart = getStoredCart();
        const keys = Object.keys(savedCart);
        fetch('https://salty-retreat-38168.herokuapp.com/products/bykeys', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(keys)
        })
            .then(res => res.json())
            .then(products => {
                // console.log(products);


                if (products.length) {
                    const storedCart = [];
                    for (const key in savedCart) {
                        const addedProduct = products.find(product => product.key === key);
                        if (addedProduct) {
                            const quantity = savedCart[key];
                            addedProduct.quantity = quantity;
                            storedCart.push(addedProduct);
                        }
                    }
                    setCart(storedCart)
                }
            })

    }, [])

    return [cart, setCart]
};

export default UseCart;