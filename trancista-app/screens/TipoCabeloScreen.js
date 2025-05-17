import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function TipoCabeloScreen({ navigation }) {
  const opcoes = [
    'Cabelo liso',
    'Cabelo cacheado',
    'Cabelo ondulado',
    'Cabelo curto',
  ];

  const selecionarTipoCabelo = (tipoSelecionado) => {
    navigation.navigate('Agendamento', { tipoCabelo: tipoSelecionado });
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
  container: { flex: 1, backgroundColor: '#f5f5f5', paddingTop: 60, paddingHorizontal: 20 },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 20,
  },
  opcoesContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  botao: {
    backgroundColor: '#6200ee',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  textoBotao: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});