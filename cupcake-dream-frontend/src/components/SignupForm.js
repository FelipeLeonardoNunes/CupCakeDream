import React, { useState } from 'react';
import { Button, Form, Message, Container, Grid, Segment } from 'semantic-ui-react';
import axios from 'axios';
import InputMask from 'react-input-mask';

const SignupForm = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    city: '',
    region: '',
    cpf: '',
    postalCode: '',
    role: 'User', // Valor padrão
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e, { name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleMaskedChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post('https://localhost:44333/api/User/CreateUser', formData);
      setSuccess(true);
      setError('');

      // Realizar login após criação bem-sucedida
      const loginResponse = await axios.post(
        `https://localhost:44333/api/User/Login?Email=${formData.email}&Password=${formData.password}`
      );
      onLogin(true, loginResponse.data);
    } catch (err) {
      setError('Erro ao criar usuário. Tente novamente.');
      setSuccess(false);
    }
  };

  return (
    <Container style={{ marginTop: '30px' }}>
      <Segment>
        <Form success={success} error={!!error} onSubmit={handleSubmit}>
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Form.Input
                  label='Nome'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Grid.Column>
              <Grid.Column>
                <Form.Input
                  label='Email'
                  name='email'
                  type='email'
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={2}>
              <Grid.Column>
                <Form.Input
                  label='Senha'
                  type='password'
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Grid.Column>
              <Grid.Column>
                <Form.Field required>
                  <label>Telefone</label>
                  <InputMask
                    mask="(99) 99999-9999"
                    name="phone"
                    value={formData.phone}
                    onChange={handleMaskedChange}
                  >
                    {(inputProps) => <Form.Input {...inputProps} />}
                  </InputMask>
                </Form.Field>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={2}>
              <Grid.Column>
                <Form.Input
                  label='Endereço'
                  name='address'
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </Grid.Column>
              <Grid.Column>
                <Form.Input
                  label='Cidade'
                  name='city'
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={2}>
              <Grid.Column>
                <Form.Input
                  label='Estado'
                  name='region'
                  value={formData.region}
                  onChange={handleChange}
                  maxLength={2}
                  required
                />
              </Grid.Column>
              <Grid.Column>
                <Form.Field required>
                  <label>CPF</label>
                  <InputMask
                    mask="999.999.999-99"
                    name="cpf"
                    value={formData.cpf}
                    onChange={handleMaskedChange}
                  >
                    {(inputProps) => <Form.Input {...inputProps} />}
                  </InputMask>
                </Form.Field>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={2}>
              <Grid.Column>
                <Form.Field required>
                  <label>CEP</label>
                  <InputMask
                    mask="99999-999"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleMaskedChange}
                  >
                    {(inputProps) => <Form.Input {...inputProps} />}
                  </InputMask>
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Button primary type='submit'>
            Cadastrar
          </Button>
          {success && <Message success content='Usuário criado com sucesso!' />}
          {error && <Message error content={error} />}
        </Form>
      </Segment>
    </Container>
  );
};

export default SignupForm;
