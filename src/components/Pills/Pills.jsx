import React from 'react'
import './Pills.css'


function Pills({ bgColor,image,title, buttonLabel, onButtonClick ,buttonColor,buttonTextColor}) {
  return (
    <div className='Pill' style={{ backgroundColor: bgColor }}>
      <img src={image} alt="" />
      <h1 className='pillTitle'>{title}</h1>
      <button onClick={onButtonClick} className='pillButton' style={{ backgroundColor: buttonColor,color:buttonTextColor }}>{buttonLabel}</button>
    </div>
  )
}

export default Pills
