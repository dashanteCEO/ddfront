import React, { useState } from 'react';
import axios from 'axios';
import './css/upload.css';
import { useNavigate } from "react-router-dom";


export default function Upload() {
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [year, setYear] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [mileage, setMileage] = useState('');
  const [specs, setSpecs] = useState('');
  const [color, setColor] = useState('');
  const [bodyType, setBodyType] = useState('');
  const [seats, setSeats] = useState('');
  const [feul, setFeul] = useState('');
  const [price, setPrice] = useState('');
  const [trim, setTrim] = useState('');
  const [steering, setSteering] = useState('');
  const [transmission, setTransmission] = useState('');
  const [currentImage, setCurrentImage] = useState(0);
  const navigate = useNavigate();

  const handleImageChange = (event) => {
    const files = event.target.files;
    const filesArray = Array.from(files);
    setImages(filesArray);
    setPreviewImages(filesArray.map(file => URL.createObjectURL(file)));
  }
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      formData.append("post", images[i]);
    formData.append("brand", brand);
    formData.append("model", model);
    formData.append("year", year);
    formData.append("color", color);
    formData.append("bodyType", bodyType);
    formData.append("specs", specs);
    formData.append("seats", seats);
    formData.append("feul", feul);
    formData.append("steering", steering);
    formData.append("mileage", mileage);
    formData.append("transmission", transmission);
    formData.append("price", price);
    formData.append("trim", trim);
    }
       await axios.post(
        "https://ddauto.up.railway.app/api/post/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Vehicle uploaded successfully");
      navigate("/admin/dashboard");
      // window.location.reload()
  };

  const handleNext = () => {
    setCurrentImage((currentImage + 1) % previewImages.length);
  }

  const handlePrev = () => {
    setCurrentImage(currentImage === 0 ? previewImages.length - 1 : currentImage - 1);
  }
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        {previewImages.length === 0 &&
          // Add the multiple attribute to the input element to allow multiple image selection
          <input type="file" name="images" accept="image/*" multiple onChange={handleImageChange} />
        }
        {previewImages.length > 0 &&
          <div className='flex'>
            <div className="image-slider-container">
              <div className="image-slider">
              <img src={previewImages[currentImage]} alt="Preview" className="image-preview" />
                <button onClick={handlePrev} className="slider-arrow slider-arrow-left">&larr;</button>
                <button onClick={handleNext} className="slider-arrow slider-arrow-right">&rarr;</button>
             </div>
             </div>
            <div className='docs'>
              <h2>Vehicle Information</h2>
              <form>
                <view>
                <flex>
                  <input placeholder='Make' name="brand" value={brand} onChange={(e) => setBrand(e.target.value)}required />
                  <input placeholder='Model' name='model' value={model} onChange={(e) => setModel(e.target.value)}/>
             <input placeholder='Year' name='year' type={'number'} value={year} onChange={(e) => setYear(e.target.value)}/>
                <input placeholder='Body Type' name='bodyType' value={bodyType} onChange={(e) => setBodyType(e.target.value)}/>
                <input placeholder='Color' name='color' value={color} onChange={(e) => setColor(e.target.value)}/>
                <input placeholder='Trim' name='trim' value={trim} onChange={(e) => setTrim(e.target.value)}/>
              </flex>
              <flex>
                <input placeholder='Mileage' name='mileage' type='number' value={mileage} onChange={(e) => setMileage(e.target.value)}/>
                <input placeholder='Steering' name='steering' value={steering} onChange={(e) => setSteering(e.target.value)}/>
                <input placeholder='Fuel' name='feul' value={feul} onChange={(e) => setFeul(e.target.value)}/>
                <input placeholder='Transmission' name='transmission' value={transmission} onChange={(e) => setTransmission(e.target.value)}/>
                <input placeholder='Seats' name='seats' value={seats} type='number' onChange={(e) => setSeats(e.target.value)}/>
              <input placeholder='Price' name='price' value={price} onChange={(e) => setPrice(e.target.value)}/>
              </flex>
              </view>
              <textarea placeholder='Specifications' name='specs' value={specs} onChange={(e) => setSpecs(e.target.value)} className='spc'/>
              </form>
              {previewImages.length > 0 &&
                <button type="submit" className='btn'>
                  Upload Vehicle
                </button>
              }
            </div>
          </div>
        }
      </form>
    </div>
  );
}

