<<<<<<< HEAD
=======
// src/services/authService.js
>>>>>>> 97495f08f5c83e473765cfe465952c990d66a7ee
const { hashPassword, comparePassword } = require('../utils/authUtils');

async function registerUser(username, password) {
  const hashedPassword = await hashPassword(password);
<<<<<<< HEAD

}

async function loginUser(username, password) {

=======
  // Salva no banco de dados: username + hashedPassword
}

async function loginUser(username, password) {
  // Busca o hash do banco de dados (exemplo fictício)
>>>>>>> 97495f08f5c83e473765cfe465952c990d66a7ee
  const user = await db.findUser(username);
  const isMatch = await comparePassword(password, user.passwordHash);
  
  if (!isMatch) throw new Error('Senha incorreta');
<<<<<<< HEAD

=======
  // Gera token JWT ou inicia sessão...
>>>>>>> 97495f08f5c83e473765cfe465952c990d66a7ee
}

module.exports = { registerUser, loginUser };