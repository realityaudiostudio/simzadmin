import React from 'react'
import Header from '../../components/Header/Header'
import './Syllabus.css'
import piano from '../../assets/Keyboardlearning.png'

function Syllabus() {
  return (
    <div>
      <Header title={"Syllabus"}/>
      <h1 className='syllabus-heading'>Select Your Instrument</h1>
      <div className='syllabus-selector'>
        <div>
          <img className='syl-image' src={piano} alt="" />
          <h3>Keyboard</h3>
        </div>
        <div>
          <img className='syl-image' src={piano} alt="" />
          <h3>Keyboard</h3>
        </div>
        <div>
          <img className='syl-image' src={piano} alt="" />
          <h3>Keyboard</h3>
        </div>
      </div>
    </div>
  )
}

export default Syllabus
