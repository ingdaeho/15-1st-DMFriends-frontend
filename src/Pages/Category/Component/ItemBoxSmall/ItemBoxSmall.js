import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import * as configs from "../../../../config";
import "./ItemBoxSmall.scss";

class ItemBoxSmall extends Component {
  render() {
    const { imgUrl, itemName, price } = this.props;
    return (
      <Link to="/Category" className="ItemBoxSmall">
        <img src={imgUrl} alt="product" />
        <div className="ProductText">
          <span>{itemName}</span>
          <button>
            <img src={configs.basket} alt="basket" />
          </button>
        </div>
        <div className="ProductPrice">
          <p>{Number(price).toLocaleString()}원</p>
        </div>
      </Link>
    );
  }
}

export default withRouter(ItemBoxSmall);
