import React from 'react';
import './SidePanel.css'; // Style this component separately
import logo from '../../assets/simz.png';
import backbutton from '../../assets/NavArrow.svg'
import { Link,useLocation,useNavigate } from 'react-router-dom';

const SidePanel = ({ isVisible, togglePanel }) => {
  return (
    <div className={`side-panel ${isVisible ? 'visible' : ''}`}>
      <button className="close-button" onClick={togglePanel}>
        <img src={backbutton} alt="" />
      </button>
      <img className='logo' src={logo} alt="" />
      <ul>
        <li><a href="#home">Home</a></li>
        <li><Link to='/allstudents'>Student Details</Link></li>
        <li><a href="#services">Notifications</a></li>
      </ul>
    </div>
  );
};

export default SidePanel;