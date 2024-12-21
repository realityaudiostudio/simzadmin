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
        <li><Link to='/dashboard'>Home</Link></li>
        <li><Link to='/allstudents'>Student Details</Link></li>
        <li><Link to='/allattendance'>Attendance Details</Link></li>
        <li><Link to='/feedetails'>Fee Details</Link></li>
        <li><a href="#services">Notifications</a></li>
      </ul>
    </div>
  );
};

export default SidePanel;
