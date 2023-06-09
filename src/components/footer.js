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
                <a href="/"><img src={ig} alt="Instagram"/></a>
                <a href="/"><img src={fb} alt="Facebook"/></a>
            </ul>
          </div>
          <div className='contact'>
            <h2>
              contact
            </h2>
            <a href="tel:+18768271913">
  <h3>(876)827-1913</h3>
</a>
<a href="tel:+18764424836">
  <h3>(876)442-4836</h3>
</a>
<a href="mailto:ddautoja@gmail.com">
  <h3>ddautoja@gmail.com</h3>
</a>
          </div>
        </div>
    )
  }
}
