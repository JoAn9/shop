import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Landing from './components/Landing';
import Navigation from './components/Navigation';
import Admin from './components/Admin';
import Login from './components/Login';
import Register from './components/Register';
import Logout from './components/Logout';
import Cart from './components/Cart';
import Products from './components/Products';
import AddProduct from './components/AddProduct';
import UserPanel from './components/UserPanel';
import Questionnaire from './components/Questionnaire';
import ProductItem from './components/ProductItem';
import AlertMessage from './components/AlertMessage';
import ProtectedRouteAdmin from './components/routing/ProtectedRouteAdmin';
import ProtectedRouteUser from './components/routing/ProtectedRouteUser';
import setToken from './utils/setToken';
import theme from './theme';
import store from './store';
import './App.css';
import { loadUser, loadAdmin } from './actions/auth';
import { getProductsToCart } from './actions/cart';
import { fetchProducts } from './actions/products';

if (localStorage.token) {
  setToken(localStorage.token);
}

function App() {
  useEffect(() => {
    const tokenUser = localStorage.getItem('tokenUser') ?? null;
    if (tokenUser) store.dispatch(loadUser());
  }, []);

  useEffect(() => {
    const tokenAdmin = localStorage.getItem('tokenAdmin') ?? null;
    if (tokenAdmin) store.dispatch(loadAdmin());
  }, []);

  useEffect(() => {
    store.dispatch(fetchProducts());
  }, []);

  useEffect(() => {
    store.dispatch(getProductsToCart());
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <div className="app-wrapper">
            <Navigation />
            <AlertMessage />
            <section className="app-container">
              <Switch>
                <Route exact path="/" component={Landing} />
                <Route exact path="/auth/admin" component={Admin} />
                <Route exact path="/products" component={Products} />
                <Route exact path="/questionnaire" component={Questionnaire} />
                <Route exact path="/auth/user" component={Login} />
                <Route exact path="/logout" component={Logout} />
                <Route exact path="/cart" component={Cart} />
                <ProtectedRouteAdmin
                  exact
                  path="/admin/products"
                  component={AddProduct}
                />
                <Route exact path="/users" component={Register} />
                <ProtectedRouteUser
                  exact
                  path="/userPanel"
                  component={UserPanel}
                />
                <Route exact path="/products/:id" component={ProductItem} />
                <Route path="*" component={() => '404 NOT FOUND'} />
              </Switch>
            </section>
          </div>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
