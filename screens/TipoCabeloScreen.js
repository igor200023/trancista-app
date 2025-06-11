import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TipoCabeloScreen({ navigation }) {
  const opcoes = [
    'Cabelo liso',
    'Cabelo cacheado',
    'Cabelo ondulado',
    'Cabelo curto',
  ];

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: 'row', marginRight: 10 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('TipoCabelo')}
            style={{ marginRight: 15 }}
          >
            <Text style={{ color: '#6200ee', fontWeight: 'bold' }}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              AsyncStorage.clear();
              navigation.replace('Login');
            }}
          >
            <Text style={{ color: 'red', fontWeight: 'bold' }}>Sair</Text>
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const selecionarTipoCabelo = async (tipo) => {
    try {
      await AsyncStorage.setItem('tipoCabelo', tipo);
      navigation.navigate('Agendamento');
    } catch (error) {
      console.error('Erro ao salvar o tipo de cabelo:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Tipo de Cabelo</Text>
      <ScrollView contentContainerStyle={styles.opcoesContainer}>
        {opcoes.map((tipo) => (
          <TouchableOpacity
            key={tipo}
            style={styles.botao}
            onPress={() => selecionarTipoCabelo(tipo)}
          >
            <Text style={styles.textoBotao}>{tipo}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', paddingTop: 20, paddingHorizontal: 20 },
  titulo: { fontSize: 24, fontWeight: 'bold', textAlign: 'left', marginBottom: 20 },
  opcoesContainer: { alignItems: 'center', justifyContent: 'center' },
  botao: {
    backgroundColor: '#6200ee',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  textoBotao: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});