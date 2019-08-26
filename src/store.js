import createStore from "unistore";
import axios from "axios";
import { Redirect } from "react-router-dom";
import React from "react";

const initialState = {
  // data
  listCategory: [],
  shop: [],
  listPayment: [],
  search: "",

  // data search/ product
  listProduct: [],
  listProduct2: [],
  product: [],
  orderBySearch: "name",
  sortSearch: "asc",

  // data user
  name: "",
  address: "",
  contact: "",
  product_order_cnt: "",
  age: "",
  sex: "",
  created_at: "",
  status: "",
  client_type: "",

  // data pembelian
  cart: [],
  cart_cnt: 0,
  cart_price: 0,

  // data shop
  shop_id: "",
  shop_name: "",
  shop_address: "",
  shop_city: "",
  shop_contact: "",
  shop_product_cnt: 0,
  shop_reputasi: 0,
  shop_status: "",
  shop_created_at: "",

  // api
  localHost: "http://0.0.0.0:5000",
  categoryEndP: "/category",
  productEndP: "/product",
  loginEndP: "/login",
  usersEndP: "/users",
  axiosNoToken: axios.create({
    baseURL: "http://0.0.0.0:5000"
  }),

  // token
  isLogin: null,
  username: "",
  token: "",
  user_id: 0,
  user_status: ""
};

const store = createStore(initialState);

const actions = store => ({
  // setter data
  setListCategory(state, value) {
    return { listCategory: value };
  },

  setListCart(state, value) {
    return { listCategory: value };
  },
  setLogout(state) {
    return { isLogin: null };
  },
  setLogin(state, value) {
    return { isLogin: value };
  },
  setSearch(state, value) {
    return { search: value };
  },
  // login check
  islogin() {
    if (sessionStorage.getItem("token") === null) {
      return <Redirect to="/login" />;
    }
  },
  setOrderBySearch(state, value) {
    return { orderBySearch: value };
  },
  setSortSearch(state, value) {
    return { sortSearch: value };
  },

  // Axios
  async getCategory2(state) {
    await store
      .getState()
      .axiosNoToken.get("/category/list")
      .then(response => {
        console.log(response);
        store.setState({ listCategory: response.data });
      })
      .catch(error => console.log("Error getCategory", error));
  },
  async getProduct(state, paramInput) {
    await store
      .getState()
      .axiosNoToken.get("product/all", paramInput)
      .then(response => {
        console.log(response);
        store.setState({ listProduct: response.data });
      })
      .catch(error => console.log("Error getProduct", error));
  },
  async getProduct2(state, paramInput) {
    await store
      .getState()
      .axiosNoToken.get("product/all", paramInput)
      .then(response => {
        console.log(response);
        store.setState({ listProduct2: response.data });
      })
      .catch(error => console.log("Error getProduct", error));
  },
  async getProductById(state, product_id) {
    await store
      .getState()
      .axiosNoToken.get("product/" + product_id)
      .then(response => {
        console.log(response);
        store.setState({ product: response.data });
      })
      .catch(error => console.log("Error getProductById", error));
  },
  async SignUp(state, data) {
    console.log("SignUp in Store", data);
    await store
      .getState()
      .axiosNoToken.post("/users/register", data)
      .then(response => {
        console.log("signup", response);
        store.setState({ test: response.data });
      })
      .catch(error => console.log("Error register", error));
  },
  async Login(state, data) {
    await store
      .getState()
      .axiosNoToken.post("/login", data)
      .then(response => {
        store.setState({ token: response.data.token });
        store.setState({ user_id: response.data.user_id });
        store.setState({ client_type: response.data.client_type });
        store.setState({ status: response.data.status });
        store.setState({ shop_id: response.data.shop_id });
        store.setState({ isLogin: 1 });
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("shop_id", response.data.shop_id);
      })
      .catch(error => {
        console.log("Error login", error);
      });
  },
  async SignUpShop(state, data) {
    let dataEdit = {
      address: data.address,
      contact: data.contact,
      name: data.name,
      city: data.city,
      user_id: store.getState().user_id
    };
    console.log(dataEdit);
    console.log(store.getState().token);
    await store
      .getState()
      .axiosNoToken.post("/shop/register", dataEdit, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token")
        }
      })
      .then(response => {
        store.setState({ client_type: "seller" });
        store.setState({ shop_id: store.getState().shop_id });
      })
      .catch(error => {
        console.log("Error register shop", error);
      });
  },
  async getProfile(state) {
    await store
      .getState()
      .axiosNoToken.get("/users/me", {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token")
        }
      })
      .then(response => {
        console.log("getprofile", response);
        store.setState({ address: response.data.address });
        store.setState({ product_order_cnt: response.data.product_order_cnt });
        store.setState({ name: response.data.Detail.name });
        store.setState({ created_at: response.data.created_at.slice(0, 17) });
        store.setState({ status: response.data.status });
      })
      .catch(error => {
        console.log("Error register shop", error);
      });
  },
  async getShopProfile(state) {
    await store
      .getState()
      .axiosNoToken.get("/shop/" + sessionStorage.getItem("shop_id"), {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token")
        }
      })
      .then(response => {
        console.log("getshopprofile", response);
        store.setState({ shop_address: response.data.address });
        store.setState({ shop_name: response.data.name });
        store.setState({ shop_city: response.data.city });
        store.setState({ shop_contact: response.data.contact });
        store.setState({ shop_product_cnt: response.data.product_cnt });
        store.setState({ shop_reputasi: response.data.reputasi });
        store.setState({ shop_status: response.data.status });
        store.setState({
          shop_created_at: response.data.created_at.slice(0, 17)
        });
      })
      .catch(error => {
        console.log("Error profile shop", error);
      });
  },
  async getCart(state) {
    await store
      .getState()
      .axiosNoToken.get("/cart", {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token")
        }
      })
      .then(response => {
        console.log("cart", response);
        store.setState({ cart: response.data });
        store.setState({ cart_cnt: response.data.length });
        let sum = 0;
        response.data.forEach(element => {
          sum = sum + element.price;
        });
        store.setState({ cart_price: sum });
      })
      .catch(error => {
        console.log("Error get cart", error);
        store.setState({ cart: [] });
        store.setState({ cart_cnt: 0 });
        store.setState({ cart_price: 0 });
      });
  },
  async checkout(state) {
    await store
      .getState()
      .axiosNoToken.get("/checkout", {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token")
        }
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log("Error register shop", error);
      });
  },
  async getPaymentMethod(state) {
    await store
      .getState()
      .axiosNoToken.get("/methodpayment")
      .then(response => {
        store.setState({ listPayment: response.data });
      })
      .catch(error => {
        console.log("Error listPayment", error);
      });
  },
  async getShop(state, product_id) {
    await store
      .getState()
      .axiosNoToken.get("product/" + product_id)
      .then(async response => {
        await store
          .getState()
          .axiosNoToken.get("shop/" + response.data.shop_id)
          .then(response => {
            console.log(response);

            store.setState({ shop: response.data });
          });
      })
      .catch(error => console.log("Error getProductById", error));
  }
});

export { store, actions };
