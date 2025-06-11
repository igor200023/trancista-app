<<<<<<< HEAD
=======
// screens/TesteFirebase.js
>>>>>>> 97495f08f5c83e473765cfe465952c990d66a7ee
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { db } from '../firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function TesteFirebase() {
  useEffect(() => {
    const testConnection = async () => {
      try {
        await addDoc(collection(db, 'testeConexao'), {
          mensagem: 'Firebase conectado com sucesso!',
          timestamp: serverTimestamp(),
        });
        console.log('🔥 Documento criado no Firestore com sucesso!');
      } catch (error) {
        console.error('Erro ao conectar com o Firebase:', error);
      }
    };

    testConnection();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Testando conexão com Firebase...</Text>
    </View>
  );
}