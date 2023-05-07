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
              setBrand(fixed[1].brand);
              setYear(fixed[1].year);
              setModel(fixed[1].model);
              setBodyType(fixed[1].bodyType);
              setSpecs(fixed[1].specs);
              setColor(fixed[1].color);
              setPrice(fixed[1].price);
              setSteering(fixed[1].steering);
              setSeats(fixed[1].seats);
              setFeul(fixed[1].feul);
              setTransmission(fixed[1].transmission);
              setTrim(fixed[1].trim);
              setMileage(fixed[1].mileage);

              // console.log(fixed)
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
            <div className="image-slider-container">
              <div className="image-slider">
          <img
            src={previewImages[currentIndex]?.url}
            alt="Preview"
            className="image-preview"
            />
                <button onClick={handlePrev} className="slider-arrow slider-arrow-left">&larr;</button>
                <button onClick={handleNext} className="slider-arrow slider-arrow-right">&rarr;</button>
              </div>
            </div>
            <div className='docs2'>
              <h2>Vehicle Information</h2>
              <form>
                <view>
              <flex>
                 <info>
                  <h3>Make: </h3>
                  <h3>{brand}</h3>
                 </info>
                 <info>
                  <h3>trim: </h3>
                  <h3>{trim}</h3>
                 </info>
                 <info>
                  <h3>year: </h3>
                  <h3>{year}</h3>
                 </info>
                 <info>
                  <h3>mileage: </h3>
                  <h3>{mileage}</h3>
                 </info>
                 <info>
                  <h3>body: </h3>
                  <h3>{bodyType}</h3>
                 </info>            
                  <info>
                  <h3>color: </h3>
                  <h3>{color}</h3>
                 </info>
              </flex>
              <flex>
              <info>
                  <h3>model: </h3>
                  <h3>{model}</h3>
                 </info>
                 <info>
                  <h3>steering: </h3>
                  <h3>{steering}</h3>
                 </info>
                 <info>
                  <h3>fuel: </h3>
                  <h3>{feul}</h3>
                 </info>
                 <info>
                  <h3>transmission: </h3>
                  <h3>{transmission}</h3>
                 </info>
                 <info>
                  <h3>seats: </h3>
                  <h3>{seats}</h3>
                 </info>
                 <info>
                  <h3>price: </h3>
                  <h3> {price}</h3>
                 </info>
              </flex>
              </view>
              <drill>
                  <h3>Specifications</h3>
                  <h3>{specs}</h3>
                 </drill>
              </form>
            </div>
            </div>
      </div>
        )}