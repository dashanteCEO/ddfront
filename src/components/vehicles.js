import React, { useEffect, useState } from "react";
import "./css/vehicles.css";
import { Link } from "react-router-dom";

export default function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);  
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchVehicles = async () => {
      try {         setIsLoading(true)

        const response = await fetch(
          `https://ddauto.up.railway.app/api/post/test?page=${currentPage}`
        );
        const data = await response.json();
        if (response.ok) {
          setVehicles(data.urls);
          setTotalPages(data.totalPages);
        } else {
          console.error("Error fetching files:", data);
        }            setIsLoading(false)

      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };
    fetchVehicles();
  }, [currentPage]);
  

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="vehicles">
      <div className="head">
        <a href="/">home</a>
      </div>
      <h1 style={{
            // width: '100%',
            borderRadius: '10px',
            background: '#fff',
            margin: 'auto',
            marginTop:95,
            // position: 'absolute',
            // padding: '15px',
            // top: 0,
            display: isLoading ? 'flex' : 'none',
          }}>Loading...</h1>
      <div>
        <div className="cards">
          {vehicles.map((item, index) => {
            return (
              <div className="card" key={index}>
              <img src={item.url} alt={item.url} />
                <flex>
                  <h3>{item.brand}</h3>
                  <h3 className="model">{item.model}</h3>
                </flex>
                <p>{item.trim}</p>
                <flex>
                  <p>${item.price}</p>
                  <t />
                  <p>{item.year}</p>
                </flex>
                <flex>
                  <p>{item.transmission}</p>
                  <t />
                  <p className="model">{item.bodyType}</p>
                </flex>
                <Link to={`/vehicle/${item.groupId}`}>view</Link>
              </div>
            );
          })}
        </div>
      </div>
      <div className="pages">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              disabled={page === currentPage}
            >
              {page}
            </button>
          )
        )}
      </div>
    </div>
  );
}
