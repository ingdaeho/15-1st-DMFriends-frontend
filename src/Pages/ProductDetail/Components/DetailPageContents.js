import React, { Component } from "react";

export default class DetailPageContents extends Component {
  render() {
    const { productData } = this.props;
    return (
      <section className="DetailPageContents">
        <h3>{productData.name}</h3>
        <article>{productData.description}</article>
        <hr className="thickHr" />
        {productData.product_images &&
          productData.product_images.map((el, idx) => {
            <img key={idx} src={el.image_url} alt="ProductDetailImg" />;
          })}
        <hr className="thickHr" />
      </section>
    );
  }
}
