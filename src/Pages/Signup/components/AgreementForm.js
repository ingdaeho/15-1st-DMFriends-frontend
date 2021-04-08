import React from "react";

class AgreementForm extends React.Component {
  render() {
    const { id, title, checked, handleCheckedBox } = this.props;
    return (
      <li>
        <input type="checkbox" id={`checkBox${id}`} checked={checked} onClick={() => handleCheckedBox(id)} />
        <label htmlFor={`checkBox${id}`}>
          <span></span>
          {title}
        </label>
      </li>
    );
  }
}

export default AgreementForm;
