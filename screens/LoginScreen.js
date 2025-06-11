import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from '../firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import CryptoJS from 'crypto-js';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    setLoading(true);

    if (email === 'admintrancista@gmail.com' && senha === '12345') {
      await AsyncStorage.setItem('usuario', JSON.stringify({
        nome: 'Administrador',
        email: 'admintrancista@gmail.com',
        isAdmin: true
      }));
      navigation.replace('AdminAgendamentos');
      setLoading(false);
      return;
    }

    try {
      const usuariosRef = collection(db, 'usuarios');
      const q = query(usuariosRef, where('email', '==', email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        const usuario = doc.data();
        const senhaCriptografada = CryptoJS.SHA256(senha).toString();

        if (usuario.senha === senhaCriptografada) {
  
          await AsyncStorage.setItem('usuario', JSON.stringify({
            id: doc.id,
            nome: usuario.nome,
            email: usuario.email,
            isAdmin: false
          }));

          navigation.replace('TipoCabelo');
        } else {
          Alert.alert('Erro', 'Email ou senha inválidos.');
        }
      } else {
        Alert.alert('Erro', 'Email ou senha inválidos.');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      Alert.alert('Erro', 'Não foi possível fazer login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo!</Text>
      <Text style={styles.subtitle}>Faça login para continuar</Text>

      <TextInput 
        style={styles.input} 
        placeholder="Email" 
        value={email} 
        onChangeText={setEmail} 
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#aaa"
      />
      <TextInput 
        style={styles.input} 
        placeholder="Senha" 
        value={senha} 
        onChangeText={setSenha} 
        secureTextEntry
        placeholderTextColor="#aaa"
      />

      <TouchableOpacity 
        style={[styles.button, loading && styles.buttonDisabled]} 
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Entrar</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={() => navigation.navigate('Cadastro')}
        style={styles.signupLink}
      >
        <Text style={styles.linkText}>Não tem uma conta? <Text style={styles.linkBold}>Cadastre-se</Text></Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#f5f5f5', 
    padding: 20,
  },
  title: {
    fontSize: 28, 
    fontWeight: 'bold', 
    color: '#6200ee', 
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16, 
    color: '#777', 
    marginBottom: 20,
  },
  input: {
    width: '100%', 
    backgroundColor: '#fff',
    padding: 15, 
    marginVertical: 10, 
    borderRadius: 8,
    borderWidth: 1, 
    borderColor: '#ddd', 
    fontSize: 16,
  },
  button: {
    width: '100%', 
    backgroundColor: '#6200ee',
    padding: 15, 
    borderRadius: 8, 
    alignItems: 'center', 
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#9e47ff',
  },
  buttonText: {
    color: '#fff', 
    fontSize: 18, 
    fontWeight: 'bold',
  },
  signupLink: {
    marginTop: 20,
  },
  linkText: {
    color: '#6200ee', 
    fontSize: 16,
  },
  linkBold: {
    fontWeight: 'bold',
  },
});