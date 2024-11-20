import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import "./assets/styles/layout.css";
import AuthContext from '../../context/AuthProvider';


const Logo = () => {
    const { auth } = useContext(AuthContext);

    return (
        <>
            <Link className="navbar-brand-ext" to={auth.isAuthenticated ? '/home' : '/'}>
                <div className="binge-logo">
                    <span className='bin'>Bin</span><span className='ge'>ge</span>
                </div>
            </Link>
        </>
    )
}

export default Logo