import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function ConfirmacaoScreen({ route, navigation }) {
  const { dia, horario } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agendamento Confirmado!</Text>
      <Text style={styles.texto}>Seu horário foi marcado para:</Text>
      <Text style={styles.destaque}>{dia} às {horario}</Text>
      <Button title="Voltar ao início" onPress={() => navigation.navigate('Login')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  texto: { fontSize: 18, marginBottom: 10 },
  destaque: { fontSize: 20, fontWeight: 'bold', color: '#6c5ce7', marginBottom: 20 },
});