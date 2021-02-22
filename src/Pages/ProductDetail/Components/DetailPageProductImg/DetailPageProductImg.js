import React, { Component } from "react";
import Slider from "react-slick";
import ReactStars from "react-stars";
import * as configs from "../../../../config.js";

export default class DetailPageProductImg extends Component {
  render() {
    const { productData } = this.props;
    return (
      <div className="DetailPageProductImg">
        <div className="imgWrap">
          <Slider {...settings}>
            {productData.product_images &&
              productData.product_images.map((item, idx) => {
                return (
                  <div key={idx} id={item.id}>
                    <img className="slideImg" src={item} alt="productImg" />
                  </div>
                );
              })}
          </Slider>
        </div>
        <div className="productNameAndPrice">
          <div className="productName">{productData.name}</div>
          <div className="productPrice">{productData.price?.toLocaleString()}원</div>
          <div className="productReviewStar">
            <div className="ReviewStarImg">
              <ReactStars
                className="ReactStars"
                count={5}
                value={productData.product_rate}
                size={24}
                half={true}
                edit={false}
                color1={"#D5D7E0"}
                color2={"#FF6582"}
              />
            </div>
            <span className="totalCount">({productData.product_rate})</span>
          </div>
          <ul className="shareLinks">
            <li>
              <img src={configs.shareKakaoBtnImg} alt="shareKakaoBtnImg" />
            </li>
            <li>
              <img src={configs.shareFacebookBtnImg} alt="shareFacebookBtnImg" />
            </li>
            <li>
              <img src={configs.shareTwitterBtnImg} alt="shareTwitterBtnImg" />
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slideToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 2750,
};
