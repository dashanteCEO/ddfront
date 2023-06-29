import React,{ useState, useEffect } from 'react';
import './css/home.css'
import { Link } from 'react-router-dom';

export default function Home(){
   const [vehicles, setVehicles] = useState([])
  useEffect(() => {
    const fetchVehicles = async () => {
        try {
            const response = await fetch(`https://ddauto.up.railway.app/api/post/featured`);
            const data = await response.json();
            if (response.ok) {
              setVehicles(data.urls);
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
    <div className='home'>
       <div className='hero'>
        <h2>
           500+
           <br/>
           Vehicles
        </h2>
        <div className='icons'>
        <a href='/vehiclestype/sedan'>sedans</a>
        <a href='/vehiclestype/hatchback'>hatchbacks</a>
        <a href='/vehiclestype/suv'>suvs</a>
        <a href='/vehiclestype/van'>vans</a>
        <a href='/vehiclestype/truck'>trucks</a>
        <a href='/vehiclestype/mini-van'>mini-vans</a> 
        </div>
        <h2 className='h2'>
           new stock 
           <br/>
           every week!
        </h2>
       </div>
       <div className='featured'>
         <h2>featured items</h2>
         <div className='featuredVehicles'>
            {
               vehicles.map(featured=>{
                  return(
                     <div className='card' href="/">
                        <img src={featured.url} alt={featured.url} />
                        <flex> 
            <h3>{featured.brand}</h3>
            <h3 className='model'>{featured.model}</h3>
            </flex>
            <p>{featured.trim}</p>
            <flex>
            <p>${featured.price}</p>
            <t/>
            <p>{featured.year}</p>
            </flex>
            <flex>
            <p>{featured.transmission}</p>
            <t/>
            <p className='model'>{featured.bodyType}</p>
            </flex>
            <Link to={`/vehicle/${featured.groupId}`}>view</Link>
                     </div>
                  )
               })
            }
         </div>
       <a href='/vehicles' className='a'>View More</a>
       </div>
    </div>
)}