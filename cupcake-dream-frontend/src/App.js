import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './layout/Header';
import LandingPage from './components/LandingPage';
import Products from './pages/Products';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null); // Novo estado para armazenar informações do usuário

  const handleLogout = () => {
    setIsLoggedIn(false); // Atualiza o estado para deslogar
    setUserInfo(null); // Limpa as informações do usuário
  };

  const handleLogin = (status, user) => {
    setIsLoggedIn(status); // Atualiza o estado para logar
    setUserInfo(user); // Armazena as informações do usuário
  };

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} userInfo={userInfo}>
        <Routes>
          <Route path="/" element={<LandingPage onLogin={handleLogin} />} />
          <Route path="/Produtos" element={<Products isLoggedIn={isLoggedIn} userInfo={userInfo} />} />
        </Routes>
      </Header>
    </Router>
  );
};

export default App;
