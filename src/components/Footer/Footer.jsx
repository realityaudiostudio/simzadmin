import React from 'react';
import './Footer.css';
import icon from '../../assets/simz.png'

function Footer() {
  return (
    <div className='footer'>
    <h3 className='logotext'><img className='footer-logo' src={icon} alt="" /><span>Simz</span>Academy</h3>
      <h4 className='version-dev'>v1.0 2024 <br />Developed By Team AJS Web Creatives</h4>
    </div>
  )
}

export default Footer
