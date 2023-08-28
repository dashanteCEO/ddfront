import React, { useState, useEffect } from "react";
import "./css/header.css";

export default function Header() {
  const token = localStorage.getItem("token");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchVehicles = async () => {
      if (!query.trim()) return;
      try {
        const response = await fetch(
          `https://ddbackend-hctu.onrender.com/api/post/search/${query}`
        );
        const json = await response.json();
        setResults(json.urls);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    fetchVehicles();
  }, [query]);

  const handleBurgerClick = () => {
    const draw = document.querySelector(".draw");
    draw.style.display = "flex";
  };

  const handleDrawClick = () => {
    const draw = document.querySelector(".draw");
    draw.style.display = "none";
  };

  const handleSearch = (event) => {
    setQuery(event.target.value);
  };
  

  if (window.location.pathname === "/login") return null;
  if (!token || token) {
    return (
      <div className="header">
        <a href="/" className="logo">
          {/* <img
            src="https://cdn2.jacars.net/media/cache/2a/c4/2ac4835452665b29787730c7d44d3ff0.jpg"
            alt="logo"
          /> */}
          <h2>MOTOR WIZZ</h2>
        </a>
        <input
          placeholder="Search for a vehicle by brand"
          onChange={handleSearch}
        />
        <ul>
          <a href="/vehicles">vehicles</a>
          <a href="/location">location</a>
          {/* <a href="/">sale options</a> */}
        </ul>
        <div className="burger" onClick={handleBurgerClick}>
          <div className="b" />
          <div className="b" />
          <div className="b" />
        </div>

        <div
          className="queryHolder"
          style={{
            width: "39.8%",
            borderRadius: "5px",
            background: "#fff",
            position: "absolute",
            padding: "15px",
            top: 0,
            marginTop: "4.5rem",
            marginLeft: "29.7%",
            boxShadow: "rgba(99, 99, 99, .3) 0px 2px 8px 0px",
            display: query === "" ? "none" : "flex",
            zIndex: 2,
            alignItems: "left",
            justifyContent: "start",
          }}
        >
          {loading && <p></p>}
          {results.length > 0 ? (
            <ul>
              {results.map((result) => (
                <a href={`/search/${result.brand}`} key={result.id}>
                  <li>{result.brand}</li>
                </a>
              ))}
            </ul>
          ) : (
            <p>No results found.</p>
          )}
        </div>
        <div className="draw" onClick={handleDrawClick}>
          <div className="flex">
            <div className="close">X</div>
          </div>
          <ul className="ul">
              <a href="/vehicles">vehicles</a>
              <a href="/">location</a>
              <a href="/">sale options</a>
          </ul>
        </div>
      </div>
    );
  }
}
