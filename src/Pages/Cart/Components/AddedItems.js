import React, { Component } from "react";
import * as configs from "../../../config";

class AddedItems extends Component {
  constructor() {
    super();
    this.state = {
      quantityRange: [],
    };
  }

  componentDidMount() {
    this.initQuantity();
  }

  initQuantity = () => {
    const itemQuantities = [];
    for (let i = 1; i < 1000; i++) {
      itemQuantities.push(i);
    }
    this.setState({ quantityRange: itemQuantities });
  };

  render() {
    const { quantityRange } = this.state;
    const {
      idx,
      id,
      name,
      price,
      quantity,
      image_url,
      selectItem,
      selectedItems,
      handleQuantity,
      deleteOneItem,
    } = this.props;

    return (
      <div className="basketItem" key={idx} id={id}>
        <input type="checkbox" id={`checkBox${id}`} checked={selectedItems} onClick={() => selectItem(id)} />
        <label htmlFor={`checkBox${id}`}>
          <span />
        </label>
        <div className="itemImg">
          <img src={image_url} alt="product_images" />
        </div>
        <div className="itemInfo">
          <div className="itemName">
            {name}
            <button className="deleteItem" onClick={() => deleteOneItem(id)}>
              <img src={configs.deleteBtn} alt="deleteBtn" />
            </button>
          </div>
          <div className="price">{price.toLocaleString()}원</div>
          <select className="quantity" value={quantity} onChange={(e) => handleQuantity(e, id)}>
            {quantityRange.map((number, idx) => {
              return (
                <option key={idx} value={number}>
                  {number}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    );
  }
}

export default AddedItems;
