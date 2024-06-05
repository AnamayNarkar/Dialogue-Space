import React from 'react'
import '../styles/Chatheader.css'

function Chatheader(props) {
  return (
    <div className='chatHeader'>
        <img src="/assets/defaultProfileIcon.png" />
        <h4>{props.openChat}</h4>
    </div>
  )
}

export default Chatheader;