import React from 'react';
import { Menu, Container, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import '../css/Styles.css'; // Certifique-se de que o caminho está correto
import Footer from './Footer';

function Header({ isLoggedIn, handleLogout, openLoginModal, userInfo, children }) {
  return (
    <>
      <div className="menu-header">
        <Menu size="large" borderless>
          <Container>
            <Menu.Item as={Link} to="/" header className="lobster-font" style={{ fontSize: "2.2rem" }}>
              Cupcake Dream
            </Menu.Item>

            <Menu.Item as={Link} to="/Produtos">Produtos</Menu.Item>
            <Menu.Item as={Link} to="/Favoritos">Favoritos</Menu.Item>
            <Menu.Item as={Link} to="/Perfil">Perfil</Menu.Item>
            <Menu.Item as={Link} to="/Carrinho">Carrinho</Menu.Item>
            <Menu.Item as={Link} to="/Pedidos">Pedidos</Menu.Item>

            <Menu.Menu position="right">
              {isLoggedIn ? (
                <>
                  <Menu.Item>
                    Olá, {userInfo.name}
                  </Menu.Item>
                  <Menu.Item>
                    <Button onClick={handleLogout}>
                      <Icon name="log out" /> Sair
                    </Button>
                  </Menu.Item>
                </>
              ) : (
                <Menu.Item>
                  <Button onClick={openLoginModal}>
                    <Icon name="sign in" /> Entrar
                  </Button>
                </Menu.Item>
              )}
            </Menu.Menu>
          </Container>
        </Menu>
      </div>
      <div>{children}</div>
      <Footer />
    </>
  );
}

export default Header;
