const { hashPassword, comparePassword } = require('../utils/authUtils');

async function registerUser(username, password) {
  const hashedPassword = await hashPassword(password);

}

async function loginUser(username, password) {

  const user = await db.findUser(username);
  const isMatch = await comparePassword(password, user.passwordHash);
  
  if (!isMatch) throw new Error('Senha incorreta');

}

module.exports = { registerUser, loginUser };