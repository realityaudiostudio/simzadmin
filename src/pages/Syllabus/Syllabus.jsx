import React from 'react'
import Header from '../../components/Header/Header'
import Pills from '../../components/Pills/Pills'
import keyboardillus from '../../assets/keyboardillus.svg'
import AddButton from '../../components/AddButton/AddButton';
import './Syllabus.css'
import getbutton from '../../assets/getbutton.svg'


function Syllabus() {

  const handleClick = () => {
    alert('Button clicked on Page 1!');
  };

  return (
    <div className='syllabus'>
      <Header title={"Syllabus"}/>
      <h1 className='syllabusTitle'>Keyboard Syllabus</h1>
      <div className='Pills'>
        <Pills image={keyboardillus} title="Page 1 Title"  onButtonClick={handleClick} bgColor="#C4DCF3"  titleColor="#1B3C5F" buttonColor="transparent" buttonIcon={getbutton}/>
      </div>
      <div className='addButtond'>
        <AddButton title="Add Syllabus"/>
      </div>
      
    </div>
  )
}

export default Syllabus
