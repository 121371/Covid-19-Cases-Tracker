import React from "react";
import { HEADER_TITLE } from "../../../constants/app.constant";
import "./Header.css";

const Header = () => {

  return (
    <div className="header">
      <h1>{HEADER_TITLE}</h1>
    </div>
  );
};

export default Header;
