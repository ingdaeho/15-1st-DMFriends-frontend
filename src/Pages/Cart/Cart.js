import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Nav from "./Components/Nav";
import AddedItems from "./Components/AddedItems";
import "./Cart.scss";
import * as configs from "../../config";
import { API } from "../../config";

class Cart extends Component {
  constructor() {
    super();
    this.state = {
      cartData: [],
    };
  }

  componentDidMount = () => {
    this.getCartData();
  };

  getCartData = async () => {
    await fetch(`http://localhost:3000/users/2/cart`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({ cartData: res.cartItems });
      });
    this.addSelectOption();
  };

  addSelectOption = () => {
    const { cartData } = this.state;
    const newData = [];
    for (let id of Object.keys(cartData)) {
      let item = cartData[id];
      const optionAddedData = { ...item, selected: true };
      newData.push(optionAddedData);
    }
    this.setState({ cartData: newData });
  };

  selectAll = () => {
    const { cartData } = this.state;
    cartData.reduce((result, item) => (result = result && item.selected), true)
      ? cartData.map((item) => {
          item.selected = false;
          return item;
        })
      : cartData.map((item) => {
          item.selected = true;
          return item;
        });
    this.setState({ cartData });
  };

  selectItem = (id) => {
    const { cartData } = this.state;
    for (let item of cartData) {
      if (item.id === id) {
        item.selected = !item.selected;
      }
    }
    this.setState({ cartData });
  };

  removeProductFetch = (id) => {
    fetch(`${API}/users/2/cart`, {
      headers: { Authorization: localStorage.getItem("token"), "Content-Type": "application/json" },
      method: "delete",
      body: JSON.stringify([id]),
    });
  };

  deleteOneItem = (id) => {
    const { cartData } = this.state;
    const newData = cartData.filter((el) => el.id !== id);
    const idToDelete = cartData[0].products.id;
    this.setState({ cartData: newData });
    this.removeProductFetch({ product_id: idToDelete });
  };

  deleteSelected = () => {
    const { cartData } = this.state;
    const itemsToDelete = cartData.filter((item) => item.selected);
    const idsToDelete = itemsToDelete.map((item) => item.products.id);
    const idsArr = [];
    for (let id of idsToDelete) {
      idsArr.push({ product_id: id });
    }
    this.removeProductFetch(idsArr);
    this.getCartData();
  };

  handleQuantity = (e, id) => {
    const { cartData } = this.state;
    const { value } = e.target;
    for (let item of cartData) {
      if (item.id === id) {
        item.quantity = Number(value);
      }
    }
    this.setState({ cartData });
  };

  render() {
    const { cartData } = this.state;
    const { selectItem, selectAll, handleQuantity, deleteOneItem, deleteSelected } = this;
    const selectedAll = cartData.reduce((result, item) => (result = result && item.selected), true);
    const selectedItems = cartData.filter((item) => item.selected);
    const totalPrice = selectedItems
      ?.reduce((acc, cur) => {
        return acc + Number(cur.price * cur.quantity);
      }, 0)
      .toLocaleString();
    return (
      <>
        <Header />
        <Nav />
        <section className="Cart">
          <div className="MyPageHeadTapWrap">
            <div className="mainTapList">
              <Link>최근 본</Link>
              <Link>내 활동</Link>
              <Link className="selected">
                장바구니<button className="numOfCart">{cartData.length}</button>
              </Link>
              <Link>주문내역</Link>
            </div>
          </div>
          <div className="ItemList">
            <div className="totalItem">
              <div className="selectItems">
                <input type="checkbox" id="checkAllProducts" checked={selectedAll} onClick={selectAll} />
                <label htmlFor="checkAllProducts">
                  <span></span>
                  전체
                </label>
                <span>{cartData.length}</span>
              </div>
              <div className="removeItems">
                {selectedItems.length}개 선택
                <img onClick={deleteSelected} className="removeBtn" src={configs.trashCan} alt="removeBtn" />
              </div>
            </div>
          </div>
          <div className="AddedItems">
            <div className="allItemContainer">
              {cartData &&
                cartData.map((el, idx) => {
                  return (
                    <AddedItems
                      key={idx}
                      id={el.id}
                      name={el.products.name}
                      price={el.price}
                      quantity={el.quantity}
                      image_url={el.products.product_images}
                      selectedItems={el.selected}
                      selectItem={selectItem}
                      handleQuantity={handleQuantity}
                      deleteOneItem={deleteOneItem}
                    />
                  );
                })}
            </div>
            <div className="payment">
              <div className="shipping">
                <span>배송국가</span>
                <select>
                  <option value="한국" selected>
                    한국
                  </option>
                </select>
              </div>
              <div>
                <div>총 주문금액</div>
                <div>{totalPrice.toLocaleString()}원</div>
              </div>
              <div>
                <div>배송비</div>
                <div>무료</div>
              </div>
              <div className="totalPrice">
                <div>총 결제금액</div>
                <div className="totalPrice2">{totalPrice.toLocaleString()}원</div>
              </div>
            </div>
          </div>
        </section>
        <button className="goToPay">
          <span>{totalPrice}원 주문 하기</span>
        </button>
      </>
    );
  }
}

export default Cart;
