import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './layout/Header';
import LandingPage from './components/LandingPage';
import Products from './pages/Products';
import Favorites from './pages/Favorites';
import ShoppingCart from './pages/ShoppingCart';
import Profile from './pages/Profile';
import Orders from './pages/Orders';

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
          <Route 
            path="/Favoritos" 
            element={isLoggedIn ? <Favorites userInfo={userInfo} /> : <Navigate to="/" />} 
          />
          <Route 
            path="/Carrinho" 
            element={isLoggedIn ? <ShoppingCart userInfo={userInfo} /> : <Navigate to="/" />} 
          />
          <Route 
            path="/Perfil" 
            element={isLoggedIn ? <Profile userInfo={userInfo} /> : <Navigate to="/" />} 
          />
           <Route 
            path="/Pedidos" 
            element={isLoggedIn ? <Orders userInfo={userInfo} /> : <Navigate to="/" />} 
          />
        </Routes>
      </Header>
    </Router>
  );
};

export default App;
