import React from 'react'
import './Cards.css'
function Cards({className,title,icon,number,doodle}) {
  return (
    <div className={`component ${className}`}>
        <h1 className='title'>{title}</h1>
        <div className='icon-number'>
            <div className='icon'>{icon}</div>
            <p className='number'>{number}</p>
        </div>
        <div className='doodle'>{doodle}</div>
    </div>
  )
}

export default Cards
