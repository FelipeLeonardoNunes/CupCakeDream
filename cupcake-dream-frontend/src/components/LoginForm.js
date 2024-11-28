import React, { useState } from 'react';
import { Button, Form, Message } from 'semantic-ui-react';
import axios from 'axios';

const LoginForm = ({ onLogin, closeModal }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e, { name, value }) => {
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const url = `https://localhost:44333/api/User/Login?Email=${encodeURIComponent(credentials.email)}&Password=${encodeURIComponent(credentials.password)}`;
      console.log('URL de Login:', url); // Verificar o URL que está sendo usado
      const response = await axios.get(url);
      console.log('Resposta da API:', response.data); // Verificar a resposta da API no console

      if (response.data && response.data.id) {
        setError('');
        onLogin(true, response.data); // Atualiza o estado de login no App e passa as informações do usuário
        closeModal(); // Fecha o modal de login
      } else {
        setError('Erro ao realizar login. Verifique suas credenciais.');
      }
    } catch (err) {
      console.error('Erro na requisição:', err); // Ver detalhes do erro no console
      setError('Erro ao realizar login. Verifique suas credenciais.');
    }
  };

  return (
    <Form error={!!error} onSubmit={handleSubmit}>
      <Form.Input
        label="Email"
        placeholder="Seu email"
        name="email"
        type="email"
        value={credentials.email}
        onChange={handleChange}
      />
      <Form.Input
        label="Senha"
        placeholder="Sua senha"
        name="password"
        type="password"
        value={credentials.password}
        onChange={handleChange}
      />
      <Button primary type="submit">Entrar</Button>
      {error && <Message error content={error} />}
      <p style={{ color: 'gray', fontSize: '0.9rem', marginTop: '10px' }}>
        Necessita de Suporte? Entre em contato com: Admin@email.com
      </p>
    </Form>
  );
};

export default LoginForm;
