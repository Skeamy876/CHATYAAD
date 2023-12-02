import React from 'react';
import { Link } from 'react-router-dom';

const Navbar =() => {
    return (
        <>
        <nav className="navbar bg-body-tertiary text-bg-dark">
            <div className="container-fluid">
                <span className="navbar-brand mb-0 h1 text-light">ChatYaad</span> 
                <Link to="/register" className="btn btn-outline-light">Register</Link>
                <Link to="/" className="btn btn-outline-light">Login</Link>
            </div>
           
        </nav>
        </>
    );
};

export default Navbar;
