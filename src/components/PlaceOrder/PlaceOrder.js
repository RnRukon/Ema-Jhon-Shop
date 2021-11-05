import React from 'react';
import './PlascesOrder.css'
import { useForm } from "react-hook-form";
import { clearTheCart, getStoredCart } from '../../utilities/fakedb';


const PlaceOrder = () => {

    const { register, handleSubmit, reset } = useForm();
    const onSubmit = data => {
        const savedCart = getStoredCart();
        data.order = savedCart;
        fetch('http://localhost:5000/orders', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {
                if (result.insertedId) {
                    alert('Order processed successfully')
                    reset();
                    clearTheCart()
                }
            })

    }


    return (
        <div style={{ textAlign: 'center' }}>
            <form onSubmit={handleSubmit(onSubmit)} className="register-form">
                <input {...register("firstName", { required: true, maxLength: 30 })} placeholder='Full name' /> <br />
                <input {...register("email", { required: true })} placeholder="Email" /> <br />
                <input {...register("address", { required: true })} placeholder="Address" /> <br />
                <input {...register("city", { required: true })} placeholder="City" /> <br />
                <input type="number" {...register("Phone")} placeholder="Phone number" /> <br />
                <input type="submit" />
            </form>
        </div>
    );
};

export default PlaceOrder;