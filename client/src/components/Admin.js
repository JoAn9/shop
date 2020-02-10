import React from 'react';
import { Link } from 'react-router-dom';

function Admin() {
  // @add contex to check if authenticated
  return (
    <ul>
      <li>
        <Link to="/admin/products">Add new product</Link>
      </li>
    </ul>
  );
}

export default Admin;
