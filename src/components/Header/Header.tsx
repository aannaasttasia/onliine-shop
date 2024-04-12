"use client";
import * as React from "react";
import { Component } from "react";
import "./css/Header.scss";

class Header extends Component {
  render() {
    return (
      <header className="header">
        <div className="header__logo">aannaasttasia</div>
        <div className="header__title">Easy <span className="header__shopping">Shopping</span> </div>
      </header>
    );
  }
}

export default Header;
