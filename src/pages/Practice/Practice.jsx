import React from 'react'
import Header from '../../components/Header/Header'
import Pills from '../../components/Pills/Pills'
import sheets from '../../assets/sheets.svg'
import AddButton from '../../components/AddButton/AddButton';
import './Practice.css'
import musicicon from '../../assets/musicicon.svg'


function Practice() {

  const handleClick = () => {
    alert('Button clicked on Page 1!');
  };

  return (
    <div className='practice'>
      <Header title={"Practice"}/>
      <h1 className='practiceTitle'>Keyboard Lessons</h1>
      <div className='Pills'>
        <Pills image={sheets} title="Page 1 Title"  onButtonClick={handleClick} bgColor="#C4DCF3"  titleColor="#1B3C5F" buttonColor="transparent" buttonIcon={musicicon}/>
      </div>
      <div className='addButtond'>
        <AddButton title="Add Lessons"/>
      </div>
      
    </div>
  )
}

export default Practice
