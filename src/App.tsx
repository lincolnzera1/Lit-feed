import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { GlobalStyle } from './Globaltheme';
import Cadastro from './pages/Cadastro/Cadastro';
import Feed from './pages/Feed/Feed';
import Login from './pages/Login/login';

const App = () => {
  return (
    <div>
      <GlobalStyle />
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/cadastro' element={<Cadastro />} />
            <Route path='/feed' element={<Feed />} />
          </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App