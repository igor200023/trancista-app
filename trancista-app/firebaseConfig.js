// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCe5dw2ldNYpD48eeB38mKhPKwN9ZSWIxc",
  authDomain: "trancistapp.firebaseapp.com",
  projectId: "trancistapp",
  storageBucket: "trancistapp.appspot.com",
  messagingSenderId: "195868085668",
  appId: "1:195868085668:web:6c8684ca94028680b60531",
  measurementId: "G-PT8S20LVE9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // <--- Firestore corretamente inicializado

export { db};