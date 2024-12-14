import React from 'react';
import './SidePanel.css'; // Style this component separately
import logo from '../../assets/simz.png';
import { Link,useLocation,useNavigate } from 'react-router-dom';

const SidePanel = ({ isVisible, togglePanel }) => {
  return (
    <div className={`side-panel ${isVisible ? 'visible' : ''}`}>
      <button className="close-button" onClick={togglePanel}>
        Close
      </button>
      <img className='logo' src={logo} alt="" />
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">Student Details</a></li>
        <li><Link to='/allstudents'>all Students</Link></li>
        <li><a href="#services">Notifications</a></li>
      </ul>
    </div>
  );
};

export default SidePanel;
