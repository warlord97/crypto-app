import React from "react";
import { Link, useParams } from "react-router-dom";

function CoinCard({ id, title, logo, symbol, price, currencySymbol="₹" }) { 
  return (
    <Link
      style={{
        textDecoration: "none",
      }}
      to={`/coin/${id}`}
    >
      <div className="coin-card">
        <img src={logo} alt={title} />
        <h3>{symbol}</h3>
        <p>{title}</p>
        <p>{ price ? `${currencySymbol} ${price}` : "NA" }</p>
      </div>
    </Link>
  );
}

export default CoinCard;
