import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './components/App.jsx';
import Login from './components/Login.jsx';

const Root = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') || false);
  const [userData, setUserData] = useState(localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : JSON.stringify({}));
  
  useEffect(()=>{
    localStorage.setItem('isLoggedIn', isLoggedIn);
  },[isLoggedIn])

  return (
    <BrowserRouter>
      <React.StrictMode>
        <Routes>
          <Route path="/" element={localStorage.getItem('isLoggedIn') ? <App userData={userData}/> : <Login setIsLoggedIn={setIsLoggedIn} setUserData={setUserData}/>} />
        </Routes>
      </React.StrictMode>
    </BrowserRouter>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<Root />);
