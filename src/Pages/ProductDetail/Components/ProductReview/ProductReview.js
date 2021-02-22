import React, { Component } from "react";
import ReactStars from "react-stars";
import ReviewModal from "../ReviewModal";
import ReviewList from "./ReviewList";
import * as configs from "../../../../config.js";

export default class ProductReview extends Component {
  constructor() {
    super();
    this.state = {
      isReviewModalOpen: false,
      filteringState: "likeView",
      reviewData: [],
    };
  }

  openReviewModal = () => {
    this.setState({ isReviewModalOpen: true }, () => {
      document.body.style.overflow = "hidden";
    });
  };

  closeReviewModal = () => {
    this.setState({ isReviewModalOpen: false }, () => {
      document.body.style.overflow = "unset";
    });
  };

  changeFilter = (filteringState) => {
    if (
      filteringState === "likeView"
        ? this.state.reviewData.sort((a, b) => b.likedNum - a.likedNum)
        : this.state.reviewData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    )
      this.setState({ filteringState });
  };

  render() {
    const { reviewData } = this.props;
    const { isReviewModalOpen, filteringState } = this.state;
    const { openReviewModal, closeReviewModal, changeFilter } = this;
    return (
      <section className="ProductReview">
        <div className="reviewHeader">
          <div>
            <h3>리뷰 {reviewData?.length}개</h3>
            <div className="reviewTotalRate">
              <ReactStars
                className="ReactStars"
                count={5}
                value={0}
                size={24}
                half={true}
                edit={false}
                color1={"#D5D7E0"}
                color2={"#FF6582"}
              />
            </div>
          </div>
          <button className="reviewBtn" onClick={openReviewModal}>
            <img src={configs.pencil} alt="reviewIcon" /> 리뷰를 남겨주세요
          </button>
          <ReviewModal isOpen={isReviewModalOpen} close={closeReviewModal} />
        </div>
        <div className="reviewComment">
          <div className="filterling">
            <button
              className={`${filteringState === "likeView" && "clicked"}`}
              onClick={() => changeFilter("likeView")}
            >
              좋아요순
            </button>
            <button
              className={`${filteringState === "latestView" && "clicked"}`}
              onClick={() => changeFilter("latestView")}
            >
              최신순
            </button>
          </div>
          <ReviewList reviewList={reviewData} />
        </div>
      </section>
    );
  }
}
