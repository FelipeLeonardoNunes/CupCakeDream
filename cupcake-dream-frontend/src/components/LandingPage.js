import React, { useState } from 'react';
import { Grid, Modal, Button, Container, Image } from 'semantic-ui-react';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import CupcakeNoBg from '../images/cupcake-no-bg.png';

const LandingPage = ({ onLogin }) => {
  const [open, setOpen] = useState(false);
  const [formType, setFormType] = useState('');

  const handleOpenModal = (type) => {
    setFormType(type);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setFormType('');
  };

  return (
    <Grid container centered style={{ height: '80vh' }} stackable>
      <Grid.Row columns={3} style={{ flex: 1, width: '100%' }}>
        <Grid.Column width={7} style={{ paddingRight: '0px' }} verticalAlign="middle">
          <Container text>
            <h1 className='lobster-font' style={{ fontSize: '3rem', fontWeight: 700 }}>
              Sweet Dreams are made of this
            </h1>
            <p className='quicksand-font' style={{ fontSize: '1.2rem', lineHeight: '1.6', margin: '0 auto' }}>
              Na Cupcake Dream, cada cupcake é feito com ingredientes frescos e paixão, oferecendo sabores únicos para
              despertar seus sentidos. Experimente uma explosão de criatividade e doçura!
            </p>
            <Button
              secondary
              size="large"
              style={{ marginTop: '30px', width: '200px' }}
              onClick={() => handleOpenModal('signup')}
            >
              Cadastre-se
            </Button>
            <Button
              secondary
              size="large"
              style={{ marginTop: '10px', width: '200px' }}
              onClick={() => handleOpenModal('login')}
            >
              Log In
            </Button>
          </Container>
        </Grid.Column>
        <Grid.Column width={1} style={{ paddingRight: '0px', margin:"35px" }} verticalAlign="middle"><></></Grid.Column>
        <Grid.Column width={7} style={{ paddingLeft: '50px' }} verticalAlign="middle" textAlign="center">
          <Image src={CupcakeNoBg} alt="Cupcake" fluid />
        </Grid.Column>
      </Grid.Row>

      <Modal open={open} onClose={handleCloseModal} size="small">
        <Modal.Header>{formType === 'signup' ? 'Cadastro' : 'Login'}</Modal.Header>
        <Modal.Content>
          {formType === 'signup' ? <SignupForm /> : <LoginForm onLogin={onLogin} />}
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={handleCloseModal}>Voltar</Button>
        </Modal.Actions>
      </Modal>
    </Grid>
  );
};

export default LandingPage;
