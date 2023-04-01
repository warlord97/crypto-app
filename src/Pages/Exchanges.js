import React, { useEffect, useState } from "react";
import { server } from "../index";
import Loader from "./Loader";
import ExchangeCard from "./ExchangeCard";
import Error from "./Error";

function Exchanges() {
  const [exchangeData, setExchangeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchExchanges();
  }, []);

  async function fetchExchanges() {
    try {
      const response = await fetch(`${server}/exchanges`);
      const jsonData = await response.json();
      if(Array.isArray(jsonData)) {
        setExchangeData(jsonData);
      } else {
        throw new Error("Invalid data format");
      }
      setLoading(false);
    } catch (error) {
        setError(true);
        setLoading(false);
    }
  }
  

  if(error) return <Error message={"error while fetching exchanges"} />;

  return (
    <div className="exchange">
      {loading ? (
        <Loader />
      ) : (
        <>
          {exchangeData.map((i) => (
            <ExchangeCard
              key={i.id}
              title={i.name}
              logo={i.image}
              rank={i.trust_score_rank}
              url={i.url}
            />
          ))}
        </>
      )}
    </div>
  );
}

export default Exchanges;
