import React, { useState } from 'react';
import { Button, Form, Message } from 'semantic-ui-react';
import axios from 'axios';

const SignupForm = () => {
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

  const handleSubmit = async () => {
    try {
      await axios.post('/api/User/CreateUser', formData);
      setSuccess(true);
      setError('');
    } catch (err) {
      setError('Erro ao criar usuário. Tente novamente.');
      setSuccess(false);
    }
  };

  return (
    <Form success={success} error={!!error} onSubmit={handleSubmit}>
      <Form.Input
        label="Nome"
        placeholder="Seu nome"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <Form.Input
        label="Email"
        placeholder="Seu email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <Form.Input
        label="Senha"
        placeholder="Sua senha"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <Form.Input
        label="Telefone"
        placeholder="Seu telefone"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        required
      />
      <Form.Input
        label="Endereço"
        placeholder="Seu endereço"
        name="address"
        value={formData.address}
        onChange={handleChange}
        required
      />
      <Form.Input
        label="Cidade"
        placeholder="Sua cidade"
        name="city"
        value={formData.city}
        onChange={handleChange}
        required
      />
      <Form.Input
        label="Estado"
        placeholder="Sua região/estado"
        name="region"
        value={formData.region}
        onChange={handleChange}
        required
      />
      <Form.Input
        label="CPF"
        placeholder="Seu CPF"
        name="cpf"
        value={formData.cpf}
        onChange={handleChange}
        required
      />
      <Form.Input
        label="CEP"
        placeholder="Seu código postal"
        name="postalCode"
        value={formData.postalCode}
        onChange={handleChange}
        required
      />
      {/* O campo "role" já é definido como "User" no estado, por isso não será exibido para o usuário */}
      <Button primary type="submit">
        Cadastrar
      </Button>
      {success && <Message success content="Usuário criado com sucesso!" />}
      {error && <Message error content={error} />}
    </Form>
  );
};

export default SignupForm;
