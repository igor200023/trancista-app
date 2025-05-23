import React from 'react';

const LoginForm = () => {
  return (
    <form>
      <label htmlFor="usuario">Usuário</label>
      <input id="usuario" type="text" />
      
      <label htmlFor="senha">Senha</label>
      <input id="senha" type="password" />
      
      <button type="submit">Entrar</button>
    </form>
  );
};

export default LoginForm;