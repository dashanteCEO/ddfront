import React, {useEffect, useState } from 'react';
import './css/vehicles.css'
import { Link } from 'react-router-dom'

export default function Vehicles(){

  const [vehicles, setVehicles] = useState([])
  const [length, setLength] = useState(null)
  useEffect(() => {
    const fetchVehicles = async () => {
        try {
            const response = await fetch(`https://ddauto.up.railway.app/api/post/test`);
            const data = await response.json();
            if (response.ok) {
              setVehicles(data.urls);
              setLength(vehicles.length);
            } else {
              console.error("Error fetching files:", data);
            }
          } catch (error) {
            console.error("Error fetching files:", error);
          }
    };
    fetchVehicles();
  }, [])

  return(
    <div className='vehicles'>
      <div className='head'>
        <a href='/'>home</a>
        <h2>{length} Vehicles</h2>
      </div>
      <div>
        <div className='cards'>
      {
        vehicles.map(item=>{
          return(
            <Link to={`/vehicle/${item.groupId}`} key={item.groupId} className='card'>
            <img src={item.url} alt={item.url} />
            <flex> 
            <h3>{item.brand}</h3>
            <h3 className='model'>{item.model}</h3>
            </flex>
            <p>${item.price}</p>
            <p>{item.transmission}</p>
            <p>{item.bodyType}</p>
          </Link>
          )
        })
      }
      </div>
</div>
</div>
)}
