import React from 'react'
import './AddButton.css'
import addicon from '../../assets/addicon.svg'

function AddButton({title}) {
  return (
    <button className='addButton'>
        {title}<img src={addicon} alt="" />
    </button>
  )
}

export default AddButton
