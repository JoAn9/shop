import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './components/Landing';
import Navigation from './components/Navigation';
import Admin from './components/Admin';
import Login from './components/Login';
import Products from './components/Products';
import AddProduct from './components/AddProduct';
import './App.css';

function App() {
  return (
    <Router>
      <div className="wrapper">
        <Navigation />
        <section className="container">
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/admin" component={Admin} />
            <Route exact path="/products" component={Products} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/admin/products" component={AddProduct} />
          </Switch>
        </section>
      </div>
    </Router>
  );
}

export default App;
