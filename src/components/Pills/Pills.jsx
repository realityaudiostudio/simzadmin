import React from 'react'
import './Pills.css'


function Pills({ image,title, buttonLabel, onButtonClick }) {
  return (
    <div className='Pill'>
      <img src={image} alt="" />
      <h1 className='pillTitle'>{title}</h1>
      <button onClick={onButtonClick} className='pillButton'>{buttonLabel}</button>
    </div>
  )
}

export default Pills
