import React, { useEffect, useState } from "react";
import { server } from "../index";
import Loader from "./Loader";
import Error from "./Error";
import { useParams } from "react-router-dom";
import Chart from "./Chart";

function CoinDetails() {
  const params = useParams();
  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("inr");
  const [days, setDays] = useState("24h");
  const [chartArray, setChartArray] = useState([]);

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "1y", "max"];

  function switchChartStats(key) {
    switch (key) {
      case "24h":
        setDays("24h");
        setLoading(true);
        break;

      case "7d":
        setDays("7d");
        setLoading(true);
        break;

      case "14d":
        setDays("14d");
        setLoading(true);
        break;

      case "30d":
        setDays("30d");
        setLoading(true);
        break;

      case "60d":
        setDays("60d");
        setLoading(true);
        break;

      case "200d":
        setDays("200d");
        setLoading(true);
        break;

      case "1y":
        setDays("365d");
        setLoading(true);
        break;

      case "max":
        setDays("max");
        setLoading(true);
        break;

      default:
        setDays("24h");
        setLoading(true);
        break;
    }
  }

  useEffect(() => {
    async function fetchCoin() {
      try {
        const response1 = await fetch(`${server}/coins/${params.id}`);
        const jsonData1 = await response1.json();

        const response2 = await fetch(
          `${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`
        );
        const jsonData2 = await response2.json();

        setCoin(jsonData1);
        setChartArray(jsonData2.prices);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    }

    fetchCoin();
  }, [params.id, currency, days]);

  if (error) return <Error message={"error while fetching coin"} />;

  return (
    <div className="coin-container">
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className="radioCD">
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

          <div className="chart-box">
            <Chart arr={chartArray} currency={currencySymbol} days={days} />
          </div>

          <div className="chart-btn">
            {btns.map((i) => (
              <button key={i} onClick={() => switchChartStats(i)}>
                {i}
              </button>
            ))}
          </div>

          <div className="info">
            <p className="date-updated-on">
              Last Updated on{" "}
              {Date(coin.market_data.last_updated).split("G")[0]}
            </p>
            <img src={coin.image.large} alt={coin.name} />
            <p className="coin-name">{coin.name}</p>
            <h2>{`${currencySymbol} ${coin.market_data.current_price[currency]}`}</h2>
            <p className="price-change">
              {coin.market_data.price_change_percentage_24h_in_currency[
                currency
              ] > 0
                ? `⮙ ${coin.market_data.price_change_percentage_24h_in_currency[currency]}`
                : `⮛ ${coin.market_data.price_change_percentage_24h_in_currency[currency]}`}
              %
            </p>
            <h3 className="detail-rank">#{coin.market_cap_rank}</h3>
            <div className="day-range">
              <p className="day-high">{`24h HIGH : ${currencySymbol} ${coin.market_data.high_24h[currency]}`}</p>
              <p className="day-low">{`24h LOW : ${currencySymbol} ${coin.market_data.low_24h[currency]}`}</p>
            </div>
            <div className="item">
              <Item title={"Max Supply"} value={coin.market_data.max_supply} />
              <Item
                title={"Circulating Supply"}
                value={coin.market_data.circulating_supply}
              />
              <Item
                title={"Market Cap"}
                value={`${currencySymbol}${coin.market_data.market_cap[currency]}`}
              />
              <Item
                title={"All Time Low"}
                value={`${currencySymbol}${coin.market_data.atl[currency]}`}
              />
              <Item
                title={"All Time High"}
                value={`${currencySymbol}${coin.market_data.ath[currency]}`}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Item({ title, value }) {
  return (
    <div className="item-child">
      <p className="title-p">{title}</p>
      <p className="value-p">{value}</p>
    </div>
  );
}

export default CoinDetails;
