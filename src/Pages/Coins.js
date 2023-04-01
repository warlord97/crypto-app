import React, { useEffect, useState } from "react";
import { server } from "../index";
import Loader from "./Loader";
import Error from "./Error";
import CoinCard from "./CoinCard";

function Coins() {
  const [coinData, setCoinData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("inr");

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const btn = new Array(132).fill(1);

  function changePage(page) {
    setPage(page);
    setLoading(false);
  }

  useEffect(() => {
    fetchCoins();
  }, [currency, page]);

  async function fetchCoins() {
    try {
      const response = await fetch(
        `${server}/coins/markets?vs_currency=${currency}&page=${page}`
      );
      const jsonData = await response.json();
      if (Array.isArray(jsonData)) {
        setCoinData(jsonData);
      } else {
        throw new Error("Invalid data format");
      }
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  }

  if (error) return <Error message={"error while fetching coins"} />;

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className="radio">
            <input
              type="radio"
              value={"inr"}
              name="currency"
              onChange={(event) => setCurrency(event.target.value)}
            />
            <label>₹ INR</label>

            <input
              type="radio"
              value={"eur"}
              name="currency"
              onChange={(event) => setCurrency(event.target.value)}
            />
            <label>€ EUR</label>

            <input
              type="radio"
              value={"usd"}
              name="currency"
              onChange={(event) => setCurrency(event.target.value)}
            />
            <label>$ USD</label>
          </div>
          <div className="coin">
            {coinData.map((i) => (
              <CoinCard
                key={i.id}
                id={i.id}
                title={i.name}
                logo={i.image}
                symbol={i.symbol}
                price={i.current_price}
                currencySymbol={currencySymbol}
              />
            ))}
          </div>
          <div className="pagination">
            {btn.map((i, index) => (
              <button key={index} onClick={() => changePage(index + 1)}>
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Coins;
