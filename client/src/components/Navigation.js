import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <h1>
        <a href="/">Cool Page</a>
      </h1>
      <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/products">All products</Link>
        </li>
        <li>
          <Link to="/admin">Admin</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
