import React from 'react';
import './css/footer.css'
import ig from './instagram.png'
import fb from './facebook.png'

export default function Footer(){
  const token = sessionStorage.getItem("token");
  if (window.location.pathname === '/upload') return null;
  if (window.location.pathname === '/post') return null;
  if (window.location.pathname === "/login") return null;
  if (window.location.pathname === "/admin/dashboard") return null;
  if (!token || token) {
    return(
        <div className='footer'>
          <div className='social'>
            <h2>
                social media
            </h2>
            <ul>
                <a href="https://www.instagram.com/mani_bmautosalesltd/"><img src={ig} alt="Instagram"/></a>
                {/* <a href="https://www.facebook.com/DDAUTOJA/"><img src={fb} alt="Facebook"/></a> */}
            </ul>
          </div>
          <div className='contact'>
            <h2>
              contact
            </h2>
            <a href="tel:+18764095409">
  <h3>(876)409-5409</h3>
</a>
<a href="tel:+1876417-0058">
  <h3>(876)417-0058</h3>
</a>
<a href="mailto:">
  <h3>email here</h3>
</a>
          </div>
        </div>
    )
  }
}
