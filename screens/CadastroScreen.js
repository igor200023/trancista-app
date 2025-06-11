import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from '../firebaseConfig';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import CryptoJS from 'crypto-js';

export default function CadastroScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCadastro = async () => {
    if (!nome || !email || !senha) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios.');
      return;
    }

    if (senha.length < 6) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    setLoading(true);

    try {

      const usuariosRef = collection(db, 'usuarios');
      const q = query(usuariosRef, where('email', '==', email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        Alert.alert('Erro', 'Email já cadastrado!');
        setLoading(false);
        return;
      }

      const senhaCriptografada = CryptoJS.SHA256(senha).toString();

      const docRef = await addDoc(usuariosRef, {
        nome,
        email,
        senha: senhaCriptografada,
        dataCadastro: new Date()
      });

      await AsyncStorage.setItem('usuario', JSON.stringify({
        id: docRef.id,
        nome,
        email,

      }));

      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!', [
        { text: 'OK', onPress: () => navigation.replace('TipoCabelo') }
      ]);

    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      Alert.alert('Erro', 'Não foi possível completar o cadastro.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Conta</Text>
      <Text style={styles.subtitle}>Preencha os campos abaixo</Text>

      <TextInput 
        style={styles.input} 
        placeholder="Nome completo" 
        value={nome} 
        onChangeText={setNome}
        placeholderTextColor="#aaa"
        autoCapitalize="words"
      />
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
        placeholder="Senha (mínimo 6 caracteres)" 
        value={senha} 
        onChangeText={setSenha} 
        secureTextEntry
        placeholderTextColor="#aaa"
        minLength={6}
      />

      <TouchableOpacity 
        style={[styles.button, loading && styles.buttonDisabled]} 
        onPress={handleCadastro}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={() => navigation.navigate('Login')}
        style={styles.loginLink}
      >
        <Text style={styles.linkText}>Já tem uma conta? <Text style={styles.linkBold}>Entrar</Text></Text>
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
    padding: 20 
  },
  title: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: '#6200ee', 
    marginBottom: 5 
  },
  subtitle: { 
    fontSize: 16, 
    color: '#777', 
    marginBottom: 20 
  },
  input: { 
    width: '100%', 
    backgroundColor: '#fff', 
    padding: 15, 
    marginVertical: 10, 
    borderRadius: 8, 
    borderWidth: 1, 
    borderColor: '#ddd', 
    fontSize: 16 
  },
  button: { 
    width: '100%', 
    backgroundColor: '#6200ee', 
    padding: 15, 
    borderRadius: 8, 
    alignItems: 'center', 
    marginTop: 10 
  },
  buttonDisabled: {
    backgroundColor: '#9e47ff',
  },
  buttonText: { 
    color: '#fff', 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
  loginLink: {
    marginTop: 20,
  },
  linkText: { 
    color: '#6200ee', 
    fontSize: 16 
  },
  linkBold: {
    fontWeight: 'bold'
  }
});