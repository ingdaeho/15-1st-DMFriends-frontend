import React, { Component } from "react";
import ItemBox from "../ItemBox/ItemBox";
import "./UpdateItemContainer.scss";

class UpdateItemContainer extends Component {
  state = {
    UpdateProducts: [],
    UpdateValue: "",
  };

  componentDidMount() {
    fetch("http://192.168.0.27:8000/product/category/all?category=7&sort=-price")
      .then((res) => res.json())
      .then((res) => this.setState({ UpdateProducts: res.result }));
  }

  render() {
    const { UpdateProducts } = this.state;
    return (
      <div className="UpdateItemContainer">
        <div className="ProductsList">
          <p className="theme">오늘 업데이트 했어요</p>
          <h3>새로나운 친구들</h3>
          <div className="ProductsCardGrid">
            {UpdateProducts &&
              UpdateProducts.map((UpdateProduct, idx) => {
                return (
                  <ItemBox
                    key={idx}
                    id={UpdateProduct.id}
                    itemName={UpdateProduct.name}
                    price={UpdateProduct.price}
                    imgUrl={UpdateProduct.image_url}
                  />
                );
              })}
          </div>
        </div>
      </div>
    );
  }
}

export default UpdateItemContainer;
