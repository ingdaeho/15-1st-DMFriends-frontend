import React, { Component } from "react";
import "./MainReply.scss";

class MainReply extends Component {
  render() {
    const { feed } = this.props;
    return (
      <div className="MainReply">
        <section className="mainReply">
          <div className="footerReply">
            <div className="footerReplyLike">댓글</div>
            <div className="footerReplyCount">{feed.feed_comments.length}개</div>
          </div>
          <div className="footerReplyContents">
            <div className="footerReplyId">{feed.feed_comments.id}</div>
            <div className="footerReplyContent">{feed.feed_comments.contents}</div>
          </div>
          <div className="replyBox">
            <input
              className="footerReplyInput"
              type="text"
              placeholder="댓글을 달아주세요."
              onKeyPress={this.appKeyPress}
            />
          </div>
        </section>
      </div>
    );
  }
}

export default MainReply;
