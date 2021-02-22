import React, { Component } from "react";
import DetailPageHeader from "../../Components/Header/DetailPageHeader/DetailPageHeader";
import DetailPageProductImg from "./Components/DetailPageProductImg/DetailPageProductImg";
import DetailPageContents from "./Components/DetailPageContents";
import ProductInfo from "./Components/ProductInfo";
import Shipping from "./Components/Shipping";
import Gethelp from "./Components/GetHelp";
import ProductReview from "./Components/ProductReview/ProductReview";
import Recommended from "./Components/Recommended";
import RecentlyViewed from "./Components/RecentlyViewed";
import BottomBar from "./Components/BottomBar";
import ScrollToTop from "./Components/ScrollToTop";
import Footer from "../../Components/Footer/Footer";
import "./ProductDetail.scss";
import { API } from "../../config";

export class ProductDetail extends Component {
  constructor() {
    super();
    this.state = {
      productData: [],
      recentViewData: [],
    };
  }

  componentDidMount() {
    this.getProductData();
    this.getRecentViewData();
  }

  getProductData = () => {
    fetch(`${API}/products/${this.props.match.params.productid}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          productData: res.productDetail,
        });
      });
  };

  getRecentViewData = () => {
    fetch(`${API}/products/${this.props.match.params.productid}/recentViews`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          recentViewData: res.recentViews,
        });
      });
  };

  render() {
    const { productData, recentViewData } = this.state;
    return (
      <>
        <DetailPageHeader />
        <DetailPageProductImg productData={productData} />
        <DetailPageContents productData={productData} />
        <ProductInfo />
        <Shipping />
        <Gethelp />
        <ProductReview reviewData={productData.reviews} />
        <Recommended />
        <RecentlyViewed recentViews={recentViewData} />
        <BottomBar productData={productData} />
        <ScrollToTop />
        <Footer />
      </>
    );
  }
}

export default ProductDetail;
