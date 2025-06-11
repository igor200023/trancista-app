<<<<<<< HEAD
=======
// src/utils/authUtils.js
>>>>>>> 97495f08f5c83e473765cfe465952c990d66a7ee
import bcrypt from 'bcrypt';

const saltRounds = 10;

export async function hashPassword(password) {
  return await bcrypt.hash(password, saltRounds);
}

export async function comparePassword(password, hash) {
  return await bcrypt.compare(password, hash);
}