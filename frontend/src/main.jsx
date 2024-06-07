import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import App from './components/App.jsx'
import Login from './components/Login.jsx'

const [isLoggedIn, setIsLoggedIn] = React.useState(false);

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <React.StrictMode>
      <Routes>
        <Route path="/" element={isLoggedIn ? <App /> : <Login setIsLoggedIn={setIsLoggedIn}/>} />
      </Routes>
    </React.StrictMode>
  </BrowserRouter >
)
