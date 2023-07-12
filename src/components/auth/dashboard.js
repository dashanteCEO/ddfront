import React, { useState, useEffect } from "react";
import axios from "axios";
import "./dashboard.css";

function Dashboard() {
  const [vehicles, setVehicles] = useState([])
  
  const [selectedGroup, setSelectedGroup] = useState(null);

  useEffect(() => {
    const fetchVehicles = async () => {
        try {
            const response = await fetch(`https://ddbackend-hctu.onrender.com/api/post/test`);
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

  useEffect(() => {
    if (selectedGroup) {
      axios
        .delete(`https://ddbackend-hctu.onrender.com/api/post/delete/${selectedGroup}`)
        .then((res) => {
          console.log(res.data);
          alert('Vehicle deleted!')
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [selectedGroup]);

      const handleDelete = (groupId) => {
        setSelectedGroup(groupId);
      };
    
      const token = sessionStorage.getItem('token')
      if (!token) return null;

  if (token) {
    return (
    <div className="dashboard">
    <div className="header" >
      <h2>Dashboard</h2>
      <a
  href="/post"
  style={{
    textDecoration: 'none',
    textTransform: 'capitalize',
    padding: '6px',
    background: '#00c3ff',
    color: '#fff',
    fontWeight: '600',
    borderRadius: '4px',
    transition: 'all .4s ease',
    textAlign: 'center'
  }}
>
  Post
</a>

    </div>
    <div className='cardss'>
      {
        vehicles.map(item=>{
          return(
            <div 
            // to={`/vehicle/${item.groupId}`}
             key={item.groupId} className='card'>
            <img src={item.url} alt={item.url} />
            <p>{item.brand}</p>
            <p className='model'>{item.model}</p>
            <p>{item.trim}</p>
            <p>{item.bodyType}</p>
            <p>{item.transmission}</p>
            <p>${item.price}</p>
            <button className="p" onClick={() => handleDelete(item.groupId)}>delete</button>
          </div>
          )
        })
      }
      </div>
    </div>
  );
}
}

export default Dashboard;