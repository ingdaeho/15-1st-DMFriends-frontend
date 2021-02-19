import React, { Component } from "react";
import DetailPageHeader from "../../Components/Header/DetailPageHeader/DetailPageHeader";
import ImgContainer from "./Component/ImgContainer/ImgContainer";
import ProductCategory from "./Component/ProductCategory/ProductCategory";
import ProductsHeader from "./Component/ProductsHeader/ProductsHeader";
import ProductListHidden from "./Component/ProductListHidden/ProductListHidden";
import ProductCardGrid from "./Component/ProductCardGrid/ProductCardGrid";
import PageNumContainer from "./Component/PageNumContainer/PageNumContainer";
import Footer from "../../Components/Footer/Footer";
import "./Category.scss";

class Category extends Component {
  constructor() {
    super();
    this.state = {
      isHidden: true,
      productList: [],
      totalCount: 0,
    };
  }
  //filter
  changeOrder = (option = "") => {
    fetch("http://192.168.0.27:8000/product/category/all" + option)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          productList: res.result,
          totalCount: res.result.length,
        });
      });
  };

  componentDidMount() {
    fetch("http://192.168.0.27:8000/product/category/all?category=1&sort=created_at")
      .then((res) => res.json())
      .then((res) => this.setState({ productList: res.result, totalCount: res.result.length }));
  }

  toggleHidden = () => {
    this.setState({
      isHidden: !this.state.isHidden,
    });
  };

  render() {
    const { isHidden, totalCount, productList } = this.state;

    return (
      <>
        <DetailPageHeader />
        <div className="Category">
          <div className="CateContainer">
            <ImgContainer />
            <ProductCategory changeOrder={this.changeOrder} />
            <ProductsHeader toggleHidden={this.toggleHidden} totalCount={totalCount} />
            {!isHidden && <ProductListHidden changeOrder={this.changeOrder} />}
            <ProductCardGrid productList={productList} />
            <PageNumContainer />
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

export default Category;
