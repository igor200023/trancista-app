import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginForm from '../components/LoginForm';

describe('Teste de Renderização do LoginForm', () => {
  test('renderiza corretamente todos os elementos', () => {
    render(<LoginForm />);
    
<<<<<<< HEAD
=======
    // Correções:
>>>>>>> 97495f08f5c83e473765cfe465952c990d66a7ee
    expect(screen.getByLabelText(/usuário/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
  });
});