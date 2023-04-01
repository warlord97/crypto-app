import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return <div className="header">
    <Link to="/">Home</Link>
    <Link to="/exchanges">Exchanges</Link>
    <Link to="/coins">Coins</Link>
  </div>;
}

export default Header;
