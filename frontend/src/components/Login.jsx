import React from 'react'
import '../styles/Login.css'
import Loginbox from './Loginbox.jsx'

function Login(props) {
  return (
    <div className='loginShell'>
        <Loginbox setIsLoggedIn={props.setIsLoggedIn}/>
    </div>
  )
}
export default Login