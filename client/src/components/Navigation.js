import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/logo.png';

function Navigation() {
  return (
    <nav className="nav">
      <Link to="/">
        <img src={logo} alt="" style={{ width: '60px' }} />
      </Link>
      <ul>
        <li>
          <Link to="/products" className="link">
            All products
          </Link>
        </li>
        <li>
          <Link to="/admin" className="link">
            Admin
          </Link>
        </li>
        <li>
          <Link to="/register" className="link">
            Register
          </Link>
        </li>
        <li>
          <Link to="/login" className="link">
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
