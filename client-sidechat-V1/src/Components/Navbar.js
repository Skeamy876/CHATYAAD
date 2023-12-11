import React from 'react';
import { Link } from 'react-router-dom';

const Navbar =() => {
    return (
        <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary text-bg-dark">
            <div className="container">
                <span className="navbar-brand mb-0 h1 text-light">ChatYaad</span> 
                <div className="d-flex">
                    <Link to="/" className="btn btn-outline-light me-2">Register</Link>
                    <Link to="/login" className="btn btn-outline-light">Login</Link>
                </div>
            </div>
        </nav>
        </>
    );
};

export default Navbar;
