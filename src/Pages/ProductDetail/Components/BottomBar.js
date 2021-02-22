import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import * as configs from "../../../config.js";

class BottomBar extends Component {
  constructor() {
    super();
    this.cart = React.createRef();
    this.state = {
      quantityValue: 1,
      totalPrice: "",
    };
  }

  handleDecrease = () => {
    const totalSubtraction = this.state.totalPrice - this.props.productData.price;
    this.setState({
      quantityValue: this.state.quantityValue - 1,
      totalPrice: totalSubtraction,
    });
  };

  handleIncrease = () => {
    const totalAdded = +this.props.productData.price * this.state.quantityValue;
    this.setState({
      quantityValue: this.state.quantityValue + 1,
      totalPrice: +this.props.productData.price + totalAdded,
    });
  };

  goToCart = () => {
    this.props.history.push("/Cart");
  };

  addToCart = () => {
    this.cart.current.className = "active";
    setTimeout(() => {
      this.cart.current.className = "modalbox";
    }, 2500);
    this.addProduct();
  };

  addProduct = () => {
    fetch(`http://localhost:3000/users/2/cart`, {
      headers: { Authorization: localStorage.getItem("token"), "Content-Type": "application/json" },
      method: "post",
      body: JSON.stringify({
        quantity: this.state.quantityValue,
        product_id: this.props.productData.id,
        price: this.props.productData.price,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("message", res);
      });
  };

  render() {
    const { quantityValue, totalPrice } = this.state;
    const { handleDecrease, handleIncrease, goToCart, addToCart } = this;
    const { price } = this.props.productData;
    const onlyNaturalNum = quantityValue > 1;
    let whichPrice = totalPrice ? totalPrice : price;
    return (
      <>
        <section className="BottomBar">
          <div className="optionsWrap">
            <div className="quantities">
              <button className="minusBtn" onClick={handleDecrease} disabled={!onlyNaturalNum}>
                -
              </button>
              <input type="number" value={quantityValue} />
              <button className="plusBtn" onClick={handleIncrease}>
                +
              </button>
            </div>
            <div className="totalPrice">
              <span className="total">총 상품금액</span>
              <span>{whichPrice?.toLocaleString()}원</span>
            </div>
          </div>
          <div className="purchase">
            <img onClick={addToCart} src={configs.bag} alt="addCart"></img>
            <span onClick={goToCart}>바로구매</span>
          </div>
        </section>
        <div className="addedModal">
          <button ref={this.cart} className="modalbox" onClick={goToCart}>
            <img className="check" src={configs.checkImg} alt="checkImg" />
            <span>장바구니에 담겼습니다.</span>
            <img src={configs.rightArrow} alt="rightArrow" />
          </button>
        </div>
      </>
    );
  }
}

export default withRouter(BottomBar);
