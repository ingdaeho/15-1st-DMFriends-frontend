import React, { Component } from "react";
import Pagination from "react-js-pagination";
import ReactStars from "react-stars";
import LoginModal from "../LoginModal";

class ReviewList extends Component {
  constructor() {
    super();
    this.state = {
      isModalOpen: false,
      page: 1,
      perPage: 5,
      activePage: 1,
    };
  }

  setPage = (number) => {
    this.setState({ page: number });
  };

  openModal = () => {
    this.setState({ isModalOpen: true }, () => {
      document.body.style.overflow = "hidden";
    });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false }, () => {
      document.body.style.overflow = "unset";
    });
  };

  render() {
    const { isModalOpen, page, perPage } = this.state;
    const { openModal, closeModal } = this;
    const { reviewList } = this.props;
    return (
      <>
        <ul className="ReviewList">
          {reviewList &&
            reviewList.map((el, idx) => {
              return (
                <li key={idx}>
                  <div>
                    <div className="userName">{el.users.username}</div>
                    <div className="userReviewRate">
                      <ReactStars
                        className="ReactStars"
                        count={5}
                        value={el.review_rate}
                        size={18}
                        half={true}
                        edit={false}
                        color1={"#D5D7E0"}
                        color2={"#FF6582"}
                      />
                      <p>{el.created_at.substring(0, 10)}</p>
                    </div>
                    <p className="userReviewComment">{el.contents}</p>
                  </div>
                  <div className="reviewLike">
                    <button className={el.isLiked ? "liked" : "button"} onClick={openModal}>
                      좋아요
                    </button>
                    <LoginModal isOpen={isModalOpen} close={closeModal} />
                    <p>{el.liked_num}명이 좋아했어요</p>
                  </div>
                </li>
              );
            })}
        </ul>
        <Pagination
          totalItemsCount={reviewList?.length}
          onChange={(number) => this.setPage(number)}
          itemsCountPerPage={perPage}
          activePage={page}
          innerClass="paginationUl"
          activeLinkClass="activeLinkClass"
          linkClass="linkATag"
          itemClassNext="itemClassNext"
          itemClassPrev="itemClassPrev"
          hideFirstLastPages="true"
          hideDisabled="true"
        />
      </>
    );
  }
}

export default ReviewList;
