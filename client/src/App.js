import React, { useEffect, createContext, useReducer } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './components/Landing';
import Navigation from './components/Navigation';
import Admin from './components/Admin';
import Login from './components/Login';
import Register from './components/Register';
import Logout from './components/Logout';
import Products from './components/Products';
import AddProduct from './components/AddProduct';
import UserPanel from './components/UserPanel';
import Questionnaire from './components/Questionnaire';
import ProductItem from './components/ProductItem';
import { LOGIN_ADMIN_SUCCESS, LOGIN_USER_SUCCESS, LOGOUT } from './store/types';
import './App.css';

export const AuthContext = createContext();

const initialState = {
  userIsAuthenticated: false,
  adminIsAuthenticated: false,
  tokenAdmin: null,
  tokenUser: null,
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_ADMIN_SUCCESS:
      localStorage.setItem('tokenAdmin', payload);
      return {
        ...state,
        adminIsAuthenticated: true,
        tokenAdmin: payload,
      };
    case LOGIN_USER_SUCCESS:
      localStorage.setItem('tokenUser', payload);
      return {
        ...state,
        userIsAuthenticated: true,
        tokenUser: payload,
      };
    case LOGOUT: {
      // localStorage.clear();
      localStorage.removeItem('tokenAdmin');
      localStorage.removeItem('tokenUser');
      return {
        ...state,
        adminIsAuthenticated: false,
        userIsAuthenticated: false,
        tokenUser: null,
        tokenAdmin: null,
      };
    }
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const tokenAdmin = localStorage.getItem('tokenAdmin') || null;
    const tokenUser = localStorage.getItem('tokenUser') || null;

    if (tokenUser) {
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: tokenUser,
      });
    }
    if (tokenAdmin) {
      dispatch({
        type: LOGIN_ADMIN_SUCCESS,
        payload: tokenAdmin,
      });
    }
    return () => {
      // cleanup
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      <Router>
        <div className="wrapper">
          <Navigation />
          <section className="container">
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/auth/admin" component={Admin} />
              <Route exact path="/products" component={Products} />
              <Route exact path="/questionnaire" component={Questionnaire} />
              <Route exact path="/auth/user" component={Login} />
              <Route exact path="/logout" component={Logout} />
              <Route exact path="/admin/products" component={AddProduct} />
              <Route exact path="/users" component={Register} />
              <Route exact path="/userPanel" component={UserPanel} />
              <Route exact path="/products/:id" component={ProductItem} />
            </Switch>
          </section>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
