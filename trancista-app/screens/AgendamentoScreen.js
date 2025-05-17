import React, { useState, useEffect } from 'react';
import { View, Text, Alert, Vibration, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { db } from '../firebaseConfig';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function AgendamentoScreen() {
  const [diaSelecionado, setDiaSelecionado] = useState(null);
  const [horarioSelecionado, setHorarioSelecionado] = useState(null);
  const [tipoCabelo, setTipoCabelo] = useState('');
  const [agendamentos, setAgendamentos] = useState([]);
  const [usuario, setUsuario] = useState(null);

  const diasDisponiveis = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"];
  const horariosDisponiveis = ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"];

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const userData = await AsyncStorage.getItem('usuarioLogado');
        const user = JSON.parse(userData);
        setUsuario(user);
        setTipoCabelo(user?.tipoCabelo || '');

        if (diaSelecionado) {
          const q = query(collection(db, 'agendamentos'), where('dia', '==', diaSelecionado));
          const snapshot = await getDocs(q);
          const dados = snapshot.docs.map(doc => doc.data());
          setAgendamentos(dados);
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };

    carregarDados();
  }, [diaSelecionado]);

  const handleSelecionarDia = (dia) => {
    setDiaSelecionado(dia);
    setHorarioSelecionado(null);
  };

  const handleAgendar = async (horario) => {
    if (!diaSelecionado) {
      Alert.alert("Erro", "Selecione um dia primeiro.");
      return;
    }

    try {
      const novoAgendamento = {
        dia: diaSelecionado,
        hora: horario,
        tipo: tipoCabelo,
        nome: usuario?.nome || 'Teste',
        email: usuario?.email || '',
      };

      await addDoc(collection(db, 'agendamentos'), novoAgendamento);
      setAgendamentos([...agendamentos, novoAgendamento]);
      setHorarioSelecionado(horario);
      Vibration.vibrate(100);

      Alert.alert('Agendamento Confirmado', `Você agendou para ${diaSelecionado} às ${horario}`);
    } catch (error) {
      console.error('Erro ao salvar agendamento:', error);
      Alert.alert('Erro', 'Não foi possível agendar.');
    }
  };

  const isHorarioOcupado = (hora) =>
    agendamentos.some(a => a.hora === hora);

  return (
    <View style={styles.container}>
      <Text style={styles.tipoCabeloText}>Agendamento para: {tipoCabelo}</Text>

      <Text style={styles.title}>Escolha um dia:</Text>
      <View style={styles.grid}>
        {diasDisponiveis.map((dia) => (
          <TouchableOpacity
            key={dia}
            style={[styles.botao, diaSelecionado === dia && styles.botaoSelecionado]}
            onPress={() => handleSelecionarDia(dia)}
          >
            <Text style={styles.textoBotao}>{dia}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {diaSelecionado && (
        <>
          <Text style={styles.title}>Horários para {diaSelecionado}:</Text>
          <FlatList
            data={horariosDisponiveis}
            keyExtractor={(item) => item}
            numColumns={3}
            columnWrapperStyle={styles.row}
            renderItem={({ item }) => {
              if (isHorarioOcupado(item)) return null;

              return (
                <TouchableOpacity
                  style={[styles.botao, horarioSelecionado === item && styles.botaoSelecionado]}
                  onPress={() => handleAgendar(item)}
                >
                  <Text style={styles.textoBotao}>{item}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </>
      )}

      {horarioSelecionado && (
        <Text style={styles.confirmado}>Agendado: {diaSelecionado} às {horarioSelecionado}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'flex-start', alignItems: 'center', padding: 20, backgroundColor: '#f5f5f5' },
  tipoCabeloText: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  title: { fontSize: 20, fontWeight: 'bold', marginVertical: 10 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
  row: { justifyContent: 'space-around', marginBottom: 10 },
  botao: {
    backgroundColor: '#6200ee',
    padding: 20,
    margin: 10,
    borderRadius: 10,
    width: 100,
    alignItems: 'center',
  },
  botaoSelecionado: { backgroundColor: '#3700b3' },
  textoBotao: { color: 'white', fontWeight: 'bold' },
  confirmado: { marginTop: 20, fontSize: 16, color: 'green' },
});