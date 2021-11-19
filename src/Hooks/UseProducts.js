import { useEffect, useState } from "react";


const UseProducts = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch('https://salty-retreat-38168.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setProducts(data.products))
    }, []);

    return [products, setProducts];


};

export default UseProducts;