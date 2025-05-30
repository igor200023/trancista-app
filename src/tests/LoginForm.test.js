import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginForm from '../components/LoginForm';

describe('Teste de Renderização do LoginForm', () => {
  test('renderiza corretamente todos os elementos', () => {
    render(<LoginForm />);
    
    // Correções:
    expect(screen.getByLabelText(/usuário/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
  });
});