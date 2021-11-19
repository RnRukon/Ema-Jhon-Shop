import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import useAuth from '../../Hooks/useContext';

const Orders = () => {
    const { user } = useAuth()
    const history = useHistory()
    const [orders, setOrders] = useState([]) || "";
    useEffect(() => {
        fetch(`https://salty-retreat-38168.herokuapp.com/orders?email=${user.email}`, {
            headers: {
                'authorization': `Bearer ${localStorage.getItem('idToken')}`
            }
        })
            .then(res => {
                if (res.status === 200) {
                    return res.json();
                } else if (res.status === 401) {
                    history.push('/login')
                }
            })
            .then(data => setOrders(data))
    }, [user.email])
    return (
        <div>
            {/* <h2>My Orders {orders.length}</h2> */}
            {
                orders.map(order => <div key={order._id}>
                    <h1>{order.firstName}</h1>
                    <small>{order.email}</small>
                </div>)

            }
        </div>
    );
};

export default Orders;