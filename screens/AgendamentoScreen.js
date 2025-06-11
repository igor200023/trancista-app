import React, { useState, useEffect } from 'react';
import { View, Text, Alert, Vibration, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from '../firebaseConfig';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

export default function AgendamentoScreen({ navigation }) {
  const [diaSelecionado, setDiaSelecionado] = useState(null);
  const [horarioSelecionado, setHorarioSelecionado] = useState(null);
  const [tipoCabelo, setTipoCabelo] = useState('');
  const [agendamentos, setAgendamentos] = useState([]);
  const [usuario, setUsuario] = useState(null);

  const diasDisponiveis = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"];
  const horariosDisponiveis = ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"];

<<<<<<< HEAD
=======
  // Adiciona os botões no header
>>>>>>> 97495f08f5c83e473765cfe465952c990d66a7ee
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: 'row', marginRight: 15 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('TipoCabelo')}
            style={{ marginRight: 20 }}
          >
            <Text style={{ color: '#6200ee', fontWeight: 'bold' }}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () => {
              await AsyncStorage.clear();
              navigation.replace('Login');
            }}
          >
            <Text style={{ color: 'red', fontWeight: 'bold' }}>Sair</Text>
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const carregarDados = async () => {
      try {
<<<<<<< HEAD

=======
        // Carrega os dados do usuário primeiro
>>>>>>> 97495f08f5c83e473765cfe465952c990d66a7ee
        const usuarioData = await AsyncStorage.getItem('usuario');
        if (usuarioData) {
          setUsuario(JSON.parse(usuarioData));
        }

        const tipo = await AsyncStorage.getItem('tipoCabelo');
        if (tipo) setTipoCabelo(tipo);
        carregarAgendamentos();
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };

    carregarDados();
  }, []);

  const carregarAgendamentos = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'agendamentos'));
      const lista = querySnapshot.docs.map(doc => doc.data());
      setAgendamentos(lista);
    } catch (error) {
      console.error('Erro ao carregar agendamentos do Firestore:', error);
    }
  };

  const handleSelecionarDia = (dia) => {
    setDiaSelecionado(dia);
    setHorarioSelecionado(null);
  };

  const handleAgendar = async (horario) => {
    if (!diaSelecionado) {
      Alert.alert("Erro", "Selecione um dia primeiro.");
      return;
    }

    if (!usuario || !usuario.nome) {
      Alert.alert("Erro", "Dados do usuário não encontrados. Faça login novamente.");
      return;
    }

    try {
      const novoAgendamento = {
        dia: diaSelecionado,
        hora: horario,
        tipo: tipoCabelo,
<<<<<<< HEAD
        nome: usuario.nome,
        email: usuario.email || '',
        userId: usuario.id || '',
=======
        nome: usuario.nome, // Garante que vai pegar o nome do usuário
        email: usuario.email || '',
        userId: usuario.id || '', // Adiciona o ID do usuário
>>>>>>> 97495f08f5c83e473765cfe465952c990d66a7ee
        timestamp: new Date(),
      };

      await addDoc(collection(db, 'agendamentos'), novoAgendamento);
      await carregarAgendamentos();

      setHorarioSelecionado(horario);
      Vibration.vibrate(100);

      Alert.alert('Agendamento Confirmado', `Você agendou para ${diaSelecionado} às ${horario}`);
    } catch (error) {
      console.error("Erro ao agendar:", error);
      Alert.alert("Erro", "Não foi possível agendar.");
    }
  };

  const isHorarioOcupado = (hora) =>
    agendamentos.some(a => a.dia === diaSelecionado && a.hora === hora);

  return (
    <View style={styles.container}>
      <Text style={styles.tipoCabeloText}>Agendamento para: {tipoCabelo}</Text>
      {usuario?.nome && <Text style={styles.usuarioText}>Cliente: {usuario.nome}</Text>}

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
  usuarioText: { fontSize: 16, marginBottom: 10, color: '#333' },
  title: { fontSize: 20, fontWeight: 'bold', marginVertical: 10 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
  row: { justifyContent: 'space-around', marginBottom: 10 },
  botao: {
    backgroundColor: '#6200ee',
    padding: 20,
<<<<<<< HEAD
    margin: 7,
=======
    margin: 10,
>>>>>>> 97495f08f5c83e473765cfe465952c990d66a7ee
    borderRadius: 10,
    width: 100,
    alignItems: 'center',
  },
  botaoSelecionado: { backgroundColor: '#3700b3' },
  textoBotao: { color: 'white', fontWeight: 'bold' },
  confirmado: { marginTop: 20, fontSize: 16, color: 'green' },
});