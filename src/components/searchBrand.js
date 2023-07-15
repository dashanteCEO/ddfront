import React, {useEffect, useState } from 'react';
import './css/vehicles.css'
import { Link} from 'react-router-dom'
import { useParams } from 'react-router-dom'; 


export default function SearchBrand(){

  const [vehicles, setVehicles] = useState([])
  const [length, setLength] = useState(null)

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);  
  
  let { brand } = useParams();

  useEffect(() => {
    const fetchVehicles = async () => {
        try {
            const response = await fetch(`https://ddbackend-hctu.onrender.com/api/post/searchretbrand/${brand}?page=${currentPage}`)
            const data = await response.json();
            if (response.ok) {
              setVehicles(data.urls);
              setLength(data.length);
              setTotalPages(data.totalPages);
              console.log(data.urls)
            }
            console.log(data)
          } catch (error) {
            console.error(error);
          }
    }
    fetchVehicles();
  },[brand, currentPage])
 
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
 
  return(
    <div className='vehicles'>
      <div className='head'>
        <a href='/'>home</a>
        <h2>{length} Vehicles</h2>
      </div>
      <div>
        <div className='cards'>
      {
        vehicles.map((item, index)=>{
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
