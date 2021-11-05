import React from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../../Hooks/useContext';
import logo from '../../images/logo.png';
import './Header.css';

const Header = () => {
    const { user, logOut } = useAuth();
    return (
        <div className="header">
            <img className="logo" src={logo} alt="" />
            <nav>
                <NavLink activeStyle={{ color: 'red', fontWeight: 'bold' }} to="/shop">Shop</NavLink>
                <NavLink activeStyle={{ color: 'red', fontWeight: 'bold' }} to="/review">Order Review</NavLink>
                <NavLink activeStyle={{ color: 'red', fontWeight: 'bold' }} to="/orders">Orders</NavLink>
                <NavLink activeStyle={{ color: 'red', fontWeight: 'bold' }} to="/inventory">Manage Inventory</NavLink>
                {
                    user.email ?
                        <span>
                            {user.displayName && <span style={{
                                color: 'white',
                                fontWeight: 'bold',
                                cursor: 'pointer'
                            }}>
                                {user.displayName}</span>}
                            <button style={{
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                marginLeft: '10px'

                            }}
                                className="btn-regular" onClick={logOut} >Logout</button>
                        </span>
                        :
                        <span><NavLink activeStyle={{ color: 'red', fontWeight: 'bold' }} to="/login">Login</NavLink> </span>}
                <img style={{ height: '35px', width: '35px', borderRadius: '50%' }} src={user.photoURL ? user.photoURL : 'https://img.icons8.com/bubbles/50/000000/user.png'} alt="" />
            </nav>
        </div>
    );
};

export default Header;