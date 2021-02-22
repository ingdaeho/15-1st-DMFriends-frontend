import React, { Component } from "react";
import ItemBox from "../../NewProducts/Components/ItemBox/ItemBox";

export default class RecentlyViewed extends Component {
  render() {
    const { recentViews } = this.props;
    return (
      <section className="RecentlyViewed">
        <h3>
          최근 본 상품이
          <br />
          요기 있네
        </h3>
        <div className="recentItems">
          <ul>
            {recentViews &&
              recentViews.map((item, idx) => {
                return (
                  <li>
                    <ItemBox
                      key={idx}
                      id={item.id}
                      itemName={item.products.name}
                      price={item.products.price}
                      imgUrl={item.products.product_images.image_url}
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
