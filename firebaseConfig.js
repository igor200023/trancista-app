// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCe5dw2ldNYpD48eeB38mKhPKwN9ZSWIxc",
  authDomain: "trancistapp.firebaseapp.com",
  projectId: "trancistapp",
  storageBucket: "trancistapp.firebasestorage.app",
  messagingSenderId: "195868085668",
  appId: "1:195868085668:web:6c8684ca94028680b60531",
  measurementId: "G-PT8S20LVE9"
};

const app = initializeApp(firebaseConfig);
<<<<<<< HEAD
const db = getFirestore(app);
=======
const db = getFirestore(app); // <--- Firestore corretamente inicializado
>>>>>>> 97495f08f5c83e473765cfe465952c990d66a7ee

export { db };