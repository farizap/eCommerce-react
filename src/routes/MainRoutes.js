// import module
import React from "react";
import ReactDOM from "react-dom";
import { Route, Link, Switch, BrowserRouter as Router } from "react-router-dom";

//import store
import { Provider } from "unistore/react";
import { store } from "../store";

// import pages
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import SignUpShop from "../pages/SignUpShop";
import Profile from "../pages/Profile";
import InputProduct from "../pages/InputProduct";
import ProductByCategory from "../pages/ProductByCategory";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import OrderList from "../pages/OrderList";
import ShopItems from "../pages/ShopItems";
import EditBarang from "../pages/EditBarang";
import ProductBySearch from "../pages/ProductBySearch";
import Penjualan from "../pages/Penjualan";
import Page404 from "../pages/Page404";

// import component
import Header from "../components/HeaderAtas";
import HeaderBawah from "../components/HeaderBawah";

//temp

function MainRoutes() {
  return (
    <Router>
      <Provider store={store}>
        <div>
          <Header />
          <HeaderBawah />

          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/shop/signup" component={SignUpShop} />
            <Route exact path="/shop/input" component={InputProduct} />
            <Route
              exact
              path="/category/:category"
              component={ProductByCategory}
            />
            <Route
              exact
              path="/product/:product_id"
              component={ProductDetails}
            />
            <Route exact path="/profile/order" component={OrderList} />
            <Route exact path="/shop/items" component={ShopItems} />
            <Route exact path="/product" component={ProductBySearch} />
            <Route
              exact
              path="/shop/items/:product_id"
              component={EditBarang}
            />
            <Route
              exact
              path="/shop/order"
              component={Penjualan}
            />
            
            <Route component={Page404} />
          </Switch>
        </div>
      </Provider>
    </Router>
  );
}

export default MainRoutes;
