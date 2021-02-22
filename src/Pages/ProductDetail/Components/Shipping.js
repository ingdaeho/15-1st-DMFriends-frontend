import React, { Component } from "react";

export default class Shipping extends Component {
  constructor() {
    super();
    this.state = {
      delivery: [],
      cancel: [],
      nonRefundable: [],
      refund: [],
      otherInfo: [],
      global: [],
      globalRefund: [],
      tax: [],
      otherRequest: [],
    };
  }

  componentDidMount() {
    fetch(`data/Shipping.json`)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          delivery: res.delivery,
          cancel: res.cancel,
          nonRefundable: res.nonRefundable,
          refund: res.refund,
          otherInfo: res.otherInfo,
          global: res.global,
          globalRefund: res.globalRefund,
          tax: res.tax,
          otherRequest: res.otherRequest,
        });
      });
  }

  render() {
    const { delivery, cancel, nonRefundable, refund, otherInfo, global, globalRefund, tax, otherRequest } = this.state;
    return (
      <section className="Shipping">
        <div className="shippingOrRefund">
          <h3>배송·반품</h3>
          <p>국내배송만 가능한 상품입니다</p>
        </div>
        <div className="shippingDestination">
          <span className="localOrForeign">국내 배송</span>
          <span className="localOrForeign">글로벌 배송</span>
        </div>
        <div className="shippingInfo">
          <div>
            <div>
              <p>배송</p>
              <ul>
                {delivery &&
                  delivery.map((item, idx) => {
                    return <li key={idx}>{item.content}</li>;
                  })}
              </ul>
            </div>
            <div>
              <p>취소·교환·반품</p>
              <ul>
                {cancel &&
                  cancel.map((item, idx) => {
                    return <li key={idx}>{item.content}</li>;
                  })}
              </ul>
            </div>
            <div>
              <p>교환·반품이 불가한 경우</p>
              <ul>
                {nonRefundable &&
                  nonRefundable.map((item, idx) => {
                    return <li key={idx}>{item.content}</li>;
                  })}
              </ul>
            </div>
            <div>
              <p>환불</p>
              <ul>
                {refund &&
                  refund.map((item, idx) => {
                    return <li key={idx}>{item.content}</li>;
                  })}
              </ul>
            </div>
            <div>
              <p>기타 문의</p>
              <ul>
                {otherInfo &&
                  otherInfo.map((item, idx) => {
                    return <li key={idx}>{item.content}</li>;
                  })}
              </ul>
            </div>
          </div>
          <div>
            <div>
              <p>배송</p>
              <ul>
                {global &&
                  global.map((item, idx) => {
                    return <li key={idx}>{item.content}</li>;
                  })}
              </ul>
            </div>
            <div>
              <p>취소·교환·반품</p>
              <ul>
                {globalRefund &&
                  globalRefund.map((item, idx) => {
                    return <li key={idx}>{item.content}</li>;
                  })}
              </ul>
            </div>
            <div>
              <p>통관·관세</p>
              <ul>
                {tax &&
                  tax.map((item, idx) => {
                    return <li key={idx}>{item.content}</li>;
                  })}
              </ul>
            </div>
            <div>
              <p>기타 문의</p>
              <ul>
                {otherRequest &&
                  otherRequest.map((item, idx) => {
                    return <li key={idx}>{item.content}</li>;
                  })}
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
