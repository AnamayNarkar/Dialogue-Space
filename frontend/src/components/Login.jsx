import React from 'react'
import '../styles/Login.css'
import Loginbox from './Loginbox.jsx'

function Login(props) {
  return (
    <div className='loginShell'>
        <Loginbox setIsLoggedIn={props.setIsLoggedIn} setUserData={props.setUserData}/>
    </div>
  )
}
export default Login