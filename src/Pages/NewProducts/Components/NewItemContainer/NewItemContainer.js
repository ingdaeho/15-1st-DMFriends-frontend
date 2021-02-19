import React, { Component } from "react";
import ItemBox from "../ItemBox/ItemBox";
import "./NewItemContainer.scss";

class NewItemContainer extends Component {
  state = {
    productsList: [],
    productValue: "",
  };

  componentDidMount() {
    fetch("http://192.168.0.27:8000/product/category/new?category=7&sort=-price")
      .then((res) => res.json())
      .then((res) => this.setState({ productsList: res.result }));
  }

  render() {
    const { productsList } = this.state;

    return (
      <div className="NewItemContainer">
        <div className="ProductsList">
          <p className="theme">추천 신규 테마</p>
          <h3>리빙</h3>
          <div className="ProductsCardGrid">
            {productsList &&
              productsList.map((productList, idx) => {
                return (
                  <ItemBox
                    key={idx}
                    id={productList.id}
                    itemName={productList.name}
                    price={productList.price}
                    imgUrl={productList.image_url}
                  />
                );
              })}
          </div>
        </div>
      </div>
    );
  }
}

export default NewItemContainer;
