import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/logo.png';
import { AuthContext } from '../App';
import { LOGOUT } from '../actions/types';

function Navigation() {
  const { state, dispatch } = useContext(AuthContext);

  const handleLogout = () => {
    dispatch({
      type: LOGOUT,
    });
  };

  const login = (
    <li>
      <Link to="/auth/user" className="link">
        Login
      </Link>
    </li>
  );

  const logout = (
    <li>
      <a href="/logout" onClick={handleLogout} className="link">
        Logout
      </a>
    </li>
  );

  const { userIsAuthenticated, adminIsAuthenticated } = state;

  return (
    <nav className="nav">
      <Link to="/" className="logo">
        <img src={logo} alt="" style={{ width: '60px' }} />
      </Link>
      <ul>
        <li>
          <Link to="/products" className="link">
            All products
          </Link>
        </li>
        <li>
          <Link to="/questionnaire" className="link">
            Questionnaire
          </Link>
        </li>
        <li>
          <Link to="/auth/admin" className="link">
            Admin
          </Link>
        </li>
        <li>
          <Link to="/users" className="link">
            Register
          </Link>
        </li>
        {adminIsAuthenticated || userIsAuthenticated ? logout : login}
      </ul>
    </nav>
  );
}

export default Navigation;
