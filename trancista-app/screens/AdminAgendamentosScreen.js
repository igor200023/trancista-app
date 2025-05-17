import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // ajuste o caminho se estiver diferente

export default function AdminAgendamentosScreen() {
  const [agendamentos, setAgendamentos] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'agendamentos'), orderBy('dia'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const lista = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAgendamentos(lista);
    });

    return () => unsubscribe(); // limpa o listener ao sair
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agendamentos</Text>

      <FlatList
        data={agendamentos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.nome}>Cliente: {item.nome}</Text>
            <Text>Tipo de cabelo: {item.tipo}</Text>
            <Text>Dia: {item.dia}</Text>
            <Text>Horário: {item.hora}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.vazio}>Nenhum agendamento encontrado.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  card: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2,
  },
  nome: { fontWeight: 'bold', fontSize: 16, marginBottom: 5 },
  vazio: { textAlign: 'center', marginTop: 20, color: '#777' },
});