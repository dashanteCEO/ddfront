import React, {useEffect, useState } from 'react';
import './css/vehicles.css'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'; 

export default function VehicleType(){

  const [vehicles, setVehicles] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);  
  const [isLoading, setIsLoading] = useState(false)

  let { bodyType } = useParams();

  useEffect(() => {
    const fetchVehicles = async () => {
      try {         setIsLoading(true)
        const response = await fetch(`https://ddbackend-hctu.onrender.com/api/post/vehicles/${bodyType}?page=${currentPage}`)
            const data = await response.json();
            if (response.ok) {
              setVehicles(data);
              setTotalPages(data.totalPages);
            }            setIsLoading(false)

          } catch (error) {
            console.error(error);
          }
    }
    fetchVehicles();
  },[bodyType,currentPage])
 
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return(
    <div className='vehicles'>
      <div className='head'>
        <a href='/'>home</a>
      </div>
        <h1 style={{
  borderRadius: '10px',
  background: '#fff',
  margin: 'auto',
  marginTop: 95,
  display: isLoading || vehicles.length >= 1 ? 'none' : 'flex',
  textAlign: 'center'
}}>Loading...</h1>

          <h1 style={{
            borderRadius: '10px',
            background: '#fff',
            margin: 'auto',
            marginTop:95,
            display: vehicles.length === 0 ? 'flex' : 'none',
            textAlign:'center',
          }}>No "{bodyType}s" avalible</h1>
            <div>
        <div className='cards'>
      {
        vehicles.map(item=>{
          return(
            <div className='card' href='/' key={item.url}>
            <img src={item.url} alt={item.url} />
            <flex>
              <h3>{item.brand}</h3>
              <h3 className='model'>{item.model}</h3>
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
              <p className='model'>{item.bodyType}</p>
            </flex>
            <Link to={`/vehicle/${item.groupId}`}>view</Link>
          </div>
          )
        })
      }
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
)}
