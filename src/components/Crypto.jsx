import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import Loader from "./Loader";
import { ThemeContext } from "./ThemeContext";
import "./Crypto.css";

const Crypto = () => {
  const [search, setSearch] = useState("");
  const [cryptos, setCryptos] = useState([]);
  const searchDebouncedValue = useDebounce(search, 500);
  const endpoint = "https://api.coingecko.com/api/v3/coins";
  const { darkMode } = useContext(ThemeContext);

  const showData = () => {
    axios.get(endpoint).then((res) => {
      setCryptos(res.data);
    });
  };

  useEffect(() => {
    showData();
  }, []);

  const searcher = (e) => {
    setSearch(e.target.value);
  };

  const results = !searchDebouncedValue
    ? cryptos
    : cryptos.filter((val) =>
        val.name.toLowerCase().includes(searchDebouncedValue.toLowerCase())
      );

  return (
    <>
      <input
        type="text"
        value={search}
        onChange={searcher}
        placeholder="Search..."
        className="form-control"
      />

      <table
        className={
          darkMode
            ? "table table-dark table-hover mt-3"
            : "table table-light table-hover mt-3"
        }
      >
        <thead>
          <tr>
            <th>Ranking</th>
            <th>Name</th>
            <th>Symbol</th>
            <th>Price (USD)</th>
            <th>Price 24h</th>
          </tr>
        </thead>
        <tbody>
          {results.length > 0 ? (
            results.map((result) => (
              <tr key={result.id}>
                <td>{result.market_data.market_cap_rank}</td>
                <td>
                  <img src={result.image.thumb} alt={result.name} />{" "}
                  {result.name}
                </td>
                <td>{result.symbol.toUpperCase()}</td>
                <td>{result.market_data.current_price.bmd.toFixed(2)}</td>
                <td>
                  {result.market_data.price_change_percentage_24h < 0 ? (
                    <span className="badge bg-danger">
                      {result.market_data.price_change_percentage_24h}
                    </span>
                  ) : (
                    <span className="badge bg-success">
                      {result.market_data.price_change_percentage_24h}
                    </span>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr className="text-center">
              <td colSpan="5" className="text-danger">
                {search ? "The crypto you entered was not found" : <Loader />}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default Crypto;
