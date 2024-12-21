import React from 'react'
import Header from '../../components/Header/Header'
import Pills from '../../components/Pills/Pills'
import keyboardillus from '../../assets/keyboardillus.svg'
import AddButton from '../../components/AddButton/AddButton';
import './Quiz.css'


function Quiz() {

  const handleClick = () => {
    alert('Button clicked on Page 1!');
  };

  return (
    <div className='quiz'>
      <Header title={"Quiz"}/>
      <h1 className='quizTitle'>Check your brains</h1>
      <div className='Pills'>
        <Pills image={keyboardillus} title="Page 1 Title" buttonLabel="Join" onButtonClick={handleClick}/>
        <Pills image={keyboardillus} title="Page 1 Title" buttonLabel="Join" onButtonClick={handleClick}/>
      </div>
      <div className='addButtond'>
        <AddButton title="Add Quiz"/>
      </div>
      
    </div>
  )
}

export default Quiz
