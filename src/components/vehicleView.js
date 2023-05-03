import React, {useState, useEffect} from 'react';
import './css/vehicleView.css'
import { useParams } from 'react-router-dom'; 

export default function VehicleView(){    
  const [previewImages, setPreviewImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
   
  const handlePrev = () => {
    setCurrentIndex(currentIndex === 0 ? previewImages.length - 1 : currentIndex - 1);
  };

  const handleNext = () => {
    setCurrentIndex(currentIndex === previewImages.length - 1 ? 0 : currentIndex + 1);
  };

  let { groupId } = useParams();
  const [brand, setBrand] = useState(null)
  const [year, setYear] = useState(null)
  const [color, setColor] = useState(null)
  const [bodyType, setBodyType] = useState(null)
  const [specs, setSpecs] = useState(null)
  const [model, setModel] = useState(null)
  const [seats, setSeats] = useState(null)
  const [mileage, setMileage] = useState(null)
  const [feul, setFeul] = useState(null)
  const [transmission, setTransmission] = useState(null)
  const [steering, setSteering] = useState(null)
  const [price, setPrice] = useState(null)
  const [trim, setTrim] = useState(null)

  useEffect(() => {
    const fetchImages = async () => {
        try {
            const response = await fetch(`https://ddauto.up.railway.app/api/post/all/${groupId}`);
            const data = await response.json();
            if (response.ok) {
              setPreviewImages(data.urls);
              const fixed = data.urls
              setBrand(fixed.brand)
              setYear(fixed.year)
              setModel(fixed.model)
              setBodyType(fixed.bodyType)
              setSpecs(fixed.specs)
              setColor(fixed.color)
              setPrice(fixed.price)
              setSteering(fixed.steering)
              setSeats(fixed.seats)
              setFeul(fixed.feul)
              setTransmission(fixed.transmission)
              setTrim(fixed.trim)
              setMileage(fixed.trim)
              console.log(fixed)
            } else {
              console.error("Error fetching files:", data);
            }
          } catch (error) {
            console.error("Error fetching files:", error);
          }
    };
    fetchImages();
  }, [])

  
    return(
<div>
    <div className='flex'>
    <div className='flex'>
            <div className="image-slider-container">
              <div className="image-slider">
                <img src={previewImages[currentIndex]?.url} alt="Preview" className="image-preview" />
                <button onClick={handlePrev} className="slider-arrow slider-arrow-left">&larr;</button>
                <button onClick={handleNext} className="slider-arrow slider-arrow-right">&rarr;</button>
              </div>
            </div>
            </div>
            <div className='docs'>
              <h2>Vehicle Information</h2>
              <form>
                <view>
              <flex>
                 <info>
                  <h3>brand</h3>
                  <h3>{brand}</h3>
                 </info>
                <input placeholder='Model'value={model} onChange={(event) => setModel(event.target.value)} />
                <input placeholder='Year' type={'number'} value={year} onChange={(event) => setYear(event.target.value)} />
                <input placeholder='Body Type' value={bodyType} onChange={(event) => setBodyType(event.target.value)} />
                <input placeholder='Color' value={color} onChange={(event) => setColor(event.target.value)} />
              </flex>
              <flex>
                <input placeholder='Mileage' value={mileage} onChange={(event) => setMileage(event.target.value)} />
                <input placeholder='Steering'value={steering} onChange={(event) => setSteering(event.target.value)} />
                <input placeholder='Feul' value={feul} onChange={(event) => setFeul(event.target.value)} />
                <input placeholder='Transmission' value={transmission} onChange={(event) => setTransmission(event.target.value)} />
                <input placeholder='Seats' value={seats} type='number' onChange={(event) => setSeats(event.target.value)} />
              </flex>
              </view>
              <textarea placeholder='Specifications' value={specs} onChange={(event) => setSpecs(event.target.value)} />
              </form>
            </div>
            </div>
      </div>
        )}