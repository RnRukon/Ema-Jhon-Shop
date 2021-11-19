import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UseCart from '../../UseCart/UseCart';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Header/Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {

    const [products, setProducts] = useState([]);
    const [cart, setCart] = UseCart();
    const [displayProducts, setDisplayProducts] = useState([])
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(0);
    const size = 10;
    useEffect(() => {
        fetch(`https://salty-retreat-38168.herokuapp.com/products?page=${page}&&size=${size}`)
            .then(res => res.json())
            .then(data => {
                setProducts(data.products)
                setDisplayProducts(data.products);
                const count = data.count;
                const pageNumber = Math.ceil(count / size);
                setPageCount(pageNumber)
            })
    }, [page])

    useEffect(() => {

        if (products.length) {
            const savedCart = getStoredCart();
            const storedCart = [];
            for (const key in savedCart) {
                // console.log(key)
                const addedProduct = products.find(product => product.key === key);
                if (addedProduct) {
                    const quantity = savedCart[key];
                    addedProduct.quantity = quantity;
                    storedCart.push(addedProduct);

                }
            }
            setCart(storedCart);
        }
    }, [products, setCart])

    //add to cart---------------
    const handleAddToCart = product => {

        const exists = cart.find(pd => pd.key === product.key);
        let newCart = [];
        if (exists) {
            const rest = cart.filter(pd => pd.key !== product.key);
            exists.quantity = exists.quantity + 1;
            newCart = [...rest, product];
        } else {
            product.quantity = 1;
            newCart = [...cart, product]
        }


        setCart(newCart);
        //save to localStorage
        addToDb(product.key)

    }
    const handleSearch = event => {

        const searchText = event.target.value;
        const matchedProducts = products.filter(product => product.name.toLowerCase().includes(searchText.toLowerCase()));
        setDisplayProducts(matchedProducts);

    }

    return (
        <div>
            <div className="search-container">
                <input
                    onChange={handleSearch}
                    placeholder="Search Product"
                    type="text"
                />
            </div>
            <div className="shop-container">
                <div className="cart-container">
                    {
                        displayProducts.map(product => <Product
                            key={product.key}
                            product={product}
                            handleAddToCart={handleAddToCart}

                        ></Product>)
                    }

                    {/* pagination========================= */}
                    <div className="pagination">
                        {
                            [...Array(pageCount).keys()].map(number => <button
                                className={number === page ? 'selected' : ''}
                                key={number}
                                onClick={() => setPage(number)}
                            >{number + 1}</button>)
                        }
                        {/*================================  */}

                    </div>
                </div>
                <div className=" product-container">
                    <Cart cart={cart}>
                        <Link to="/review"><button className="btn-regular">Order Review </button></Link>
                    </Cart>
                </div>
            </div>
        </div>
    );
};

export default Shop;