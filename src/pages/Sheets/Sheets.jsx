import React from 'react'
import Header from '../../components/Header/Header'
import sheets from '../../assets/sheets.svg'
import Pills from '../../components/Pills/Pills';
import AddButton from '../../components/AddButton/AddButton';
import './sheets.css'

function Sheets() {
  const handleClick = () => {
    alert('Button clicked on Page 1!');
  };

  return (
    <div className='sheet'>
      <Header title={"Sheets"}/>
      <h1 className='sheetTitle'>Keyboard Lessons</h1>
      <div className='Pills'>
        <Pills image={sheets} title="Page 1 Title" buttonLabel="Download" onButtonClick={handleClick} bgColor="#FEE2E4" buttonColor="#FBA6AC" buttonTextColor="#450A0E"/>
        <Pills image={sheets} title="Page 1 Title" buttonLabel="Download" onButtonClick={handleClick} bgColor="#FEE2E4" buttonColor="#FBA6AC" buttonTextColor="#450A0E"/>
      </div>
      <div className='addButtond'>
        <AddButton title="Add lessons"/>
      </div>
    </div>
  )
}

export default Sheets
