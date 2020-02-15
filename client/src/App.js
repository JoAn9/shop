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
import { LOGIN_SUCCESS, LOGOUT } from './store/types';
import './App.css';

export const AuthContext = createContext();

const initialState = {
  isAuthenticated: false,
  token: null,
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload);
      return {
        ...state,
        isAuthenticated: true,
        token: payload,
      };
    case LOGOUT: {
      // localStorage.clear();
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: false,
        token: null,
      };
    }
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const token = localStorage.getItem('token') || null;

    if (token) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: token,
      });
    }
    return () => {
      // cleanup
    };
  }, []);

  console.log(state);
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
              <Route exact path="/admin" component={Admin} />
              <Route exact path="/products" component={Products} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/logout" component={Logout} />
              <Route exact path="/admin/products" component={AddProduct} />
              <Route exact path="/users" component={Register} />
            </Switch>
          </section>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
