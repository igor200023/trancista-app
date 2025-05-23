// src/services/authService.js
const { hashPassword, comparePassword } = require('../utils/authUtils');

async function registerUser(username, password) {
  const hashedPassword = await hashPassword(password);
  // Salva no banco de dados: username + hashedPassword
}

async function loginUser(username, password) {
  // Busca o hash do banco de dados (exemplo fictício)
  const user = await db.findUser(username);
  const isMatch = await comparePassword(password, user.passwordHash);
  
  if (!isMatch) throw new Error('Senha incorreta');
  // Gera token JWT ou inicia sessão...
}

module.exports = { registerUser, loginUser };