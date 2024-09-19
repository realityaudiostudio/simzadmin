import React from 'react'
import './Header.css'
import navArrow from '../../assets/NavArrow.svg'
import profilePhoto from '../../assets/person.png'
import { NavLink } from 'react-router-dom'

function Header({title}) {
  return (
    <div className='header'>
        <NavLink to="../"><img src={navArrow} alt="" /></NavLink>
        <h1 className='header-title'>{title}</h1>
        <img src={profilePhoto} alt="profile" />
    </div>
  )
}

export default Header
