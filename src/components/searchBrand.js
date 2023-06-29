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
            const response = await fetch(`https://ddauto.up.railway.app/api/post/searchretbrand/${brand}?page=${currentPage}`)
            const data = await response.json();
            if (response.ok) {
              setVehicles(data.urls);
              setLength(data.length);
              setTotalPages(data.totalPages);

            }
            console.log(data)
          } catch (error) {
            console.error(error);
          }
    }
    fetchVehicles();
  },[brand,currentPage])
 
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
        vehicles.map(item=>{
          return(
            <Link to={`/vehicle/${item.groupId}`} key={item.url} className='card'>
            <img src={item.url} alt={item.url} />
            <div className='flex'> 
            <h3>{item.brand}</h3>
            <h3 className='model'>{item.model}</h3>
            </div>
            <p>${item.price}</p>
            <p>{item.transmission}</p>
            <p>{item.bodyType}</p>
          </Link>
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
