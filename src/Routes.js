import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./Pages/Main/Main";
import CartList from "./Pages/CartList/CartList";
import ProductDetail from "./Pages/ProductDetail/ProductDetail";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import Category from "./Pages/Category/Category";
import NewProducts from "./Pages/NewProducts/NewProducts";
import SideMenu from "./Components/SideMenu/SideMenu";
import DetailPageHeader from "./Components/Header/DetailPageHeader/DetailPageHeader";

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/CartList" component={CartList} />
          <Route exact path="/ProductDetail" component={ProductDetail} />
          <Route exact path="/Login" component={Login} />
          <Route exact path="/Signup" component={Signup} />
          <Route exact path="/Category" component={Category} />
          <Route exact path="/NewProducts" component={NewProducts} />
          <Route exact path="/SideMenu" component={SideMenu} />
          <Route exact path="/DetailPageHeader" component={DetailPageHeader} />
        </Switch>
      </Router>
    );
  }
}
export default Routes;
