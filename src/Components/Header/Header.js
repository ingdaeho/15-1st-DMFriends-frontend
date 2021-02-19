import React, { Component } from "react";
import * as configs from "../../config.js";
import SideMenu from "../SideMenu/SideMenu";
import "./Header.scss";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      showSideMenu: false,
      showMenu: false,
    };
  }
  goToCategory = () => {
    this.setState({
      showSideMenu: true,
      showMenu: true,
    });
  };
  hideSideMenu = () => {
    this.setState({
      showMenu: false,
    });
  };
  render() {
    const { showSideMenu, showMenu } = this.state;
    return (
      <header className="Header">
        {showSideMenu && <SideMenu showMenu={showMenu} hideSideMenu={this.hideSideMenu} />}
        <div className={showMenu ? "overLay active" : "overLay"} onClick={this.hideSideMenu}></div>
        <div className="HeaderContainer">
          <div className="HamburgerBox">
            <button className="HamBtn" onClick={this.goToCategory}>
              <img src={configs.threeLine} alt="hamburger" />
            </button>
          </div>
          <div className="CenterLogo">
            <img src="images/chaebinhan/Main/DM_LOGO.png" alt="logo" />
          </div>
          <div className="SearchBox">
            <button className="SearchBtn">
              <img src={configs.searchBtnImg} alt="search" />
            </button>
            <button className="TransBtn">
              <img src={configs.changeLanguageBtnImg} alt="earth" />
            </button>
          </div>
        </div>
      </header>
    );
  }
}
export default Header;
