import React from 'react'
import './Sections.css'
import { NavLink } from 'react-router-dom'
function Sections({icon,linkName,bgColor,link}) {
  const style = {
    backgroundColor: bgColor}
  return (
    <div className='link'>
        <NavLink to={link} className='section-icons' style={style}>{icon}</NavLink>
        <p>{linkName}</p>
    </div>
  )
}

export default Sections
