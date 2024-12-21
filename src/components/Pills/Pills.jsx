import React from 'react'
import './Pills.css'


function Pills({ bgColor,image,title, buttonLabel, onButtonClick ,buttonColor,buttonTextColor,buttonIcon,titleColor}) {
  return (
    <div className='Pill' style={{ backgroundColor: bgColor }}>
      <div className='iconTitle'>
        <img src={image} alt="" />
      <h1 className='pillTitle' style={{ color: titleColor }}>{title}</h1>
      </div>
      
      <button onClick={onButtonClick} className='pillButton' style={{ backgroundColor: buttonColor,color:buttonTextColor }}>{buttonLabel}<img src={buttonIcon} alt="" /></button>
    </div>
  )
}

export default Pills
