// src/tests/authUtils.test.js
import { hashPassword, comparePassword } from '../utils/authUtils.js';

describe('Teste de Criptografia de Senha', () => {
  const plainPassword = 'senhaSegura123';

  test('deve gerar um hash diferente da senha original', async () => {
    const hashed = await hashPassword(plainPassword);
    expect(hashed).not.toBe(plainPassword);
    expect(hashed.length).toBeGreaterThan(0);
  });

  test('deve retornar true para comparação com senha correta', async () => {
    const hashed = await hashPassword(plainPassword);
    const match = await comparePassword(plainPassword, hashed);
    expect(match).toBe(true);
  });

  test('deve retornar false para comparação com senha incorreta', async () => {
    const hashed = await hashPassword(plainPassword);
    const match = await comparePassword('senhaErrada', hashed);
    expect(match).toBe(false);
  });
});