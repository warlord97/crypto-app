import React from "react";

function ExchangeCard({ title, logo, rank, url }) {
  return (
    <a
      style={{
        textDecoration: "none",
      }}
      href={url}
      target={"blank"}
    >
      <div className="exchange-card">
        <img src={logo} alt={title} />
        <h3>{rank}</h3>
        <p>{title}</p>
      </div>
    </a>
  );
}

export default ExchangeCard;
