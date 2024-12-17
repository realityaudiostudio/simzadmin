import React from 'react'
import NavButton from "../../assets/NavButton.svg"
import SidePanel from '../SidePanel/SidePanel';
import { useEffect, useState } from "react";
import "./NavigationButton.css";


  
function NavigationButton() {
  const [isPanelVisible, setIsPanelVisible] = useState(false);
  
  const togglePanel = () => {
    setIsPanelVisible(!isPanelVisible);
  };
  return (
    <div className='NavButton'>
        <img className='Navbutton' src={NavButton} alt="" onClick={togglePanel}  />
        <SidePanel isVisible={isPanelVisible} togglePanel={togglePanel}/>
    </div>
  )
}

export default NavigationButton
