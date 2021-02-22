import React, { Component } from "react";
import ItemBox from "../../NewProducts/Components/ItemBox/ItemBox";

export default class Recommended extends Component {
  state = {
    productsList: [],
    productValue: "",
  };

  // componentDidMount() {
  //   fetch("http://192.168.0.27:8000/product/category/new?category=1&sort=-price")
  //     .then((res) => res.json())
  //     .then((res) => {
  //       this.setState({ productsList: res.result });
  //     });
  // }

  render() {
    const { productsList } = this.state;
    return (
      <section className="Recommended">
        <h3>
          잠깐만,
          <br />이 상품은 어때요?
        </h3>
        <div className="recommendItems">
          <ul>
            {productsList &&
              productsList.map((productList, idx) => {
                return (
                  <li>
                    <ItemBox
                      key={idx}
                      id={productList.id}
                      itemName={productList.name}
                      price={productList.price}
                      imgUrl={productList.image_url}
                    />
                  </li>
                );
              })}
          </ul>
        </div>
      </section>
    );
  }
}
