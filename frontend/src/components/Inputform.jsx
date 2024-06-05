import React from 'react'
import '../styles/Inputform.css'

function Inputform() {
  return (
    <div className='inputForm'>
        <form>
            <input type='text' placeholder='Type a message' />
            <button type='submit'><img src="/assets/sendIcon.png" /></button>
        </form>
    </div>
  )
}

export default Inputform