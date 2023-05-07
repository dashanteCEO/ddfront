import React, {useState, useEffect} from 'react';
import './css/header.css'

export default function Header(){
  const token = localStorage.getItem("token");
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    const fetchVehicles = async () => {
        try {
            const response = await fetch(`https://ddauto.up.railway.app/api/post/search/${query}`);
            const json = await response.json();
            setResults(json.urls)
            setLoading(false)
        } catch (e) {
            console.log(e);
        }
    };
    fetchVehicles();
}, [query]);


// const burger = document.querySelector('.burger');
// const draw = document.querySelector('.draw');

// burger.addEventListener('click', () => {
//   draw.style.display = 'flex';
// });


// draw.addEventListener('click', () => {
//   draw.style.display = 'none';
// });


const handleSearch = (event) => {
  setQuery(event.target.value);
};
  if (window.location.pathname === "/login") return null;
  if (!token || token) {
    return(
        <div className='header'>
          <a href='/'>
            {/* <h2>D&D Auto Sales</h2> */}
            <img src='https://cdn2.jacars.net/media/cache/2a/c4/2ac4835452665b29787730c7d44d3ff0.jpg' alt="logo" />
          </a>
          <input placeholder='Search for a vehicle' onChange={handleSearch} />
          <ul>
            <a href="/vehicles">vehicles</a>
            <a href="/">location</a>
            {/* <a href="/">sale options</a> */}
          </ul>
          <div className="burger">
          <div className="b"/>
          <div className="b"/>
          <div className="b"/>
          </div>

          <div className='queryHolder' style={{
              width: '39.5%',
              borderRadius: '5px',
              background: '#fff',
              position: 'absolute',
              padding: '15px',
              top: 0,
              marginTop: '5rem',
              marginLeft: '25%',
              boxShadow: 'rgba(99, 99, 99, .5) 0px 2px 8px 0px',
              display: query === '' ? 'none' : 'flex',
              zIndex:2
          }}>
          {loading && <p></p>}
      {results.length > 0 ? (
        <ul>
          {results.map(result => (
            <li key={result.id}>{result.brand} {result.model}</li>
          ))}
        </ul>
      ) : (
        <p>No results found.</p>
      )}
          </div>
          <div className='draw'>
            <flex>

          <input placeholder='Search for a vehicle' onChange={handleSearch} className='input'/>
          <div className="close">
          X
          </div>
            </flex>
          <ul className='ul'>
            <a href="/vehicles">vehicles</a>
            <a href="/">location</a>
            <a href="/">sale options</a>
          </ul>

          <div className='queryHolder2' style={{
              width: '60%',
              borderRadius: '10px',
              background: '#fff',
              position: 'absolute',
              padding: '15px',
              top: 0,
              marginTop: '5rem',
              marginLeft: '3rem',
              boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
              display: query === '' ? 'none' : 'flex'
          }}>
          {loading && <p>Loading results...</p>}
      {results.length > 0 ? (
        <ul>
          {results.map(result => (
            <li key={result.id}>{result.brand} {result.model}</li>
          ))}
        </ul>
      ) : (
        <p>No results found.</p>
      )}
        </div>
        </div>
      </div>
    )
  }
}